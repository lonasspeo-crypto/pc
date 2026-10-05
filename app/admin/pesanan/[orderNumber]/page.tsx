import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/dal'
import { updateOrderStatus } from '@/app/admin/actions'
import { allowedTransitions, formatDateTime, isOrderStatus, orderStatusLabels, statusLabel } from '@/lib/order-status'
import { findPaymentMethod, formatIDR } from '@/lib/payment-methods'

type Props = { params: Promise<{ orderNumber: string }>; searchParams: Promise<{ ok?: string; error?: string }> }

const actionLabels = { PAID: 'Tandai sudah dibayar', SHIPPED: 'Tandai dikirim', COMPLETED: 'Tandai selesai', CANCELLED: 'Batalkan pesanan' } as const

export default async function AdminOrderDetail({ params, searchParams }: Props) {
  const { orderNumber: rawNumber } = await params
  const orderNumber = decodeURIComponent(rawNumber)
  await requireAdmin(`/admin/pesanan/${rawNumber}`)
  const { ok, error } = await searchParams

  const order = await prisma.order.findUnique({ where: { orderNumber }, include: { items: true, user: { select: { id: true, name: true, email: true } } } })
  if (!order) notFound()

  const transitions = isOrderStatus(order.status) ? allowedTransitions[order.status] : []
  const method = order.paymentMethod ? findPaymentMethod(order.paymentMethod) : undefined

  return <>
    <div className="admin-title"><p className="eyebrow"><Link href="/admin/pesanan">← Semua pesanan</Link></p><h1>{order.orderNumber}</h1><span className={`status-badge status-${order.status.toLowerCase()}`}>{statusLabel(order.status)}</span></div>
    {ok && <p className="admin-flash admin-flash-ok" role="status">{ok}</p>}
    {error && <p className="checkout-error" role="alert">{error}</p>}

    <div className="admin-columns">
      <section className="admin-card">
        <h2>Item pesanan</h2>
        <table className="admin-table"><thead><tr><th>Produk</th><th>Qty</th><th>Harga</th><th>Subtotal</th></tr></thead><tbody>
          {order.items.map((item) => <tr key={item.id}><td>{item.name}</td><td>{item.quantity}</td><td>{formatIDR(item.unitPrice)}</td><td>{formatIDR(item.unitPrice * item.quantity)}</td></tr>)}
        </tbody></table>
        <dl className="admin-sum"><div><dt>Subtotal</dt><dd>{formatIDR(order.subtotal)}</dd></div><div><dt>Ongkir ({order.shippingMethod})</dt><dd>{formatIDR(order.shippingFee)}</dd></div><div className="admin-sum-total"><dt>Total</dt><dd>{formatIDR(order.total)}</dd></div></dl>
      </section>

      <section className="admin-card">
        <h2>Pembeli & pengiriman</h2>
        <dl className="admin-details">
          <div><dt>Nama</dt><dd>{order.customerName}</dd></div>
          <div><dt>Email</dt><dd>{order.email}</dd></div>
          <div><dt>Telepon</dt><dd>{order.phone}</dd></div>
          <div><dt>Alamat</dt><dd>{order.address}, {order.city} {order.postalCode}</dd></div>
          <div><dt>Akun</dt><dd>{order.user ? `${order.user.name} (${order.user.email})` : 'Tamu (tanpa akun)'}</dd></div>
          <div><dt>Dibuat</dt><dd>{formatDateTime(order.createdAt)}</dd></div>
        </dl>
        <h2>Pembayaran</h2>
        <dl className="admin-details">
          <div><dt>Metode</dt><dd>{method?.name ?? order.paymentMethod ?? '—'}</dd></div>
          <div><dt>Referensi</dt><dd>{order.paymentRef ?? '—'}</dd></div>
          <div><dt>Dibayar</dt><dd>{order.paidAt ? formatDateTime(order.paidAt) : '—'}</dd></div>
        </dl>

        {transitions.length > 0 && <div className="admin-actions">
          <h2>Ubah status</h2>
          {transitions.map((to) => <form key={to} action={updateOrderStatus}>
            <input type="hidden" name="orderNumber" value={order.orderNumber} />
            <input type="hidden" name="to" value={to} />
            <button className={to === 'CANCELLED' ? 'button admin-danger' : 'button button-dark'}>{actionLabels[to as keyof typeof actionLabels] ?? orderStatusLabels[to]} <span>↗</span></button>
          </form>)}
          {transitions.includes('CANCELLED') && <p className="admin-hint">Membatalkan pesanan mengembalikan stok produk.</p>}
        </div>}
      </section>
    </div>
  </>
}
