import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/dal'
import { formatDateTime, statusLabel } from '@/lib/order-status'
import { formatIDR } from '@/lib/payment-methods'

const LOW_STOCK = 5

export default async function AdminDashboard() {
  await requireAdmin()

  const [byStatus, revenue, productCount, userCount, lowStock, recentOrders] = await Promise.all([
    prisma.order.groupBy({ by: ['status'], _count: { _all: true } }),
    prisma.order.aggregate({ where: { status: { in: ['PAID', 'SHIPPED', 'COMPLETED'] } }, _sum: { total: true } }),
    prisma.product.count({ where: { status: 'ACTIVE' } }),
    prisma.user.count(),
    prisma.product.findMany({ where: { status: 'ACTIVE', stock: { lte: LOW_STOCK } }, orderBy: { stock: 'asc' }, take: 8, include: { category: true } }),
    prisma.order.findMany({ orderBy: { createdAt: 'desc' }, take: 8 }),
  ])
  const count = (status: string) => byStatus.find((row) => row.status === status)?._count._all ?? 0
  const totalOrders = byStatus.reduce((sum, row) => sum + row._count._all, 0)

  const stats = [
    { label: 'Pendapatan', value: formatIDR(revenue._sum.total ?? 0), note: 'pesanan dibayar / dikirim / selesai' },
    { label: 'Total pesanan', value: String(totalOrders), note: `${count('PENDING')} menunggu bayar` },
    { label: 'Perlu dikirim', value: String(count('PAID')), note: 'sudah dibayar, belum dikirim' },
    { label: 'Produk aktif', value: String(productCount), note: `${lowStock.length} stok menipis` },
    { label: 'Pengguna', value: String(userCount), note: 'akun terdaftar' },
  ]

  return <>
    <div className="admin-title"><p className="eyebrow">Gila Komputer / admin</p><h1>Ringkasan</h1></div>
    <div className="admin-stats">{stats.map((stat) => <div key={stat.label} className="admin-stat"><span>{stat.label}</span><strong>{stat.value}</strong><small>{stat.note}</small></div>)}</div>

    <div className="admin-columns">
      <section className="admin-card">
        <div className="admin-card-head"><h2>Pesanan terbaru</h2><Link href="/admin/pesanan" className="text-link">Semua pesanan ↗</Link></div>
        {recentOrders.length === 0 ? <p className="admin-empty">Belum ada pesanan.</p> : <table className="admin-table"><thead><tr><th>Nomor</th><th>Pembeli</th><th>Total</th><th>Status</th></tr></thead><tbody>
          {recentOrders.map((order) => <tr key={order.id}><td><Link href={`/admin/pesanan/${encodeURIComponent(order.orderNumber)}`}>{order.orderNumber}</Link><small>{formatDateTime(order.createdAt)}</small></td><td>{order.customerName}</td><td>{formatIDR(order.total)}</td><td><span className={`status-badge status-${order.status.toLowerCase()}`}>{statusLabel(order.status)}</span></td></tr>)}
        </tbody></table>}
      </section>

      <section className="admin-card">
        <div className="admin-card-head"><h2>Stok menipis</h2><Link href="/admin/produk?stok=menipis" className="text-link">Lihat ↗</Link></div>
        {lowStock.length === 0 ? <p className="admin-empty">Semua stok aman.</p> : <table className="admin-table"><thead><tr><th>Produk</th><th>Stok</th></tr></thead><tbody>
          {lowStock.map((product) => <tr key={product.id}><td><Link href={`/admin/produk/${product.id}`}>{product.name}</Link><small>{product.category.name}</small></td><td><b className={product.stock === 0 ? 'stock-zero' : 'stock-low'}>{product.stock}</b></td></tr>)}
        </tbody></table>}
      </section>
    </div>
  </>
}
