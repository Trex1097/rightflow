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
          <h1 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>Admin BMDA</h1>
          <span className="badge-purple">Vue institutionnelle</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <MetricCard label="Total collecté" value="1 240 000" suffix=" MAD" valueColor="purple" delta="2025 YTD" deltaColor="muted" admin />
          <MetricCard label="Artistes inscrits" value="1 847" delta="+312 ce mois" deltaColor="purple" admin />
          <MetricCard label="Fonds de réserve" value="42 180" suffix=" MAD" valueColor="purple" delta="247 oeuvres" deltaColor="muted" admin />
          <MetricCard label="Taux couverture" value="94.2" suffix="%" delta="oeuvres trackées" deltaColor="purple" admin />
        </div>

        {/* Reserve fund detail */}
        <div className="rf-card relative overflow-hidden" style={{ border: '1px solid rgba(123,110,246,0.25)' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--rf-purple), #a78bfa)', borderRadius: '16px 16px 0 0' }} />

          <div className="flex items-center gap-2 mb-3">
            <div style={{ width: 24, height: 24, borderRadius: 8, background: 'rgba(123,110,246,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>⬛</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>Fonds de Réserve — Détail complet</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Redistribution automatique au prorata le 01/04/2026</div>
            </div>
          </div>

          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--rf-purple)', fontFamily: 'var(--font-dm-mono), monospace', marginBottom: 4 }}>42 180 MAD</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: 'var(--text-muted)', marginBottom: 4, marginTop: 12, fontFamily: 'var(--font-dm-mono), monospace' }}>
            <span>Période de réclamation</span><span>8 / 18 mois</span>
          </div>
          <div style={{ height: 4, borderRadius: 99, background: 'var(--bar-bg)', marginBottom: 16 }}>
            <div style={{ height: '100%', borderRadius: 99, width: '44%', background: 'linear-gradient(90deg, var(--rf-purple), #a78bfa)' }} />
          </div>

          <div className="space-y-2 mb-3">
            {RESERVE_ITEMS.map(item => (
              <div key={item.song} className="flex items-center gap-2 p-2 rounded-lg"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--card-border)' }}>
                <div className="flex-1 min-w-0">
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-primary)' }}>{item.song}</div>
                  <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>{item.artist}{item.passages ? ` · ${item.passages}` : ''}</div>
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--rf-purple-text)', marginRight: 8, fontFamily: 'var(--font-dm-mono), monospace' }}>{item.amount} MAD</div>
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
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>Collecte par type de source — 2025 YTD</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Streaming', amount: '742 000', pct: 60, color: 'var(--rf-green)' },
              { label: 'Radio', amount: '248 000', pct: 20, color: 'var(--rf-orange)' },
              { label: 'Espaces publics', amount: '149 000', pct: 12, color: 'var(--rf-amber)' },
              { label: 'Synchronisation', amount: '101 000', pct: 8, color: 'var(--rf-purple)' },
            ].map(s => (
              <div key={s.label} className="rounded-lg p-3"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--card-border)' }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{s.label}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-dm-mono), monospace', color: s.color }}>{s.amount} MAD</div>
                <div style={{ marginTop: 6, height: 4, borderRadius: 99, background: 'var(--bar-bg)' }}>
                  <div style={{ height: '100%', borderRadius: 99, width: `${s.pct}%`, background: s.color }} />
                </div>
                <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 4, fontFamily: 'var(--font-dm-mono), monospace' }}>{s.pct}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
