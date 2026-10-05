import 'server-only'
import { cookies } from 'next/headers'
import { signSessionToken, verifySessionToken, type Role } from '@/lib/jwt'

export const SESSION_COOKIE = 'gk_session'
const SESSION_DAYS = 7

export async function createSession(userId: number, role: Role) {
  const token = await signSessionToken({ userId, role }, SESSION_DAYS)
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true, // tidak bisa dibaca JavaScript di browser
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

// Hanya membaca & memverifikasi tanda tangan token (tanpa DB). Untuk keputusan
// otorisasi gunakan getCurrentUser()/requireAdmin() di lib/dal.ts.
export async function readSession() {
  const cookieStore = await cookies()
  return verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value)
}
