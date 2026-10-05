import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySessionToken } from '@/lib/jwt'

// Pengecekan AWAL (optimistic): hanya membaca cookie, tanpa database.
// Otorisasi yang sebenarnya tetap dilakukan di server lewat lib/dal.ts
// (requireUser / requireAdmin) pada setiap halaman dan action.
const SESSION_COOKIE = 'gk_session'

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const session = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)

  const needsLogin = pathname === '/akun' || pathname.startsWith('/akun/') || pathname === '/admin' || pathname.startsWith('/admin/')
  if (needsLogin && !session) {
    const loginUrl = new URL('/masuk', request.url)
    loginUrl.searchParams.set('next', pathname + search)
    return NextResponse.redirect(loginUrl)
  }

  // Role admin sengaja TIDAK diperiksa di sini: role di token bisa usang setelah diubah.
  // Setiap halaman & action admin memanggil requireAdmin() yang membaca role dari database.

  // Catatan: sengaja TIDAK mengalihkan /masuk atau /daftar di sini. Cookie yang valid
  // belum tentu berarti akunnya masih ada; halaman masuk/daftar memeriksanya ke database
  // supaya akun yang sudah dihapus tidak terjebak redirect berulang.
  return NextResponse.next()
}

export const config = {
  matcher: ['/akun/:path*', '/admin/:path*'],
}
