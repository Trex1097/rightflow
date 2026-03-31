'use client'
import AppShell from '@/components/layout/AppShell'
import MetricCard from '@/components/ui/MetricCard'

const RESERVE_ITEMS = [
  { song: 'Lmima', artist: 'Saad Lamjarred', passages: '1 240 passages radio · DA + DV', amount: '3 720', status: 'notified' },
  { song: 'Ya Bent Bladi', artist: 'Belkhayat', passages: '890 passages · DA uniquement', amount: '2 670', status: 'waiting' },
  { song: 'Nari Nari', artist: 'Najat Aatabou', passages: '640 streams · DV uniquement', amount: '1 920', status: 'waiting' },
  { song: '+ 244 autres oeuvres', artist: 'En réserve', passages: '', amount: '33 870', status: 'waiting' },
]

export default function AdminPage() {
  return (
    <AppShell activePage="admin">
      <div className="p-4 md:p-5 space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-bold">Admin BMDA</h1>
          <span className="badge-purple">Vue institutionnelle</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <MetricCard label="Total collecté" value="1 240 000" suffix=" MAD" valueColor="purple" delta="2025 YTD" deltaColor="muted" admin />
          <MetricCard label="Artistes inscrits" value="1 847" delta="+312 ce mois" deltaColor="purple" admin />
          <MetricCard label="Fonds de réserve" value="42 180" suffix=" MAD" valueColor="purple" delta="247 oeuvres" deltaColor="muted" admin />
          <MetricCard label="Taux couverture" value="94.2" suffix="%" delta="oeuvres trackées" deltaColor="purple" admin />
        </div>

        {/* Reserve fund detail */}
        <div className="relative bg-white border border-[var(--rf-purple)] rounded-xl p-4 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--rf-purple)] via-[#7F77DD] to-[var(--rf-purple)]" />

          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-md bg-[var(--rf-purple-light)] flex items-center justify-center text-sm">⬛</div>
            <div>
              <div className="text-xs font-medium">Fonds de Réserve — Détail complet</div>
              <div className="text-[10px] text-gray-400">Redistribution automatique au prorata le 01/04/2026</div>
            </div>
          </div>

          <div className="text-2xl font-bold text-[var(--rf-purple)] mb-1" style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>42 180 MAD</div>
          <div className="flex justify-between text-[9px] text-gray-400 mb-1 mt-3" style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>
            <span>Période de réclamation</span><span>8 / 18 mois</span>
          </div>
          <div className="h-1 bg-gray-100 rounded-full mb-4">
            <div className="h-full rounded-full bg-[var(--rf-purple)]" style={{ width: '44%' }} />
          </div>

          <div className="space-y-2 mb-3">
            {RESERVE_ITEMS.map(item => (
              <div key={item.song} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-medium">{item.song}</div>
                  <div className="text-[9px] text-gray-400">{item.artist}{item.passages ? ` · ${item.passages}` : ''}</div>
                </div>
                <div className="text-[11px] font-medium text-[var(--rf-purple)] mr-2" style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>{item.amount} MAD</div>
                <span className={item.status === 'notified' ? 'badge-blue' : 'badge-amber'} style={{ fontSize: '9px' }}>
                  {item.status === 'notified' ? 'Notifié' : 'En attente'}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button className="rf-btn-purple flex-1 text-xs">Exporter rapport</button>
            <button className="rf-btn-outline flex-1 text-xs">Notifier artistes</button>
          </div>
        </div>

        {/* Stats by source type */}
        <div className="rf-card">
          <div className="text-xs font-medium mb-3">Collecte par type de source — 2025 YTD</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Streaming', amount: '742 000', pct: 60, color: 'var(--rf-green)' },
              { label: 'Radio', amount: '248 000', pct: 20, color: 'var(--rf-orange)' },
              { label: 'Espaces publics', amount: '149 000', pct: 12, color: 'var(--rf-amber)' },
              { label: 'Synchronisation', amount: '101 000', pct: 8, color: 'var(--rf-purple)' },
            ].map(s => (
              <div key={s.label} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  <span className="text-[10px] text-gray-500">{s.label}</span>
                </div>
                <div className="text-sm font-bold" style={{ fontFamily: 'var(--font-dm-mono), monospace', color: s.color }}>{s.amount} MAD</div>
                <div className="mt-1.5 h-1 bg-gray-200 rounded-full">
                  <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.color }} />
                </div>
                <div className="text-[9px] text-gray-400 mt-1" style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>{s.pct}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
