'use client'
import { useState, useEffect } from 'react'
import AppShell from '@/components/layout/AppShell'
import MetricCard from '@/components/ui/MetricCard'
import clsx from 'clsx'

const FEED_ITEMS = [
  { type: 'stream', title: 'Ila Meta — Saad Lamjarred', meta: 'Spotify MENA · 12 400 streams', amount: '+124 MAD', time: '1 min', da: true, dv: true },
  { type: 'radio', title: 'Weld El Ghaba — Dj Van', meta: 'Hit Radio · Casablanca · 3min42', amount: '+18 MAD', time: '4 min', da: false, dv: true },
  { type: 'public', title: 'Ghaltana — RedOne', meta: 'Morocco Mall · food court', amount: '+9 MAD', time: '7 min', da: true, dv: false },
  { type: 'stream', title: 'Bghit Nebki — Douzi', meta: 'Anghami · 4 820 streams', amount: '+48 MAD', time: '9 min', da: true, dv: true },
  { type: 'radio', title: 'Zina — Maher Zain', meta: 'Medi1 Radio · 4min10', amount: '+18 MAD', time: '12 min', da: true, dv: false },
  { type: 'public', title: 'Ila Meta — Saad Lamjarred', meta: 'Twin Center · hall principal', amount: '+9 MAD', time: '15 min', da: true, dv: true },
  { type: 'stream', title: 'Weld El Ghaba — Dj Van', meta: 'YouTube Music MENA · 8 100 vues', amount: '+61 MAD', time: '18 min', da: false, dv: true },
]

const SOURCES = [
  { name: 'Hit Radio', type: 'radio', online: true, count: '47 passages', amount: '+846 MAD' },
  { name: 'Medi1 Radio', type: 'radio', online: true, count: '31 passages', amount: '+558 MAD' },
  { name: 'Morocco Mall', type: 'public', online: true, count: '89 détections', amount: '+267 MAD' },
  { name: 'Radio Aswat', type: 'radio', online: false, count: 'Hors ligne', amount: 'Vérifier boitier' },
  { name: 'Spotify MENA', type: 'stream', online: true, count: '12 400 streams', amount: '+124 MAD' },
  { name: 'Twin Center', type: 'public', online: true, count: '12 détections', amount: '+36 MAD' },
]

const typeColor: Record<string, string> = {
  stream: 'var(--rf-green)',
  radio: 'var(--rf-orange)',
  public: 'var(--rf-amber)',
}

const TABS = ['Aujourd\'hui', '7 jours', 'Ce mois']
const tabMetrics: Record<string, { det: string; droits: string }> = {
  "Aujourd'hui": { det: '1 247', droits: '3 840' },
  '7 jours': { det: '8 930', droits: '24 120' },
  'Ce mois': { det: '34 200', droits: '98 400' },
}

export default function TrackingPage() {
  const [activeTab, setActiveTab] = useState("Aujourd'hui")
  const [filter, setFilter] = useState('all')
  const [droits, setDroits] = useState(3840)

  useEffect(() => {
    const interval = setInterval(() => {
      setDroits(d => d + Math.floor(Math.random() * 10 + 2))
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const filtered = filter === 'all' ? FEED_ITEMS : FEED_ITEMS.filter(i => i.type === filter)

  return (
    <AppShell activePage="tracking">
      <div className="p-4 md:p-5 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <h1 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>Tracking</h1>
          <span className="badge-green flex items-center gap-1"><span className="pulse-dot" /> Live — 30s</span>
          <div className="flex gap-1 ml-auto">
            {TABS.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="text-[11px] px-2 md:px-3 py-1 rounded-full border transition-colors"
                style={{
                  fontFamily: 'var(--font-dm-mono), monospace',
                  background: activeTab === tab ? 'rgba(29,185,116,0.1)' : 'transparent',
                  color: activeTab === tab ? 'var(--rf-green)' : 'var(--text-muted)',
                  borderColor: activeTab === tab ? 'var(--rf-green)' : 'var(--card-border)',
                }}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <MetricCard label="Détections" value={tabMetrics[activeTab].det} delta="+18% vs hier" deltaColor="green" />
          <MetricCard label="Sources actives" value="23" delta="radio+stream+public" deltaColor="muted" />
          <MetricCard label="Droits générés" value={droits.toLocaleString('fr-FR')} suffix=" MAD" valueColor="green" delta="en cours de calcul" deltaColor="muted" />
          <MetricCard label="Oeuvres détectées" value="31" delta="sur 47 au catalogue" deltaColor="muted" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-3">
          {/* Feed */}
          <div className="rf-card">
            <div className="flex items-center justify-between mb-3">
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>Flux de détections</span>
              <div className="flex gap-1">
                {['all', 'radio', 'stream', 'public'].map(f => (
                  <button key={f} onClick={() => setFilter(f)}
                    className="text-[10px] px-2 py-0.5 rounded-full border transition-colors"
                    style={{
                      fontFamily: 'var(--font-dm-mono), monospace',
                      background: filter === f ? 'rgba(29,185,116,0.1)' : 'transparent',
                      color: filter === f ? 'var(--rf-green)' : 'var(--text-muted)',
                      borderColor: filter === f ? 'var(--rf-green)' : 'var(--card-border)',
                    }}>
                    {f === 'all' ? 'Tout' : f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-0" style={{ borderTop: '1px solid var(--card-border)' }}>
              {filtered.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 py-2.5 animate-feed" style={{ borderBottom: '1px solid var(--card-border)' }}>
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: typeColor[item.type] }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-medium truncate flex items-center gap-1" style={{ color: 'var(--text-primary)' }}>
                      {item.title}
                      {item.da && <span className="tag-da">DA</span>}
                      {item.dv && <span className="tag-dv">DV</span>}
                    </div>
                    <div className="text-[9px] mt-0.5" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-dm-mono), monospace' }}>{item.meta}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-[11px] font-medium" style={{ color: 'var(--rf-green)', fontFamily: 'var(--font-dm-mono), monospace' }}>{item.amount}</div>
                    <div className="text-[9px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-dm-mono), monospace' }}>il y a {item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sources */}
          <div className="rf-card">
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>Sources connectées</div>
            <div className="space-y-2">
              {SOURCES.map(src => (
                <div key={src.name} className="flex items-center gap-2.5 p-2 rounded-lg"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--card-border)' }}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: src.online ? 'var(--rf-green)' : '#4b5563' }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-medium" style={{ color: 'var(--text-primary)' }}>{src.name}</div>
                    <div className="text-[9px] mt-0.5" style={{ color: src.online ? 'var(--text-muted)' : 'var(--rf-orange)', fontFamily: 'var(--font-dm-mono), monospace' }}>
                      {src.count} · {src.amount}
                    </div>
                  </div>
                  <span className="text-[9px] flex items-center gap-1" style={{ color: src.online ? 'var(--rf-green)' : 'var(--text-muted)', fontFamily: 'var(--font-dm-mono), monospace' }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: src.online ? 'var(--rf-green)' : '#4b5563' }} />
                    {src.online ? 'En ligne' : 'Offline'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
