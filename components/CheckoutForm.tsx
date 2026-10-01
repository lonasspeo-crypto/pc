'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import PaymentSimulator, { PAYMENT_STORAGE_KEY } from '@/components/PaymentSimulator'
import { paymentMethods, formatIDR, type PaymentCategory } from '@/lib/payment-methods'

type CartItem = { id: string; name: string; category: string; price: number; quantity: number }
type ShippingMethod = 'regular' | 'express'
type PlacedOrder = { orderNumber: string; total: number; paymentMethodCode: string }

const CART_STORAGE_KEY = 'gila-komputer-cart'
const shippingOptions: Record<ShippingMethod, { label: string; description: string; fee: number }> = {
  regular: { label: 'Regular', description: '2-4 hari kerja', fee: 25000 },
  express: { label: 'Express', description: '1-2 hari kerja', fee: 50000 },
}

const categoryLabels: Record<PaymentCategory, string> = {
  ewallet: 'E-Wallet',
  bank: 'Transfer Bank',
  'virtual-account': 'Virtual Account',
}

const formatPrice = (value: number) => `Rp ${value.toLocaleString('id-ID')}`

export default function CheckoutForm() {
  const [items, setItems] = useState<CartItem[]>([])
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>('regular')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [order, setOrder] = useState<PlacedOrder | null>(null)
  const [form, setForm] = useState({ customerName: '', email: '', phone: '', address: '', city: '', postalCode: '' })

  useEffect(() => {
    // Pulihkan sesi pembayaran yang belum tuntas setelah refresh halaman.
    try {
      const storedOrder = window.localStorage.getItem(PAYMENT_STORAGE_KEY)
      if (storedOrder) {
        const parsed = JSON.parse(storedOrder) as PlacedOrder
        if (parsed?.orderNumber && parsed?.paymentMethodCode) setOrder(parsed)
      }
    } catch { /* abaikan */ }

    const storedItems = window.localStorage.getItem(CART_STORAGE_KEY)
    if (storedItems) {
      try {
        const parsedItems = JSON.parse(storedItems) as CartItem[]
        if (Array.isArray(parsedItems)) window.setTimeout(() => setItems(parsedItems), 0)
      } catch {
        window.localStorage.removeItem(CART_STORAGE_KEY)
      }
    }
  }, [])

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items])
  const shippingFee = shippingOptions[shippingMethod].fee
  const total = subtotal + shippingFee
  const updateField = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }))

  const groupedMethods = useMemo(() => {
    const groups: Record<PaymentCategory, typeof paymentMethods> = { ewallet: [], bank: [], 'virtual-account': [] }
    for (const method of paymentMethods) groups[method.category].push(method)
    return groups
  }, [])

  const clearStoredOrder = () => {
    window.localStorage.removeItem(PAYMENT_STORAGE_KEY)
    setOrder(null)
  }

  const submitOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    if (!paymentMethod) { setError('Pilih metode pembayaran terlebih dahulu.'); return }
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, shippingMethod, paymentMethod, items: items.map((item) => ({ productId: Number(item.id), quantity: item.quantity })) }) })
      const result = await response.json() as { order?: { orderNumber: string; total: number; paymentMethod: string }; error?: string }
      if (!response.ok || !result.order) throw new Error(result.error ?? 'Order tidak dapat dibuat.')
      window.localStorage.removeItem(CART_STORAGE_KEY)
      window.dispatchEvent(new CustomEvent('gila:cart-updated', { detail: { items: [] } }))
      setItems([])
      const placed: PlacedOrder = { orderNumber: result.order.orderNumber, total: result.order.total, paymentMethodCode: result.order.paymentMethod ?? paymentMethod }
      window.localStorage.setItem(PAYMENT_STORAGE_KEY, JSON.stringify(placed))
      setOrder(placed)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (order) {
    return <div className="checkout-payment-stage">
      <PaymentSimulator key={order.orderNumber} order={order} onDone={clearStoredOrder} />
      <p className="checkout-payment-back"><Link href="/products" className="text-link">← Kembali ke katalog</Link></p>
    </div>
  }

  if (!items.length) return <section className="checkout-empty"><p className="eyebrow">Keranjang kosong</p><h2>Belum ada<br /><em>yang berangkat.</em></h2><p>Tambahkan komponen ke keranjang sebelum melanjutkan ke checkout.</p><Link href="/products" className="button button-dark">Pilih komponen <span>↗</span></Link></section>

  return <form className="checkout-layout" onSubmit={submitOrder}>
    <div className="checkout-fields">
      <section className="checkout-section"><div className="checkout-section-heading"><span>01</span><div><p className="eyebrow">Data customer</p><h2>Siapa yang<br /><em>memesan?</em></h2></div></div><div className="checkout-field-grid"><label>Nama lengkap<input required value={form.customerName} onChange={(event) => updateField('customerName', event.target.value)} /></label><label>Email<input required type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} /></label><label>Nomor telepon<input required type="tel" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} /></label></div></section>
      <section className="checkout-section"><div className="checkout-section-heading"><span>02</span><div><p className="eyebrow">Alamat pengiriman</p><h2>Ke mana<br /><em>kami antar?</em></h2></div></div><div className="checkout-field-grid"><label className="field-wide">Alamat lengkap<textarea required rows={3} value={form.address} onChange={(event) => updateField('address', event.target.value)} /></label><label>Kota<input required value={form.city} onChange={(event) => updateField('city', event.target.value)} /></label><label>Kode pos<input required inputMode="numeric" value={form.postalCode} onChange={(event) => updateField('postalCode', event.target.value)} /></label></div></section>
      <section className="checkout-section"><div className="checkout-section-heading"><span>03</span><div><p className="eyebrow">Metode pengiriman</p><h2>Pilih cara<br /><em>sampainya.</em></h2></div></div><div className="shipping-options">{Object.entries(shippingOptions).map(([value, option]) => <label className={shippingMethod === value ? 'shipping-option is-active' : 'shipping-option'} key={value}><input type="radio" name="shipping" value={value} checked={shippingMethod === value} onChange={() => setShippingMethod(value as ShippingMethod)} /><span><strong>{option.label}</strong><small>{option.description}</small></span><b>{formatPrice(option.fee)}</b></label>)}</div></section>
      <section className="checkout-section checkout-payment-section"><div className="checkout-section-heading"><span>04</span><div><p className="eyebrow">Metode pembayaran · simulasi</p><h2>Bayar lewat<br /><em>mana?</em></h2></div></div>
        {Object.entries(groupedMethods).map(([category, methods]) => <div className="payment-group" key={category}>
          <p className="payment-group-label">{categoryLabels[category as PaymentCategory]}</p>
          <div className="payment-options">{methods.map((method) => <label key={method.code} className={paymentMethod === method.code ? 'payment-option is-active' : 'payment-option'} style={{ ['--pay-accent' as string]: method.color }}>
            <input type="radio" name="payment" value={method.code} checked={paymentMethod === method.code} onChange={() => setPaymentMethod(method.code)} />
            <span className="payment-option-icon" aria-hidden>{method.icon}</span>
            <span className="payment-option-text"><strong>{method.name}</strong><small>{method.description}</small></span>
          </label>)}</div>
        </div>)}
        <p className="payment-sim-badge">🧪 Mode simulasi — tidak ada transaksi uang sungguhan.</p>
      </section>
    </div>
    <aside className="checkout-summary"><p className="eyebrow">Ringkasan order</p><div className="checkout-summary-items">{items.map((item) => <div key={item.id}><span>{item.name}<small>{item.quantity} × {formatPrice(item.price)}</small></span><strong>{formatPrice(item.price * item.quantity)}</strong></div>)}</div><div className="checkout-summary-line"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><div className="checkout-summary-line"><span>Ongkir</span><strong>{formatPrice(shippingFee)}</strong></div><div className="checkout-total"><span>Total</span><strong>{formatIDR(total)}</strong></div>{error && <p className="checkout-error" role="alert">{error}</p>}<button className="button button-dark" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Menyimpan...' : 'Buat pesanan & bayar'} <span>↗</span></button></aside>
  </form>
}
