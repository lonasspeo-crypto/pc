// Membuat (atau menjadikan) akun admin.
//   npm run db:create-admin
// Membaca ADMIN_NAME / ADMIN_EMAIL / ADMIN_PASSWORD dari .env bila ada; kalau tidak,
// akan bertanya di terminal (password tidak ditampilkan saat diketik).
// Kalau emailnya sudah terdaftar, akun itu dinaikkan jadi ADMIN dan password-nya
// TIDAK diubah kecuali kamu mengisi password baru.
import bcrypt from 'bcryptjs'
import readline from 'node:readline'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function ask(question: string, { hidden = false } = {}): Promise<string> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true })
    if (hidden) {
      const writer = rl as unknown as { _writeToOutput: (text: string) => void }
      writer._writeToOutput = (text: string) => { if (text.includes(question)) process.stdout.write(text) }
    }
    rl.question(question, (answer) => { rl.close(); if (hidden) process.stdout.write('\n'); resolve(answer) })
  })
}

async function main() {
  const email = (process.env.ADMIN_EMAIL || await ask('Email admin: ')).trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Format email tidak valid.')

  const existing = await prisma.user.findUnique({ where: { email } })
  const name = (process.env.ADMIN_NAME || (existing ? existing.name : await ask('Nama admin: '))).trim()
  const password = process.env.ADMIN_PASSWORD || await ask(existing ? 'Password baru (kosongkan untuk tidak mengubah): ' : 'Password (min. 8 karakter): ', { hidden: true })

  if (!existing && password.length < 8) throw new Error('Password minimal 8 karakter.')
  if (password && (password.length < 8 || Buffer.byteLength(password) > 72)) throw new Error('Password harus 8–72 karakter.')
  if (name.length < 2) throw new Error('Nama minimal 2 karakter.')

  const passwordHash = password ? await bcrypt.hash(password, 12) : undefined
  if (existing) {
    await prisma.user.update({ where: { id: existing.id }, data: { role: 'ADMIN', name, ...(passwordHash ? { passwordHash } : {}) } })
    console.log(`✓ ${email} sekarang ADMIN${passwordHash ? ' (password diperbarui)' : ''}.`)
  } else {
    await prisma.user.create({ data: { name, email, passwordHash: passwordHash!, role: 'ADMIN' } })
    console.log(`✓ Akun admin dibuat: ${email}`)
  }
}

main().catch((error) => { console.error('✗', error instanceof Error ? error.message : error); process.exitCode = 1 }).finally(() => prisma.$disconnect())
