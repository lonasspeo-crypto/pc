'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/admin', label: 'Ringkasan', exact: true },
  { href: '/admin/pesanan', label: 'Pesanan' },
  { href: '/admin/produk', label: 'Produk' },
  { href: '/admin/pengguna', label: 'Pengguna' },
]

export default function AdminNav() {
  const pathname = usePathname()
  return <nav className="admin-nav" aria-label="Navigasi admin">
    {links.map((link) => {
      const active = link.exact ? pathname === link.href : pathname.startsWith(link.href)
      return <Link key={link.href} href={link.href} className={active ? 'is-active' : undefined} aria-current={active ? 'page' : undefined}>{link.label}</Link>
    })}
  </nav>
}
