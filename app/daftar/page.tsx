import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import BrandMark from '@/components/BrandMark'
import { RegisterForm } from '@/components/AuthForms'
import { getCurrentUser } from '@/lib/dal'
import { safeNextPath } from '@/lib/auth-utils'

export const metadata: Metadata = { title: 'Daftar / Gila Komputer' }

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const next = safeNextPath((await searchParams).next) ?? undefined
  const user = await getCurrentUser()
  if (user) redirect(next ?? (user.role === 'ADMIN' ? '/admin' : '/akun'))

  return (
    <main className="catalog-page auth-page">
      <nav className="site-nav page-width catalog-nav"><BrandMark /><Link href="/" className="text-link">← Kembali ke beranda</Link></nav>
      <div className="page-width auth-layout">
        <div className="auth-intro"><p className="eyebrow">Gila Komputer / akun baru</p><h1>Buat akun,<br /><em>belanja lebih cepat.</em></h1><p>Simpan alamat pengiriman dan pantau semua pesananmu di satu tempat. Gratis, cukup nama, email, dan password.</p></div>
        <RegisterForm next={next} />
      </div>
    </main>
  )
}
