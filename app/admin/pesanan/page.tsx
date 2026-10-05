import Link from 'next/link'
import type { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/dal'
import { ORDER_STATUSES, formatDateTime, isOrderStatus, orderStatusLabels, statusLabel } from '@/lib/order-status'
import { formatIDR } from '@/lib/payment-methods'

const PAGE_SIZE = 25

type Props = { searchParams: Promise<{ status?: string; q?: string; page?: string }> }

export default async function AdminOrders({ searchParams }: Props) {
  await requireAdmin('/admin/pesanan')
  const { status, q = '', page = '1' } = await searchParams
  const pageNumber = Math.max(1, Math.floor(Number(page)) || 1)
  const query = q.trim().slice(0, 100)

  const where: Prisma.OrderWhereInput = {
    ...(isOrderStatus(status) ? { status } : {}),
    ...(query ? { OR: [{ orderNumber: { contains: query } }, { customerName: { contains: query } }, { email: { contains: query } }] } : {}),
  }
  const [orders, total] = await Promise.all([
    prisma.order.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (pageNumber - 1) * PAGE_SIZE, take: PAGE_SIZE, include: { _count: { select: { items: true } } } }),
    prisma.order.count({ where }),
  ])
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const link = (overrides: Record<string, string>) => {
    const params = new URLSearchParams({ ...(status ? { status } : {}), ...(query ? { q: query } : {}), ...overrides })
    return `/admin/pesanan?${params}`
  }

  return <>
    <div className="admin-title"><p className="eyebrow">Gila Komputer / admin</p><h1>Pesanan</h1></div>
    <form className="admin-filters" action="/admin/pesanan">
      <input name="q" defaultValue={query} placeholder="Cari nomor, nama, atau email…" aria-label="Cari pesanan" />
      <select name="status" defaultValue={isOrderStatus(status) ? status : ''} aria-label="Filter status"><option value="">Semua status</option>{ORDER_STATUSES.map((value) => <option key={value} value={value}>{orderStatusLabels[value]}</option>)}</select>
      <button className="button button-outline">Terapkan</button>
    </form>

    <section className="admin-card">
      <p className="admin-count">{total} pesanan</p>
      {orders.length === 0 ? <p className="admin-empty">Tidak ada pesanan yang cocok.</p> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Nomor</th><th>Pembeli</th><th>Item</th><th>Total</th><th>Status</th></tr></thead><tbody>
        {orders.map((order) => <tr key={order.id}>
          <td><Link href={`/admin/pesanan/${encodeURIComponent(order.orderNumber)}`}>{order.orderNumber}</Link><small>{formatDateTime(order.createdAt)}</small></td>
          <td>{order.customerName}<small>{order.email}{order.userId ? '' : ' · tamu'}</small></td>
          <td>{order._count.items}</td>
          <td>{formatIDR(order.total)}</td>
          <td><span className={`status-badge status-${order.status.toLowerCase()}`}>{statusLabel(order.status)}</span></td>
        </tr>)}
      </tbody></table></div>}
      {pages > 1 && <div className="admin-pager">{pageNumber > 1 && <Link href={link({ page: String(pageNumber - 1) })} className="text-link">← Sebelumnya</Link>}<span>Halaman {pageNumber} / {pages}</span>{pageNumber < pages && <Link href={link({ page: String(pageNumber + 1) })} className="text-link">Berikutnya →</Link>}</div>}
    </section>
  </>
}
