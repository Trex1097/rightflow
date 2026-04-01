'use client'
import { useState } from 'react'

const SOURCES_DA = [
  { name: 'Streaming', sub: 'Spotify · Anghami · YouTube', pct: 65, amount: '11 206 MAD', color: 'var(--rf-green)' },
  { name: 'Radio', sub: 'Hit Radio · Medi1 · 2M', pct: 22, amount: '3 793 MAD', color: 'var(--rf-orange)' },
  { name: 'Espaces publics', sub: 'Morocco Mall · Twin Center', pct: 8, amount: '1 379 MAD', color: 'var(--rf-amber)' },
  { name: 'Synchronisation', sub: 'Pub · Film · Série', pct: 5, amount: '862 MAD', color: 'var(--rf-purple)' },
]
const SOURCES_DV = [
  { name: 'Streaming (interprète)', sub: 'Spotify · Anghami · YouTube', pct: 58, amount: '8 410 MAD', color: 'var(--rf-purple)' },
  { name: 'Radio (interprète)', sub: 'Hit Radio · Medi1 · 2M', pct: 28, amount: '4 060 MAD', color: '#9b8df8' },
  { name: 'Espaces publics (label)', sub: 'Morocco Mall · Marjane', pct: 14, amount: '2 030 MAD', color: '#c5bdfb' },
]

export default function SourceBreakdown() {
  const [activeTab, setActiveTab] = useState<'da' | 'dv'>('da')
  const sources = activeTab === 'da' ? SOURCES_DA : SOURCES_DV
  const total = activeTab === 'da' ? '17 240 MAD' : '14 500 MAD'
  const accent = activeTab === 'da' ? 'var(--rf-green)' : 'var(--rf-purple)'

  return (
    <div className="rf-card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Revenus par source</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Q3 2025 — en cours</div>
        </div>
        <span className="badge-green" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span className="pulse-dot" /> Live
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 p-1 rounded-xl" style={{ background: 'var(--nav-border)' }}>
        {(['da', 'dv'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={{
              background: activeTab === tab ? 'var(--card-bg)' : 'transparent',
              color: activeTab === tab ? accent : 'var(--text-muted)',
              fontFamily: 'var(--font-syne), sans-serif',
              border: 'none', cursor: 'pointer',
            }}>
            {tab === 'da' ? "Droits d'auteur" : 'Droits voisins'}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 20 }}>
        <span style={{ fontSize: '1.6rem', fontWeight: 700, fontFamily: 'var(--font-dm-mono), monospace', color: accent }}>{total}</span>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>ce trimestre</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {sources.map((src) => (
          <div key={src.name}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: src.color, flexShrink: 0, display: 'inline-block' }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)' }}>{src.name}</div>
                  <div style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-dm-mono), monospace' }}>{src.sub}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: src.color, fontFamily: 'var(--font-dm-mono), monospace' }}>+{src.amount}</div>
                <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>{src.pct}%</div>
              </div>
            </div>
            <div style={{ height: 4, borderRadius: 99, background: 'var(--bar-bg)' }}>
              <div style={{ height: '100%', borderRadius: 99, width: `${src.pct}%`, background: src.color, transition: 'width 0.7s ease' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
