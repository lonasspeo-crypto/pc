// Token sesi (JWT, HS256) — aman dipakai di Server Action, Route Handler, maupun proxy.ts.
// File ini TIDAK menyentuh cookies/DB; urusan cookie ada di lib/session.ts.
import { SignJWT, jwtVerify } from 'jose'

export type Role = 'USER' | 'ADMIN'
export type SessionPayload = { userId: number; role: Role }

export class AuthConfigError extends Error {
  constructor() {
    super('AUTH_SECRET belum diatur (minimal 32 karakter). Lihat .env.example.')
    this.name = 'AuthConfigError'
  }
}

const getKey = () => {
  const secret = process.env.AUTH_SECRET
  if (!secret || secret.length < 32) throw new AuthConfigError()
  return new TextEncoder().encode(secret)
}

export const isAuthConfigured = () => Boolean(process.env.AUTH_SECRET && process.env.AUTH_SECRET.length >= 32)

export async function signSessionToken(payload: SessionPayload, days: number) {
  return new SignJWT({ role: payload.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(String(payload.userId))
    .setIssuedAt()
    .setExpirationTime(`${days}d`)
    .sign(getKey())
}

// Mengembalikan null untuk token kosong/rusak/kedaluwarsa (dianggap belum login).
export async function verifySessionToken(token: string | undefined): Promise<SessionPayload | null> {
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, getKey(), { algorithms: ['HS256'] })
    const userId = Number(payload.sub)
    if (!Number.isInteger(userId) || userId < 1) return null
    return { userId, role: payload.role === 'ADMIN' ? 'ADMIN' : 'USER' }
  } catch {
    return null
  }
}
