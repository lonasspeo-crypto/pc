import Link from 'next/link'
import { Suspense } from 'react'
import BrandMark from '@/components/BrandMark'
import AccountLink from '@/components/AccountLink'
import CheckoutForm from '@/components/CheckoutForm'
import { getCurrentUser } from '@/lib/dal'

export default async function CheckoutPage() {
  const user = await getCurrentUser()

  return (
    <main className="catalog-page checkout-page">
      <nav className="site-nav page-width catalog-nav"><BrandMark /><span className="account-nav-actions"><Suspense><AccountLink /></Suspense><Link href="/products" className="text-link">← Kembali belanja</Link></span></nav>
      <div className="page-width checkout-intro"><p className="eyebrow">Gila Komputer / checkout</p><h1>Selesaikan<br /><em>pesananmu.</em></h1><p>Tiga langkah mudah: isi data → pilih kirim & bayar → transaksi selesai. Harga dan stok dicek ulang saat pesanan dibuat.</p>{user
        ? <p className="checkout-account-note">Masuk sebagai <b>{user.email}</b>. Pesanan ini akan tersimpan di riwayat akunmu.</p>
        : <p className="checkout-account-note">Punya akun? <Link href="/masuk?next=%2Fcheckout">Masuk</Link> atau <Link href="/daftar?next=%2Fcheckout">daftar</Link> agar data terisi otomatis dan pesanan tercatat. Atau lanjut sebagai tamu.</p>}
        <ol className="checkout-guide" aria-label="Panduan singkat"><li><b>1</b> Isi nama, kontak, dan alamat pengirimannya.</li><li><b>2</b> Pilih ongkir dan metode bayar (e-wallet / bank / VA).</li><li><b>3</b> Tekan “Saya sudah bayar” — pesanan langsung terkonfirmasi.</li></ol></div>
      <div className="page-width"><CheckoutForm defaults={user ? { customerName: user.name, email: user.email, phone: user.phone ?? '', address: user.address ?? '', city: user.city ?? '', postalCode: user.postalCode ?? '' } : undefined} /></div>
    </main>
  )
}
