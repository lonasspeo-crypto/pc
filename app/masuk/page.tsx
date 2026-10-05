import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import BrandMark from '@/components/BrandMark'
import { LoginForm } from '@/components/AuthForms'
import { getCurrentUser } from '@/lib/dal'
import { safeNextPath } from '@/lib/auth-utils'

export const metadata: Metadata = { title: 'Masuk / Gila Komputer' }

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const next = safeNextPath((await searchParams).next) ?? undefined
  const user = await getCurrentUser()
  if (user) redirect(next ?? (user.role === 'ADMIN' ? '/admin' : '/akun'))

  return (
    <main className="catalog-page auth-page">
      <nav className="site-nav page-width catalog-nav"><BrandMark /><Link href="/" className="text-link">← Kembali ke beranda</Link></nav>
      <div className="page-width auth-layout">
        <div className="auth-intro"><p className="eyebrow">Gila Komputer / akun</p><h1>Selamat<br /><em>datang kembali.</em></h1><p>Masuk untuk melihat riwayat pesanan dan checkout lebih cepat dengan data yang sudah tersimpan.</p></div>
        <LoginForm next={next} />
      </div>
    </main>
  )
}
