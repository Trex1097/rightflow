'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })
      if (res?.error) {
        toast.error('Email ou mot de passe incorrect')
      } else {
        router.push('/dashboard')
        router.refresh()
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-syne, sans-serif)' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '0 20px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#1D9E75', display: 'inline-block' }} />
            <span style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-0.5px' }}>RightFlow</span>
          </div>
          <p style={{ fontSize: '13px', color: '#6b7280' }}>Droits musicaux · Maghreb & Afrique</p>
        </div>

        {/* Card */}
        <div style={{ background: 'white', borderRadius: '12px', border: '0.5px solid #e5e7eb', padding: '28px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '20px' }}>Se connecter</h2>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '11px', fontWeight: 500, color: '#6b7280', display: 'block', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="artiste@exemple.ma"
                required
                style={{ width: '100%', padding: '9px 12px', fontSize: '13px', border: '0.5px solid #e5e7eb', borderRadius: '7px', outline: 'none', background: '#f9fafb', fontFamily: 'inherit' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '11px', fontWeight: 500, color: '#6b7280', display: 'block', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ width: '100%', padding: '9px 12px', fontSize: '13px', border: '0.5px solid #e5e7eb', borderRadius: '7px', outline: 'none', background: '#f9fafb', fontFamily: 'inherit' }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', padding: '10px', background: loading ? '#9FE1CB' : '#0F6E56', color: '#E1F5EE', borderRadius: '7px', border: 'none', fontSize: '13px', fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', transition: 'background 0.15s' }}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <div style={{ marginTop: '16px', padding: '12px', background: '#f3f4f6', borderRadius: '7px' }}>
            <div style={{ fontSize: '10px', color: '#9ca3af', marginBottom: '6px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Comptes de démonstration</div>
            {[
              { label: 'Artiste', email: 'saad@rightflow.ma' },
              { label: 'Admin BMDA', email: 'admin@bmda.ma' },
              { label: 'RightFlow Admin', email: 'admin@rightflow.ma' },
            ].map(d => (
              <div key={d.email} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                <span style={{ fontSize: '11px', color: '#6b7280' }}>{d.label}</span>
                <button
                  onClick={() => { setEmail(d.email); setPassword('rightflow2025') }}
                  style={{ fontSize: '10px', color: '#1D9E75', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-dm-mono, monospace)' }}
                >
                  {d.email}
                </button>
              </div>
            ))}
            <div style={{ fontSize: '10px', color: '#9ca3af', marginTop: '4px', fontFamily: 'var(--font-dm-mono, monospace)' }}>mot de passe : rightflow2025</div>
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: '11px', color: '#9ca3af', marginTop: '16px' }}>
          RightFlow © 2025 · Casablanca, Maroc
        </p>
      </div>
    </div>
  )
}
