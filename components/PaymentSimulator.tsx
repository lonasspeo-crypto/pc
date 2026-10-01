'use client'

import { useEffect, useState } from 'react'
import { findPaymentMethod, formatIDR, getPaymentInstructions, type PaymentInstruction } from '@/lib/payment-methods'

type SimOrder = { orderNumber: string; total: number; paymentMethodCode: string }

const PAYMENT_STORAGE_KEY = 'gila-komputer-last-payment'

// Layar simulasi pembayaran: tampilkan instruksi -> "bayar" -> loading gateway -> struk sukses.
export default function PaymentSimulator({ order, onDone }: { order: SimOrder; onDone?: () => void }) {
  const method = findPaymentMethod(order.paymentMethodCode)
  const [phase, setPhase] = useState<'instruction' | 'processing' | 'success' | 'failed'>('instruction')
  const [secondsLeft, setSecondsLeft] = useState(15 * 60) // batas bayar ala gateway: 15 menit
  const [paymentRef, setPaymentRef] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (phase !== 'instruction') return
    const timer = window.setInterval(() => setSecondsLeft((current) => Math.max(0, current - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [phase])

  if (!method) return null

  const instructions: PaymentInstruction[] = getPaymentInstructions(method, order.orderNumber).map((line) => (line.label === 'Jumlah' ? { ...line, value: formatIDR(order.total) } : line))
  const countdown = `${String(Math.floor(secondsLeft / 60)).padStart(2, '0')}:${String(secondsLeft % 60).padStart(2, '0')}`

  const confirmPayment = async () => {
    setPhase('processing')
    setError('')
    try {
      const response = await fetch('/api/orders/pay', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ orderNumber: order.orderNumber }) })
      const result = await response.json() as { order?: { paymentRef: string }; error?: string }
      if (!response.ok || !result.order) throw new Error(result.error ?? 'Pembayaran gagal diproses.')
      setPaymentRef(result.order.paymentRef)
      setPhase('success')
      onDone?.()
    } catch (payError) {
      setError(payError instanceof Error ? payError.message : 'Pembayaran gagal diproses.')
      setPhase('failed')
    }
  }

  const cancelOrder = async () => {
    setError('')
    try {
      const response = await fetch('/api/orders/pay', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ orderNumber: order.orderNumber, action: 'cancel' }) })
      const result = await response.json() as { error?: string }
      if (!response.ok) throw new Error(result.error ?? 'Pesanan tidak dapat dibatalkan.')
      onDone?.()
    } catch (cancelError) {
      setError(cancelError instanceof Error ? cancelError.message : 'Pesanan tidak dapat dibatalkan.')
    }
  }

  if (phase === 'processing' || phase === 'success') {
    return <section className="payment-sim" style={{ ['--pay-accent' as string]: method.color }}>
      <div className={`payment-status ${phase === 'processing' ? 'is-processing' : 'is-success'}`}>
        {phase === 'processing' ? <span className="payment-spinner" aria-hidden /> : <span className="payment-check">✓</span>}
        <p className="eyebrow">{phase === 'processing' ? 'Menghubungkan ke simulator' : 'Pembayaran berhasil'}</p>
        <h3>{phase === 'processing' ? `Memverifikasi via ${method.name}…` : `${method.name} terkonfirmasi`}</h3>
        {phase === 'processing' && <small>Ini hanya simulasi — tidak ada uang sungguhan yang bergerak.</small>}
        {phase === 'success' && <ul className="payment-receipt">
          <li><span>Order</span><strong>{order.orderNumber}</strong></li>
          <li><span>Metode</span><strong>{method.icon} {method.name}</strong></li>
          <li><span>Referensi</span><strong>{paymentRef}</strong></li>
          <li><span>Total</span><strong>{formatIDR(order.total)}</strong></li>
        </ul>}
      </div>
    </section>
  }

  return <section className="payment-sim" style={{ ['--pay-accent' as string]: method.color }}>
    <header className="payment-sim-head">
      <div>
        <p className="eyebrow">{method.category === 'ewallet' ? 'E-Wallet' : method.category === 'bank' ? 'Transfer Bank' : 'Virtual Account'} · Mode Simulasi</p>
        <h3>{method.icon} Bayar dengan {method.name}</h3>
      </div>
      <div className="payment-countdown"><small>Bayar dalam</small><strong>{secondsLeft > 0 ? countdown : 'KEDALUWARSA'}</strong></div>
    </header>
    <div className="payment-amount"><span>Jumlah tagihan</span><strong>{formatIDR(order.total)}</strong></div>
    <ul className="payment-instructions">
      <li><span>Nomor pesanan</span><strong>{order.orderNumber}</strong></li>
      {instructions.map((line) => <li key={line.label}><span>{line.label}</span><strong>{line.value}</strong></li>)}
    </ul>
    <p className="payment-note">⚠️ Simulator-only: tombol di bawah langsung menandai pesanan lunas tanpa memotong saldo/rekening mana pun.</p>
    {error && <p className="checkout-error" role="alert">{error}</p>}
    <div className="payment-actions">
      <button className="button button-dark payment-pay" type="button" onClick={confirmPayment} disabled={secondsLeft === 0}>Saya sudah bayar — verifikasi <span>↗</span></button>
      <button className="payment-cancel" type="button" onClick={cancelOrder}>Batalkan pesanan</button>
    </div>
  </section>
}

export { PAYMENT_STORAGE_KEY }
