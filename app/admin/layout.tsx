import type { Metadata } from 'next'
import Link from 'next/link'
import BrandMark from '@/components/BrandMark'
import AdminNav from '@/components/AdminNav'
import { logout } from '@/app/actions/auth'
import { requireAdmin } from '@/lib/dal'

export const metadata: Metadata = { title: 'Admin / Gila Komputer', robots: { index: false, follow: false } }

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Layout tidak dirender ulang saat pindah halaman, jadi setiap page admin juga memanggil requireAdmin().
  const admin = await requireAdmin()

  return (
    <div className="admin-shell">
      <header className="admin-header page-width">
        <BrandMark compact />
        <span className="admin-badge">Admin</span>
        <AdminNav />
        <div className="admin-user"><span>{admin.name}</span><Link href="/" className="text-link">Lihat toko ↗</Link><form action={logout}><button className="text-link">Keluar</button></form></div>
      </header>
      <main className="admin-main page-width">{children}</main>
    </div>
  )
}
