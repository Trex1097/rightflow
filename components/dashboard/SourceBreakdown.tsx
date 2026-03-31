'use client'
import { useState } from 'react'
import clsx from 'clsx'

const SOURCES_DA = [
  { name: 'Streaming', sub: 'Spotify · Anghami · YouTube · Boomplay', pct: 65, amount: '11 206 MAD', color: 'var(--rf-green)' },
  { name: 'Radio', sub: 'Hit Radio · Medi1 · 2M · Aswat', pct: 22, amount: '3 793 MAD', color: 'var(--rf-orange)' },
  { name: 'Espaces publics', sub: 'Morocco Mall · Twin Center · Label\'Vie', pct: 8, amount: '1 379 MAD', color: 'var(--rf-amber)' },
  { name: 'Synchronisation', sub: 'Pub · Film · Série', pct: 5, amount: '862 MAD', color: 'var(--rf-purple)' },
]

const SOURCES_DV = [
  { name: 'Streaming (interprète)', sub: 'Spotify · Anghami · YouTube', pct: 58, amount: '8 410 MAD', color: '#7F77DD' },
  { name: 'Radio (interprète)', sub: 'Hit Radio · Medi1 · 2M', pct: 28, amount: '4 060 MAD', color: '#AFA9EC' },
  { name: 'Espaces publics (label)', sub: 'Morocco Mall · Marjane · cafés', pct: 14, amount: '2 030 MAD', color: '#CECBF6' },
]

export default function SourceBreakdown() {
  const [activeTab, setActiveTab] = useState<'da' | 'dv'>('da')
  const sources = activeTab === 'da' ? SOURCES_DA : SOURCES_DV

  return (
    <div className="rf-card">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium">Revenus par source & type de droit</span>
        <span className="badge-green flex items-center gap-1">
          <span className="pulse-dot" /> Live
        </span>
      </div>

      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setActiveTab('da')}
          className={clsx('text-[11px] px-3 py-1 rounded-full border transition-colors', activeTab === 'da' ? 'bg-[var(--rf-green-light)] text-[var(--rf-green-text)] border-[var(--rf-green)]' : 'border-gray-200 text-gray-400')}
          style={{ fontFamily: 'var(--font-dm-mono), monospace' }}
        >
          Droits d'auteur
        </button>
        <button
          onClick={() => setActiveTab('dv')}
          className={clsx('text-[11px] px-3 py-1 rounded-full border transition-colors', activeTab === 'dv' ? 'bg-[var(--rf-purple-light)] text-[var(--rf-purple-text)] border-[var(--rf-purple)]' : 'border-gray-200 text-gray-400')}
          style={{ fontFamily: 'var(--font-dm-mono), monospace' }}
        >
          Droits voisins
        </button>
      </div>

      <div className="text-[9px] uppercase tracking-widest text-gray-400 font-medium pb-1 pt-1 border-t border-gray-100 mb-2">
        Sources — {activeTab === 'da' ? "Droits d'auteur" : 'Droits voisins'}
      </div>

      <div className="space-y-2">
        {sources.map((src) => (
          <div key={src.name} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: src.color }} />
            <div className="flex-1 min-w-0">
              <div className="text-[11px] text-gray-600 truncate">{src.name}</div>
              <div className="text-[9px] text-gray-400 truncate" style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>{src.sub}</div>
            </div>
            <div className="flex-[1.2] h-0.5 bg-gray-100 rounded-full">
              <div className="h-full rounded-full" style={{ width: `${src.pct}%`, background: src.color }} />
            </div>
            <span className="text-[10px] font-medium w-8 text-right" style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>{src.pct}%</span>
            <span className="text-[10px] text-[var(--rf-green)] w-[72px] text-right" style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>+{src.amount}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
