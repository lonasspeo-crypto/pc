import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/dal'
import AdminProductForm from '@/components/AdminProductForm'

export default async function NewProductPage() {
  await requireAdmin('/admin/produk/baru')
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } })

  return <>
    <div className="admin-title"><p className="eyebrow">Gila Komputer / admin / produk</p><h1>Produk baru</h1></div>
    <section className="admin-card"><AdminProductForm categories={categories} product={{ name: '', slug: '', description: '', price: 0, stock: 0, status: 'ACTIVE', categoryId: '', imageUrl: '', specs: '' }} /></section>
  </>
}
