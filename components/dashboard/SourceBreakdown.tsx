'use client'
import { useState } from 'react'
import clsx from 'clsx'

const SOURCES_DA = [
  { name: 'Streaming', sub: 'Spotify · Anghami · YouTube', pct: 65, amount: '11 206 MAD', color: 'var(--rf-green)' },
  { name: 'Radio', sub: 'Hit Radio · Medi1 · 2M · Aswat', pct: 22, amount: '3 793 MAD', color: 'var(--rf-orange)' },
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

  return (
    <div className="rf-card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-sm font-semibold text-gray-900">Revenus par source</div>
          <div className="text-xs text-gray-400 mt-0.5">Q3 2025 — en cours</div>
        </div>
        <span className="badge-green flex items-center gap-1.5">
          <span className="pulse-dot" /> Live
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 mb-4 p-1 rounded-xl" style={{ background: '#F5F6F8' }}>
        <button onClick={() => setActiveTab('da')}
          className="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all"
          style={{
            background: activeTab === 'da' ? 'white' : 'transparent',
            color: activeTab === 'da' ? 'var(--rf-green)' : '#9CA3AF',
            boxShadow: activeTab === 'da' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
            fontFamily: 'var(--font-syne), sans-serif',
          }}>
          Droits d'auteur
        </button>
        <button onClick={() => setActiveTab('dv')}
          className="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all"
          style={{
            background: activeTab === 'dv' ? 'white' : 'transparent',
            color: activeTab === 'dv' ? 'var(--rf-purple)' : '#9CA3AF',
            boxShadow: activeTab === 'dv' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
            fontFamily: 'var(--font-syne), sans-serif',
          }}>
          Droits voisins
        </button>
      </div>

      {/* Total */}
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-2xl font-bold" style={{
          fontFamily: 'var(--font-dm-mono), monospace',
          color: activeTab === 'da' ? 'var(--rf-green)' : 'var(--rf-purple)',
        }}>{total}</span>
        <span className="text-xs text-gray-400">ce trimestre</span>
      </div>

      {/* Sources */}
      <div className="space-y-3">
        {sources.map((src) => (
          <div key={src.name}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: src.color }} />
                <div>
                  <div className="text-xs font-medium text-gray-700">{src.name}</div>
                  <div className="text-[9px] text-gray-400" style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>{src.sub}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-semibold" style={{ color: src.color, fontFamily: 'var(--font-dm-mono), monospace' }}>+{src.amount}</div>
                <div className="text-[9px] text-gray-400">{src.pct}%</div>
              </div>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: '#F0F1F3' }}>
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${src.pct}%`, background: src.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
