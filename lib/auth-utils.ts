// Util kecil untuk form daftar/login (validasi & redirect aman).

export const isValidEmail = (email: string) => email.length <= 191 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

// bcrypt hanya memakai 72 byte pertama, jadi batasi di sini supaya tidak membingungkan.
export const PASSWORD_MIN = 8
export const PASSWORD_MAX_BYTES = 72

export function validatePassword(password: string): string | null {
  if (password.length < PASSWORD_MIN) return `Password minimal ${PASSWORD_MIN} karakter.`
  if (new TextEncoder().encode(password).length > PASSWORD_MAX_BYTES) return `Password terlalu panjang (maks. ${PASSWORD_MAX_BYTES} byte).`
  return null
}

// Hanya izinkan redirect ke path internal (cegah open redirect lewat ?next=https://situs-jahat).
export function safeNextPath(value: unknown): string | null {
  if (typeof value !== 'string') return null
  if (!value.startsWith('/') || value.startsWith('//') || value.includes('\\')) return null
  return value
}

export const formString = (formData: FormData, key: string) => {
  const value = formData.get(key)
  return typeof value === 'string' ? value : ''
}
