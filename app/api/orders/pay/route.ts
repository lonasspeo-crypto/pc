import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { findPaymentMethod } from '@/lib/payment-methods'

// ============================================================================
// SIMULASI PAYMENT GATEWAY — TIDAK terhubung ke provider sungguhan.
// Alur: order dibuat (PENDING) -> client memanggil endpoint ini untuk
// "membayar" -> status berubah ke PAID + paymentRef + paidAt.
// Untuk integrasi asli, ganti bagian ini dengan webhook/callback Midtrans/Xendit.
// ============================================================================

const randomHex = (bytes: number) => Array.from({ length: bytes }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('')

export async function POST(request: Request) {
  let body: { orderNumber?: unknown; action?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Data pembayaran tidak valid.' }, { status: 400 })
  }

  const orderNumber = typeof body.orderNumber === 'string' ? body.orderNumber.trim() : ''
  const action = body.action === 'cancel' ? 'cancel' : 'pay' // default: bayar
  if (!orderNumber) return NextResponse.json({ error: 'Nomor pesanan wajib diisi.' }, { status: 400 })

  try {
    const result = await prisma.$transaction(async (transaction) => {
      const order = await transaction.order.findUnique({ where: { orderNumber }, include: { items: true } })
      if (!order) throw new Error('Pesanan tidak ditemukan.')
      if (order.status !== 'PENDING') throw new Error(`Pesanan sudah ${order.status.toLowerCase()} dan tidak dapat diubah.`)

      if (action === 'cancel') {
        // Kembalikan stok karena pesanan dibatalkan sebelum dibayar.
        for (const item of order.items) {
          await transaction.product.update({ where: { id: item.productId }, data: { stock: { increment: item.quantity } } })
        }
        return transaction.order.update({ where: { id: order.id }, data: { status: 'CANCELLED' } })
      }

      const method = order.paymentMethod ? findPaymentMethod(order.paymentMethod) : undefined
      if (!method) throw new Error('Metode pembayaran pada pesanan tidak dikenali.')

      // ---- Di sinilah simulasi terjadi ----
      // Gateway asli: buat billing token / VA number lalu tunggu webhook `settlement`.
      // Simulasi: langsung dianggap sukses dengan nomor referensi acak.
      const paymentRef = `${method.code.toUpperCase().replace(/[^A-Z0-9]/g, '')}-${randomHex(8).toUpperCase()}`

      return transaction.order.update({
        where: { id: order.id },
        data: { status: 'PAID', paymentRef, paidAt: new Date() },
      })
    })

    return NextResponse.json({
      order: {
        orderNumber: result.orderNumber,
        status: result.status,
        total: result.total,
        paymentMethod: result.paymentMethod,
        paymentRef: result.paymentRef,
        paidAt: result.paidAt,
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Pembayaran gagal diproses.'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
