import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/dal'
import AdminProductForm from '@/components/AdminProductForm'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: rawId } = await params
  await requireAdmin(`/admin/produk/${rawId}`)
  const id = Number(rawId)
  if (!Number.isInteger(id) || id < 1) notFound()

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: 'asc' } }),
  ])
  if (!product) notFound()

  const specs = product.specs && typeof product.specs === 'object' && !Array.isArray(product.specs)
    ? Object.entries(product.specs as Record<string, unknown>).map(([key, value]) => `${key}: ${String(value)}`).join('\n')
    : ''

  return <>
    <div className="admin-title"><p className="eyebrow">Gila Komputer / admin / produk</p><h1>Edit produk</h1></div>
    <section className="admin-card"><AdminProductForm categories={categories} product={{ id: product.id, name: product.name, slug: product.slug, description: product.description, price: product.price, stock: product.stock, status: product.status, categoryId: product.categoryId, imageUrl: product.imageUrl, specs }} /></section>
  </>
}
