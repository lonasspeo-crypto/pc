import type { Metadata } from 'next'
import Link from 'next/link'
import BrandMark from '@/components/BrandMark'
import { ProfileForm, PasswordForm } from '@/components/AccountForms'
import { logout } from '@/app/actions/auth'
import { requireUser } from '@/lib/dal'
import { prisma } from '@/lib/prisma'
import { formatDateTime, statusLabel } from '@/lib/order-status'
import { formatIDR } from '@/lib/payment-methods'

export const metadata: Metadata = { title: 'Akun saya / Gila Komputer' }

export default async function AccountPage() {
  const user = await requireUser('/akun')
  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: { items: true },
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  return (
    <main className="catalog-page account-page">
      <nav className="site-nav page-width catalog-nav"><BrandMark /><span className="account-nav-actions">{user.role === 'ADMIN' && <Link href="/admin" className="text-link">Halaman admin ↗</Link>}<Link href="/products" className="text-link">Belanja</Link></span></nav>
      <div className="page-width account-intro">
        <p className="eyebrow">Gila Komputer / akun saya</p>
        <h1>Halo,<br /><em>{user.name.split(' ')[0]}.</em></h1>
        <form action={logout}><button className="text-link account-logout">Keluar dari akun</button></form>
      </div>

      <div className="page-width account-grid">
        <section className="account-section">
          <div className="checkout-section-heading"><span>01</span><div><p className="eyebrow">Data pengiriman</p><h2>Profil</h2></div></div>
          <ProfileForm profile={user} />
        </section>

        <section className="account-section">
          <div className="checkout-section-heading"><span>02</span><div><p className="eyebrow">Keamanan</p><h2>Password</h2></div></div>
          <PasswordForm />
        </section>
      </div>

      <div className="page-width account-orders">
        <div className="checkout-section-heading"><span>03</span><div><p className="eyebrow">Riwayat</p><h2>Pesananmu</h2></div></div>
        {orders.length === 0
          ? <div className="empty-products"><span>∅</span><p>Belum ada pesanan. <Link href="/products" className="text-link">Mulai belanja</Link></p></div>
          : <ul className="order-list">{orders.map((order) => <li key={order.id}>
              <div><strong>{order.orderNumber}</strong><small>{formatDateTime(order.createdAt)}</small></div>
              <div className="order-list-items">{order.items.map((item) => <span key={item.id}>{item.quantity}× {item.name}</span>)}</div>
              <div className="order-list-meta"><span className={`status-badge status-${order.status.toLowerCase()}`}>{statusLabel(order.status)}</span><b>{formatIDR(order.total)}</b></div>
            </li>)}</ul>}
      </div>
    </main>
  )
}
