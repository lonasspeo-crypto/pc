'use server'

import { randomBytes } from 'node:crypto'
import { Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/dal'
import { formString } from '@/lib/auth-utils'
import { allowedTransitions, isOrderStatus, orderStatusLabels } from '@/lib/order-status'

// Semua action di file ini WAJIB memanggil requireAdmin() di awal: Server Action adalah
// endpoint publik, jadi pengecekan di layout/halaman saja tidak cukup.

const flash = (path: string, key: 'ok' | 'error', message: string) => `${path}?${key}=${encodeURIComponent(message)}`

// ---------------------------------------------------------------- Pesanan
export async function updateOrderStatus(formData: FormData) {
  await requireAdmin()
  const orderNumber = formString(formData, 'orderNumber')
  const to = formString(formData, 'to')
  const back = `/admin/pesanan/${encodeURIComponent(orderNumber)}`

  let message = ''
  try {
    if (!isOrderStatus(to)) throw new Error('Status tujuan tidak valid.')
    await prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({ where: { orderNumber }, include: { items: true } })
      if (!order) throw new Error('Pesanan tidak ditemukan.')
      if (!isOrderStatus(order.status) || !allowedTransitions[order.status].includes(to)) {
        throw new Error(`Pesanan "${order.status}" tidak bisa diubah ke "${to}".`)
      }

      const data: Prisma.OrderUpdateManyMutationInput = { status: to }
      if (to === 'PAID') {
        data.paidAt = new Date()
        if (!order.paymentRef) data.paymentRef = `ADMIN-${randomBytes(6).toString('hex').toUpperCase()}`
      }
      // updateMany + syarat status lama: mencegah dua admin memproses pesanan yang sama bersamaan.
      const updated = await tx.order.updateMany({ where: { id: order.id, status: order.status }, data })
      if (updated.count !== 1) throw new Error('Status pesanan baru saja berubah. Muat ulang halaman.')

      if (to === 'CANCELLED') {
        for (const item of order.items) {
          await tx.product.update({ where: { id: item.productId }, data: { stock: { increment: item.quantity } } })
        }
      }
    })
    message = `Status diubah ke "${orderStatusLabels[to as keyof typeof orderStatusLabels]}".`
  } catch (error) {
    redirect(flash(back, 'error', error instanceof Error ? error.message : 'Gagal mengubah status.'))
  }

  revalidatePath('/admin', 'layout')
  redirect(flash(back, 'ok', message))
}

// ---------------------------------------------------------------- Produk
export type ProductFormState = { error?: string; fieldErrors?: Record<string, string> } | undefined

const slugify = (value: string) => value.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 120)
const MAX_INT = 2_000_000_000

function parseSpecs(raw: string): { specs?: Record<string, string>; error?: string } {
  const specs: Record<string, string> = {}
  for (const line of raw.split('\n')) {
    const text = line.trim()
    if (!text) continue
    const index = text.indexOf(':')
    if (index < 1) return { error: `Baris spesifikasi "${text.slice(0, 30)}" harus berformat "Nama: Nilai".` }
    const key = text.slice(0, index).trim()
    const value = text.slice(index + 1).trim()
    if (!key || !value || key.length > 40 || value.length > 120) return { error: `Spesifikasi "${key.slice(0, 20)}" kosong atau terlalu panjang.` }
    specs[key] = value
  }
  if (Object.keys(specs).length > 20) return { error: 'Maksimal 20 baris spesifikasi.' }
  return { specs }
}

