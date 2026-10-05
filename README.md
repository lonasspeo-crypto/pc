# Gila Komputer

Toko komponen komputer (Next.js 16 + Prisma + MySQL) dengan akun pembeli dan panel admin.

## Akun pembeli & admin

Pertama kali menyalakan fitur akun:

1. `npm install`
2. Salin `.env.example` ke `.env`, lalu isi `DATABASE_URL` dan **`AUTH_SECRET`** (minimal 32 karakter acak):
   `node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"`
3. Terapkan migrasi database: `npx prisma migrate deploy`
   - Kalau database kamu sudah punya kolom pembayaran (`paymentMethod`, `paymentRef`, `paidAt`) tapi migrasi
     `20261002000000_add_payment_simulation` belum tercatat, jalankan dulu:
     `npx prisma migrate resolve --applied 20261002000000_add_payment_simulation`
4. Buat akun admin: `npm run db:create-admin` (akan menanyakan email, nama, dan password)
5. `npm run dev`, lalu buka `/daftar` (pembeli), `/masuk`, dan `/admin` (khusus admin).

Ringkas:

| Rute | Siapa | Fungsi |
| --- | --- | --- |
| `/daftar`, `/masuk` | tamu | buat akun / login |
| `/akun` | pembeli | profil, ganti password, riwayat pesanan |
| `/admin` | admin | ringkasan penjualan & stok menipis |
| `/admin/pesanan` | admin | daftar, cari, filter, dan ubah status pesanan |
| `/admin/produk` | admin | tambah / edit produk, harga, stok, aktif/nonaktif |
| `/admin/pengguna` | admin | lihat akun dan atur role |

Catatan keamanan: password disimpan sebagai hash bcrypt; sesi memakai cookie `httpOnly` bertanda tangan
(`AUTH_SECRET`); semua halaman dan server action admin memeriksa role ke database. Checkout tamu tetap bisa dipakai.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
