import Link from 'next/link'
import BrandMark from '@/components/BrandMark'
import CheckoutForm from '@/components/CheckoutForm'

export default function CheckoutPage() {
  return (
    <main className="catalog-page checkout-page">
      <nav className="site-nav page-width catalog-nav"><BrandMark /><Link href="/products" className="text-link">← Kembali belanja</Link></nav>
      <div className="page-width checkout-intro"><p className="eyebrow">Gila Komputer / checkout</p><h1>Selesaikan<br /><em>pesananmu.</em></h1><p>Tiga langkah mudah: isi data → pilih kirim & bayar → transaksi selesai. Harga dan stok dicek ulang saat pesanan dibuat.</p><ol className="checkout-guide" aria-label="Panduan singkat"><li><b>1</b> Isi nama, kontak, dan alamat pengirimannya.</li><li><b>2</b> Pilih ongkir dan metode bayar (e-wallet / bank / VA).</li><li><b>3</b> Tekan “Saya sudah bayar” — pesanan langsung terkonfirmasi.</li></ol></div>
      <div className="page-width"><CheckoutForm /></div>
    </main>
  )
}
