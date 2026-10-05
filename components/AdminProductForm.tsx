'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { saveProduct, type ProductFormState } from '@/app/admin/actions'

export type ProductFormValues = {
  id?: number
  name: string
  slug: string
  description: string
  price: number
  stock: number
  status: string
  categoryId: number | ''
  imageUrl: string
  specs: string
}

export default function AdminProductForm({ product, categories }: { product: ProductFormValues; categories: { id: number; name: string }[] }) {
  const [state, action, pending] = useActionState<ProductFormState, FormData>(saveProduct, undefined)
  const errors = state?.fieldErrors ?? {}
  const err = (key: string) => errors[key] && <em className="field-error">{errors[key]}</em>

  return <form action={action} className="auth-form auth-form-grid admin-product-form" noValidate>
    {product.id !== undefined && <input type="hidden" name="id" value={product.id} />}
    <label className="auth-field auth-field-wide"><span>Nama produk</span><input name="name" defaultValue={product.name} className={errors.name ? 'is-invalid' : undefined} />{err('name')}</label>
    <label className="auth-field"><span>Slug (URL)</span><input name="slug" defaultValue={product.slug} placeholder="otomatis dari nama" className={errors.slug ? 'is-invalid' : undefined} />{err('slug')}</label>
    <label className="auth-field"><span>Kategori</span><select name="categoryId" defaultValue={product.categoryId} className={errors.categoryId ? 'is-invalid' : undefined}><option value="">Pilih kategori…</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select>{err('categoryId')}</label>
    <label className="auth-field"><span>Harga (Rp)</span><input name="price" type="number" min={0} step={1} inputMode="numeric" defaultValue={product.price} className={errors.price ? 'is-invalid' : undefined} />{err('price')}</label>
    <label className="auth-field"><span>Stok</span><input name="stock" type="number" min={0} step={1} inputMode="numeric" defaultValue={product.stock} className={errors.stock ? 'is-invalid' : undefined} />{err('stock')}</label>
    <label className="auth-field"><span>Status</span><select name="status" defaultValue={product.status}><option value="ACTIVE">Aktif (tampil di toko)</option><option value="INACTIVE">Nonaktif (disembunyikan)</option></select>{err('status')}</label>
    <label className="auth-field"><span>Gambar (path di /public)</span><input name="imageUrl" defaultValue={product.imageUrl} placeholder="otomatis sesuai kategori" className={errors.imageUrl ? 'is-invalid' : undefined} />{err('imageUrl')}</label>
    <label className="auth-field auth-field-wide"><span>Deskripsi</span><textarea name="description" rows={3} defaultValue={product.description} className={errors.description ? 'is-invalid' : undefined} />{err('description')}</label>
    <label className="auth-field auth-field-wide"><span>Spesifikasi (satu per baris, format “Nama: Nilai”)</span><textarea name="specs" rows={6} defaultValue={product.specs} placeholder={'Socket: AM5\nCores: 8C/16T'} className={errors.specs ? 'is-invalid' : undefined} />{err('specs')}</label>
    <div className="auth-actions auth-field-wide">
      <button className="button button-dark auth-submit" disabled={pending}>{pending ? 'Menyimpan…' : product.id === undefined ? 'Tambah produk' : 'Simpan perubahan'} <span>↗</span></button>
      <Link href="/admin/produk" className="text-link">Batal</Link>
      {state?.error && <p className="checkout-error" role="alert">{state.error}</p>}
    </div>
  </form>
}
