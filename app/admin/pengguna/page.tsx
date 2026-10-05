import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/dal'
import { setUserRole } from '@/app/admin/actions'
import { formatDateTime } from '@/lib/order-status'

type Props = { searchParams: Promise<{ ok?: string; error?: string }> }

export default async function AdminUsers({ searchParams }: Props) {
  const admin = await requireAdmin('/admin/pengguna')
  const { ok, error } = await searchParams
  const users = await prisma.user.findMany({
    orderBy: [{ role: 'asc' }, { createdAt: 'desc' }],
    take: 200,
    select: { id: true, name: true, email: true, role: true, createdAt: true, _count: { select: { orders: true } } },
  })

  return <>
    <div className="admin-title"><p className="eyebrow">Gila Komputer / admin</p><h1>Pengguna</h1></div>
    {ok && <p className="admin-flash admin-flash-ok" role="status">{ok}</p>}
    {error && <p className="checkout-error" role="alert">{error}</p>}

    <section className="admin-card">
      <p className="admin-count">{users.length} akun</p>
      <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Nama</th><th>Email</th><th>Pesanan</th><th>Bergabung</th><th>Role</th></tr></thead><tbody>
        {users.map((user) => <tr key={user.id}>
          <td>{user.name}{user.id === admin.id && <small>akunmu</small>}</td>
          <td>{user.email}</td>
          <td>{user._count.orders}</td>
          <td>{formatDateTime(user.createdAt)}</td>
          <td>{user.id === admin.id
            ? <span className="status-badge status-paid">Admin</span>
            : <form action={setUserRole} className="admin-inline-form">
                <input type="hidden" name="userId" value={user.id} />
                <input type="hidden" name="role" value={user.role === 'ADMIN' ? 'USER' : 'ADMIN'} />
                <span className={`status-badge ${user.role === 'ADMIN' ? 'status-paid' : 'status-pending'}`}>{user.role === 'ADMIN' ? 'Admin' : 'Pembeli'}</span>
                <button className="text-link">{user.role === 'ADMIN' ? 'Jadikan pembeli' : 'Jadikan admin'}</button>
              </form>}</td>
        </tr>)}
      </tbody></table></div>
      <p className="admin-hint">Password tidak pernah ditampilkan atau disimpan dalam bentuk asli (hanya hash bcrypt).</p>
    </section>
  </>
}
