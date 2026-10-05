// Data Access Layer: satu-satunya tempat yang memutuskan "siapa yang sedang login".
// Selalu memeriksa ke database, jadi akun yang dihapus atau diturunkan rolenya
// langsung kehilangan akses meskipun cookie-nya masih berlaku.
import 'server-only'
import { cache } from 'react'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { readSession } from '@/lib/session'

export type CurrentUser = {
  id: number
  name: string
  email: string
  role: string
  phone: string | null
  address: string | null
  city: string | null
  postalCode: string | null
}

export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const session = await readSession()
  if (!session) return null
  return prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, name: true, email: true, role: true, phone: true, address: true, city: true, postalCode: true },
  })
})

export async function requireUser(nextPath = '/akun') {
  const user = await getCurrentUser()
  if (!user) redirect(`/masuk?next=${encodeURIComponent(nextPath)}`)
  return user
}

export async function requireAdmin(nextPath = '/admin') {
  const user = await getCurrentUser()
  if (!user) redirect(`/masuk?next=${encodeURIComponent(nextPath)}`)
  if (user.role !== 'ADMIN') redirect('/')
  return user
}
