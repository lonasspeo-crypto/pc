import Link from 'next/link'
import { getCurrentUser } from '@/lib/dal'

// Tautan akun di navigasi: "Masuk" untuk tamu, nama + (Admin) untuk yang sudah login.
export default async function AccountLink() {
  const user = await getCurrentUser()
  if (!user) return <Link href="/masuk" className="nav-account">Masuk</Link>
  return <span className="nav-account-group">
    {user.role === 'ADMIN' && <Link href="/admin" className="nav-account nav-account-admin">Admin</Link>}
    <Link href="/akun" className="nav-account">{user.name.split(' ')[0]}</Link>
  </span>
}
