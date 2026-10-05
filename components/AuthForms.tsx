'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { login, register, type FormState } from '@/app/actions/auth'

function Field({ label, name, type = 'text', autoComplete, defaultValue, error, hint }: { label: string; name: string; type?: string; autoComplete?: string; defaultValue?: string; error?: string; hint?: string }) {
  return <label className="auth-field">
    <span>{label}</span>
    <input name={name} type={type} autoComplete={autoComplete} defaultValue={defaultValue} className={error ? 'is-invalid' : undefined} aria-invalid={error ? true : undefined} required />
    {hint && !error && <small>{hint}</small>}
    {error && <em className="field-error">{error}</em>}
  </label>
}

export function LoginForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(login, undefined)
  return <form action={action} className="auth-form" noValidate>
    <input type="hidden" name="next" value={state?.values?.next ?? next ?? ''} />
    <Field label="Email" name="email" type="email" autoComplete="email" defaultValue={state?.values?.email} />
    <Field label="Password" name="password" type="password" autoComplete="current-password" />
    {state?.error && <p className="checkout-error" role="alert">{state.error}</p>}
    <button className="button button-dark auth-submit" disabled={pending}>{pending ? 'Memeriksa…' : 'Masuk'} <span>↗</span></button>
    <p className="auth-switch">Belum punya akun? <Link href={next ? `/daftar?next=${encodeURIComponent(next)}` : '/daftar'}>Daftar sekarang</Link></p>
  </form>
}

export function RegisterForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(register, undefined)
  const errors = state?.fieldErrors ?? {}
  return <form action={action} className="auth-form" noValidate>
    <input type="hidden" name="next" value={state?.values?.next ?? next ?? ''} />
    <Field label="Nama lengkap" name="name" autoComplete="name" defaultValue={state?.values?.name} error={errors.name} />
    <Field label="Email" name="email" type="email" autoComplete="email" defaultValue={state?.values?.email} error={errors.email} />
    <Field label="Password" name="password" type="password" autoComplete="new-password" error={errors.password} hint="Minimal 8 karakter." />
    <Field label="Ulangi password" name="confirm" type="password" autoComplete="new-password" error={errors.confirm} />
    {state?.error && <p className="checkout-error" role="alert">{state.error}</p>}
    <button className="button button-dark auth-submit" disabled={pending}>{pending ? 'Membuat akun…' : 'Buat akun'} <span>↗</span></button>
    <p className="auth-switch">Sudah punya akun? <Link href={next ? `/masuk?next=${encodeURIComponent(next)}` : '/masuk'}>Masuk</Link></p>
  </form>
}
