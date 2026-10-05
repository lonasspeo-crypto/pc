import Link from 'next/link'
import type { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/dal'
import { formatIDR } from '@/lib/payment-methods'

const PAGE_SIZE = 30
const LOW_STOCK = 5

type Props = { searchParams: Promise<{ q?: string; kategori?: string; stok?: string; page?: string; ok?: string }> }

export default async function AdminProducts({ searchParams }: Props) {
  await requireAdmin('/admin/produk')
  const { q = '', kategori, stok, page = '1', ok } = await searchParams
  const pageNumber = Math.max(1, Math.floor(Number(page)) || 1)
  const query = q.trim().slice(0, 100)
  const categoryId = Number(kategori)

  const where: Prisma.ProductWhereInput = {
    ...(query ? { OR: [{ name: { contains: query } }, { slug: { contains: query } }] } : {}),
    ...(Number.isInteger(categoryId) && categoryId > 0 ? { categoryId } : {}),
    ...(stok === 'menipis' ? { stock: { lte: LOW_STOCK } } : {}),
  }
  const [products, total, categories] = await Promise.all([
    prisma.product.findMany({ where, orderBy: { id: 'asc' }, skip: (pageNumber - 1) * PAGE_SIZE, take: PAGE_SIZE, include: { category: true } }),
    prisma.product.count({ where }),
    prisma.category.findMany({ orderBy: { name: 'asc' } }),
  ])
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const link = (overrides: Record<string, string>) => `/admin/produk?${new URLSearchParams({ ...(query ? { q: query } : {}), ...(kategori ? { kategori } : {}), ...(stok ? { stok } : {}), ...overrides })}`

  return <>
    <div className="admin-title"><p className="eyebrow">Gila Komputer / admin</p><h1>Produk</h1><Link href="/admin/produk/baru" className="button button-dark">Tambah produk <span>+</span></Link></div>
    {ok && <p className="admin-flash admin-flash-ok" role="status">{ok}</p>}
    <form className="admin-filters" action="/admin/produk">
      <input name="q" defaultValue={query} placeholder="Cari nama atau slug…" aria-label="Cari produk" />
      <select name="kategori" defaultValue={kategori ?? ''} aria-label="Filter kategori"><option value="">Semua kategori</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select>
      <select name="stok" defaultValue={stok ?? ''} aria-label="Filter stok"><option value="">Semua stok</option><option value="menipis">Stok menipis (≤ {LOW_STOCK})</option></select>
      <button className="button button-outline">Terapkan</button>
    </form>

    <section className="admin-card">
      <p className="admin-count">{total} produk</p>
      {products.length === 0 ? <p className="admin-empty">Tidak ada produk yang cocok.</p> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Produk</th><th>Kategori</th><th>Harga</th><th>Stok</th><th>Status</th><th></th></tr></thead><tbody>
        {products.map((product) => <tr key={product.id}>
          <td>{product.name}<small>/{product.slug}</small></td>
          <td>{product.category.name}</td>
          <td>{formatIDR(product.price)}</td>
          <td><b className={product.stock === 0 ? 'stock-zero' : product.stock <= LOW_STOCK ? 'stock-low' : undefined}>{product.stock}</b></td>
          <td><span className={`status-badge ${product.status === 'ACTIVE' ? 'status-paid' : 'status-cancelled'}`}>{product.status === 'ACTIVE' ? 'Aktif' : 'Nonaktif'}</span></td>
          <td><Link href={`/admin/produk/${product.id}`} className="text-link">Edit</Link></td>
        </tr>)}
      </tbody></table></div>}
      {pages > 1 && <div className="admin-pager">{pageNumber > 1 && <Link href={link({ page: String(pageNumber - 1) })} className="text-link">← Sebelumnya</Link>}<span>Halaman {pageNumber} / {pages}</span>{pageNumber < pages && <Link href={link({ page: String(pageNumber + 1) })} className="text-link">Berikutnya →</Link>}</div>}
    </section>
  </>
}
