'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', password: '', role: 'ARTIST',
    stageName: '', country: 'MA', iban: '', mobileMoneyNumber: '',
    labelName: '',
  })

  const update = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const err = await res.json()
        toast.error(err.error ?? 'Erreur lors de l\'inscription')
        return
      }
      toast.success('Compte créé ! Bienvenue sur RightFlow.')
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = { width: '100%', padding: '9px 12px', fontSize: '13px', border: '0.5px solid #e5e7eb', borderRadius: '7px', outline: 'none', background: '#f9fafb', fontFamily: 'inherit', marginBottom: '12px' }
  const labelStyle = { fontSize: '11px', fontWeight: 500 as const, color: '#6b7280', display: 'block' as const, marginBottom: '4px', textTransform: 'uppercase' as const, letterSpacing: '0.5px' }

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-syne, sans-serif)' }}>
      <div style={{ width: '100%', maxWidth: '420px', padding: '0 20px' }}>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#1D9E75', display: 'inline-block' }} />
            <span style={{ fontSize: '22px', fontWeight: 700 }}>RightFlow</span>
          </div>
          <p style={{ fontSize: '12px', color: '#9ca3af' }}>Étape {step} sur 2</p>
        </div>

        <div style={{ background: 'white', borderRadius: '12px', border: '0.5px solid #e5e7eb', padding: '24px' }}>

          {step === 1 && (
            <>
              <h2 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>Informations du compte</h2>

              {/* Role selector */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
                {[{ val: 'ARTIST', label: 'Artiste / Auteur' }, { val: 'LABEL', label: 'Label / Éditeur' }].map(r => (
                  <button key={r.val} onClick={() => update('role', r.val)}
                    style={{ padding: '10px', borderRadius: '7px', border: `1.5px solid ${form.role === r.val ? '#1D9E75' : '#e5e7eb'}`, background: form.role === r.val ? '#E1F5EE' : 'white', color: form.role === r.val ? '#085041' : '#6b7280', fontSize: '12px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                    {r.label}
                  </button>
                ))}
              </div>

              <label style={labelStyle}>Nom complet</label>
              <input style={inputStyle} value={form.name} onChange={e => update('name', e.target.value)} placeholder="Mohamed El Alami" />

              <label style={labelStyle}>Email</label>
              <input style={inputStyle} type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="contact@exemple.ma" />

              <label style={labelStyle}>Mot de passe</label>
              <input style={inputStyle} type="password" value={form.password} onChange={e => update('password', e.target.value)} placeholder="Min. 8 caractères" />

              <button onClick={() => setStep(2)} disabled={!form.name || !form.email || !form.password}
                style={{ width: '100%', padding: '10px', background: '#0F6E56', color: '#E1F5EE', borderRadius: '7px', border: 'none', fontSize: '13px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                Continuer →
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h2 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>
                {form.role === 'ARTIST' ? 'Profil artiste' : 'Profil label'}
              </h2>

              {form.role === 'ARTIST' ? (
                <>
                  <label style={labelStyle}>Nom de scène</label>
                  <input style={inputStyle} value={form.stageName} onChange={e => update('stageName', e.target.value)} placeholder="Nom d'artiste" />
                </>
              ) : (
                <>
                  <label style={labelStyle}>Nom du label</label>
                  <input style={inputStyle} value={form.labelName} onChange={e => update('labelName', e.target.value)} placeholder="Mon Label Music" />
                </>
              )}

              <label style={labelStyle}>Pays</label>
              <select style={{ ...inputStyle }} value={form.country} onChange={e => update('country', e.target.value)}>
                <option value="MA">🇲🇦 Maroc</option>
                <option value="DZ">🇩🇿 Algérie</option>
                <option value="TN">🇹🇳 Tunisie</option>
              </select>

              <label style={labelStyle}>IBAN (pour les virements)</label>
              <input style={inputStyle} value={form.iban} onChange={e => update('iban', e.target.value)} placeholder="MA64 0000 0000 0000 0000 0000" />

              <label style={labelStyle}>Numéro Orange Money / Wave</label>
              <input style={inputStyle} value={form.mobileMoneyNumber} onChange={e => update('mobileMoneyNumber', e.target.value)} placeholder="+212 6XX XXX XXX" />

              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => setStep(1)}
                  style={{ flex: 1, padding: '10px', background: 'white', color: '#374151', borderRadius: '7px', border: '0.5px solid #e5e7eb', fontSize: '13px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                  ← Retour
                </button>
                <button onClick={handleSubmit} disabled={loading}
                  style={{ flex: 2, padding: '10px', background: loading ? '#9FE1CB' : '#0F6E56', color: '#E1F5EE', borderRadius: '7px', border: 'none', fontSize: '13px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                  {loading ? 'Création...' : 'Créer mon compte'}
                </button>
              </div>
            </>
          )}
        </div>

        <p style={{ textAlign: 'center', fontSize: '12px', color: '#9ca3af', marginTop: '14px' }}>
          Déjà un compte ?{' '}
          <Link href="/login" style={{ color: '#1D9E75', textDecoration: 'none' }}>Se connecter</Link>
        </p>
      </div>
    </div>
  )
}