export async function saveProduct(_state: ProductFormState, formData: FormData): Promise<ProductFormState> {
  await requireAdmin()

  const idRaw = formString(formData, 'id')
  const id = idRaw ? Number(idRaw) : null
  const name = formString(formData, 'name').trim()
  const slug = slugify(formString(formData, 'slug').trim() || name)
  const description = formString(formData, 'description').trim()
  const price = Number(formString(formData, 'price'))
  const stock = Number(formString(formData, 'stock'))
  const status = formString(formData, 'status')
  const categoryId = Number(formString(formData, 'categoryId'))
  const imageInput = formString(formData, 'imageUrl').trim()

  const fieldErrors: Record<string, string> = {}
  if (id !== null && (!Number.isInteger(id) || id < 1)) return { error: 'Produk tidak valid.' }
  if (name.length < 3 || name.length > 150) fieldErrors.name = 'Nama 3–150 karakter.'
  if (!slug) fieldErrors.slug = 'Slug wajib diisi (huruf kecil, angka, tanda minus).'
  if (!description || description.length > 2000) fieldErrors.description = 'Deskripsi wajib diisi (maks. 2000 karakter).'
  if (!Number.isInteger(price) || price < 0 || price > MAX_INT) fieldErrors.price = 'Harga harus bilangan bulat ≥ 0.'
  if (!Number.isInteger(stock) || stock < 0 || stock > 1_000_000) fieldErrors.stock = 'Stok harus bilangan bulat ≥ 0.'
  if (!['ACTIVE', 'INACTIVE'].includes(status)) fieldErrors.status = 'Status tidak valid.'
  // Hanya gambar lokal di /public (next/image menolak domain luar tanpa konfigurasi).
  if (imageInput && (!imageInput.startsWith('/') || imageInput.startsWith('//') || imageInput.length > 190)) fieldErrors.imageUrl = 'Gunakan path gambar di folder public, mis. /products/vga.svg.'
  const parsedSpecs = parseSpecs(formString(formData, 'specs'))
  if (parsedSpecs.error) fieldErrors.specs = parsedSpecs.error

  const category = Number.isInteger(categoryId) ? await prisma.category.findUnique({ where: { id: categoryId } }) : null
  if (!category) fieldErrors.categoryId = 'Pilih kategori.'
  if (Object.keys(fieldErrors).length || !category) return { fieldErrors }

  const imageUrl = imageInput || `/products/${category.name.toLowerCase().replace(/\s+/g, '-')}.svg`
  const data = { name, slug, description, price, stock, status, imageUrl, categoryId: category.id, specs: parsedSpecs.specs ?? {} }

  try {
    if (id === null) await prisma.product.create({ data })
    else await prisma.product.update({ where: { id }, data })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') return { fieldErrors: { slug: 'Slug sudah dipakai produk lain.' } }
      if (error.code === 'P2025') return { error: 'Produk tidak ditemukan (mungkin sudah dihapus).' }
    }
    throw error
  }

  revalidatePath('/admin', 'layout')
  revalidatePath('/products')
  redirect(flash('/admin/produk', 'ok', id === null ? 'Produk ditambahkan.' : 'Produk diperbarui.'))
}

// ---------------------------------------------------------------- Pengguna
export async function setUserRole(formData: FormData) {
  const admin = await requireAdmin()
  const userId = Number(formString(formData, 'userId'))
  const role = formString(formData, 'role')
  const back = '/admin/pengguna'

  if (!Number.isInteger(userId) || !['USER', 'ADMIN'].includes(role)) redirect(flash(back, 'error', 'Permintaan tidak valid.'))
  if (userId === admin.id) redirect(flash(back, 'error', 'Kamu tidak bisa mengubah role akunmu sendiri.'))

  const target = await prisma.user.findUnique({ where: { id: userId }, select: { role: true, name: true } })
  if (!target) redirect(flash(back, 'error', 'Pengguna tidak ditemukan.'))
  if (target.role === 'ADMIN' && role === 'USER' && (await prisma.user.count({ where: { role: 'ADMIN' } })) <= 1) {
    redirect(flash(back, 'error', 'Tidak bisa menurunkan admin terakhir.'))
  }

  await prisma.user.update({ where: { id: userId }, data: { role } })
  revalidatePath('/admin/pengguna')
  redirect(flash(back, 'ok', `${target.name} sekarang ${role === 'ADMIN' ? 'Admin' : 'Pembeli'}.`))
}
