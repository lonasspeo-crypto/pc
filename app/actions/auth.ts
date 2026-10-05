'use server'

import bcrypt from 'bcryptjs'
import { Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { isAuthConfigured } from '@/lib/jwt'
import { createSession, deleteSession } from '@/lib/session'
import { requireUser } from '@/lib/dal'
import { hitRateLimit, resetRateLimit } from '@/lib/rate-limit'
import { formString, isValidEmail, safeNextPath, validatePassword } from '@/lib/auth-utils'

export type FormState = {
  error?: string
  success?: string
  fieldErrors?: Record<string, string>
  values?: Record<string, string>
} | undefined

const BCRYPT_COST = 12
// Hash palsu: dipakai supaya waktu respons login sama baik email terdaftar maupun tidak.
const DUMMY_HASH = bcrypt.hashSync('tidak-pernah-dipakai', BCRYPT_COST)
const WINDOW = 15 * 60 * 1000

const clientIp = async () => (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() || 'local'

const NOT_CONFIGURED = 'Server belum dikonfigurasi: isi AUTH_SECRET di file .env (lihat .env.example).'

export async function register(_state: FormState, formData: FormData): Promise<FormState> {
  const name = formString(formData, 'name').trim()
  const email = formString(formData, 'email').trim().toLowerCase()
  const password = formString(formData, 'password')
  const confirm = formString(formData, 'confirm')
  const next = safeNextPath(formString(formData, 'next'))
  const values = { name, email, next: next ?? '' }

  const fieldErrors: Record<string, string> = {}
  if (name.length < 2 || name.length > 80) fieldErrors.name = 'Nama 2–80 karakter.'
  if (!isValidEmail(email)) fieldErrors.email = 'Format email belum benar.'
  const passwordError = validatePassword(password)
  if (passwordError) fieldErrors.password = passwordError
  else if (password !== confirm) fieldErrors.confirm = 'Konfirmasi password tidak sama.'
  if (Object.keys(fieldErrors).length) return { fieldErrors, values }

  if (!isAuthConfigured()) return { error: NOT_CONFIGURED, values }
  if (hitRateLimit(`register:${await clientIp()}`, 10, WINDOW).limited) return { error: 'Terlalu banyak percobaan. Coba lagi beberapa menit lagi.', values }

  let user: { id: number; role: string }
  try {
    user = await prisma.user.create({
      data: { name, email, passwordHash: await bcrypt.hash(password, BCRYPT_COST), role: 'USER' },
      select: { id: true, role: true },
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return { fieldErrors: { email: 'Email ini sudah terdaftar. Silakan masuk.' }, values }
    }
    throw error
  }

  await createSession(user.id, 'USER')
  redirect(next ?? '/akun')
}

export async function login(_state: FormState, formData: FormData): Promise<FormState> {
  const email = formString(formData, 'email').trim().toLowerCase()
  const password = formString(formData, 'password')
  const next = safeNextPath(formString(formData, 'next'))
  const values = { email, next: next ?? '' }

  if (!email || !password) return { error: 'Email dan password wajib diisi.', values }
  if (!isAuthConfigured()) return { error: NOT_CONFIGURED, values }

  // Dua pembatas: per email (anti tebak password) dan per IP (anti menyisir banyak email).
  const emailKey = `login:email:${email}`
  const ipKey = `login:ip:${await clientIp()}`
  const byEmail = hitRateLimit(emailKey, 8, WINDOW)
  const byIp = hitRateLimit(ipKey, 40, WINDOW)
  if (byEmail.limited || byIp.limited) {
    const minutes = Math.ceil(Math.max(byEmail.retryAfterSeconds, byIp.retryAfterSeconds) / 60)
    return { error: `Terlalu banyak percobaan masuk. Coba lagi sekitar ${minutes} menit lagi.`, values }
  }

  const user = await prisma.user.findUnique({ where: { email }, select: { id: true, role: true, passwordHash: true } })
  const valid = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH)
  if (!user || !valid) return { error: 'Email atau password salah.', values }

  resetRateLimit(emailKey)
  await createSession(user.id, user.role === 'ADMIN' ? 'ADMIN' : 'USER')
  redirect(next ?? (user.role === 'ADMIN' ? '/admin' : '/akun'))
}

export async function logout() {
  await deleteSession()
  redirect('/')
}

export async function updateProfile(_state: FormState, formData: FormData): Promise<FormState> {
  const user = await requireUser('/akun')
  const name = formString(formData, 'name').trim()
  const phone = formString(formData, 'phone').trim()
  const address = formString(formData, 'address').trim()
  const city = formString(formData, 'city').trim()
  const postalCode = formString(formData, 'postalCode').trim()

  const fieldErrors: Record<string, string> = {}
  if (name.length < 2 || name.length > 80) fieldErrors.name = 'Nama 2–80 karakter.'
  if (phone && !/^(\+?62|0)8[1-9][0-9\s-]{7,14}$/.test(phone)) fieldErrors.phone = 'Gunakan format 08xx atau +628xx.'
  if (postalCode && !/^[1-9][0-9]{4}$/.test(postalCode)) fieldErrors.postalCode = 'Kode pos 5 angka.'
  if (address.length > 500) fieldErrors.address = 'Alamat maksimal 500 karakter.'
  if (city.length > 100) fieldErrors.city = 'Kota maksimal 100 karakter.'
  if (Object.keys(fieldErrors).length) return { fieldErrors }

  await prisma.user.update({
    where: { id: user.id },
    data: { name, phone: phone || null, address: address || null, city: city || null, postalCode: postalCode || null },
  })
  revalidatePath('/akun')
  return { success: 'Profil tersimpan. Data ini akan mengisi form checkout otomatis.' }
}

export async function changePassword(_state: FormState, formData: FormData): Promise<FormState> {
  const user = await requireUser('/akun')
  const current = formString(formData, 'current')
  const password = formString(formData, 'password')
  const confirm = formString(formData, 'confirm')

  const fieldErrors: Record<string, string> = {}
  const passwordError = validatePassword(password)
  if (!current) fieldErrors.current = 'Password lama wajib diisi.'
  if (passwordError) fieldErrors.password = passwordError
  else if (password !== confirm) fieldErrors.confirm = 'Konfirmasi password tidak sama.'
  if (Object.keys(fieldErrors).length) return { fieldErrors }

  const key = `password:${user.id}`
  if (hitRateLimit(key, 8, WINDOW).limited) return { error: 'Terlalu banyak percobaan. Coba lagi beberapa menit lagi.' }

  const record = await prisma.user.findUnique({ where: { id: user.id }, select: { passwordHash: true } })
  if (!record || !(await bcrypt.compare(current, record.passwordHash))) return { fieldErrors: { current: 'Password lama salah.' } }

  await prisma.user.update({ where: { id: user.id }, data: { passwordHash: await bcrypt.hash(password, BCRYPT_COST) } })
  resetRateLimit(key)
  return { success: 'Password berhasil diganti.' }
}
