'use client'

import { useActionState } from 'react'
import { changePassword, updateProfile, type FormState } from '@/app/actions/auth'

type Profile = { name: string; email: string; phone: string | null; address: string | null; city: string | null; postalCode: string | null }

function Field({ label, name, type = 'text', defaultValue, error, autoComplete, readOnly, wide }: { label: string; name: string; type?: string; defaultValue?: string; error?: string; autoComplete?: string; readOnly?: boolean; wide?: boolean }) {
  return <label className={wide ? 'auth-field auth-field-wide' : 'auth-field'}>
    <span>{label}</span>
    <input name={name} type={type} defaultValue={defaultValue} autoComplete={autoComplete} readOnly={readOnly} className={error ? 'is-invalid' : undefined} />
    {error && <em className="field-error">{error}</em>}
  </label>
}

export function ProfileForm({ profile }: { profile: Profile }) {
  const [state, action, pending] = useActionState<FormState, FormData>(updateProfile, undefined)
  const errors = state?.fieldErrors ?? {}
  return <form action={action} className="auth-form auth-form-grid" noValidate>
    <Field label="Nama lengkap" name="name" defaultValue={profile.name} error={errors.name} autoComplete="name" />
    <Field label="Email" name="email" defaultValue={profile.email} readOnly />
    <Field label="Telepon" name="phone" defaultValue={profile.phone ?? ''} error={errors.phone} autoComplete="tel" />
    <Field label="Kota" name="city" defaultValue={profile.city ?? ''} error={errors.city} autoComplete="address-level2" />
    <label className="auth-field auth-field-wide"><span>Alamat pengiriman</span><textarea name="address" rows={3} defaultValue={profile.address ?? ''} autoComplete="street-address" />{errors.address && <em className="field-error">{errors.address}</em>}</label>
    <Field label="Kode pos" name="postalCode" defaultValue={profile.postalCode ?? ''} error={errors.postalCode} autoComplete="postal-code" />
    <div className="auth-actions auth-field-wide">
      <button className="button button-dark auth-submit" disabled={pending}>{pending ? 'Menyimpan…' : 'Simpan profil'} <span>↗</span></button>
      {state?.success && <p className="auth-ok" role="status">{state.success}</p>}
      {state?.error && <p className="checkout-error" role="alert">{state.error}</p>}
    </div>
  </form>
}

export function PasswordForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(changePassword, undefined)
  const errors = state?.fieldErrors ?? {}
  return <form action={action} className="auth-form auth-form-grid" noValidate key={state?.success ? 'done' : 'form'}>
    <Field label="Password lama" name="current" type="password" autoComplete="current-password" error={errors.current} wide />
    <Field label="Password baru" name="password" type="password" autoComplete="new-password" error={errors.password} />
    <Field label="Ulangi password baru" name="confirm" type="password" autoComplete="new-password" error={errors.confirm} />
    <div className="auth-actions auth-field-wide">
      <button className="button button-outline auth-submit" disabled={pending}>{pending ? 'Menyimpan…' : 'Ganti password'} <span>↗</span></button>
      {state?.success && <p className="auth-ok" role="status">{state.success}</p>}
      {state?.error && <p className="checkout-error" role="alert">{state.error}</p>}
    </div>
  </form>
}
