// Pembatas percobaan sederhana (in-memory) untuk login & daftar.
// Catatan: state-nya per-proses. Cukup untuk satu server; kalau di-deploy ke
// banyak instance/serverless, ganti dengan penyimpanan bersama (mis. Redis).
type Bucket = { count: number; resetAt: number }

const buckets = new Map<string, Bucket>()

export function hitRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now()
  if (buckets.size > 5000) for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k)

  const bucket = buckets.get(key)
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return { limited: false, retryAfterSeconds: 0 }
  }
  bucket.count += 1
  return { limited: bucket.count > limit, retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000) }
}

export function resetRateLimit(key: string) {
  buckets.delete(key)
}
