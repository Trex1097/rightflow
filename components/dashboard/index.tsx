'use client'

// ── RightsQueue ──────────────────────────────────────────────────────────────
export function RightsQueue() {
  const rights = [
    { song: 'Ila Meta', artist: 'Saad Lamjarred', amount: '+1 840 MAD', type: 'stream + radio', da: true, dv: true, color: 'var(--rf-green)' },
    { song: 'Weld El Ghaba', artist: 'Dj Van', amount: '+3 120 MAD', type: 'streaming', da: false, dv: true, color: 'var(--rf-purple)' },
    { song: 'Bghit Nebki', artist: 'Douzi', amount: '+2 360 MAD', type: 'radio + synchro', da: true, dv: true, color: 'var(--rf-green)' },
    { song: 'Ghaltana', artist: 'RedOne ft. Faydee', amount: '+920 MAD', type: 'espace public', da: true, dv: false, color: 'var(--rf-green)' },
  ]

  return (
    <div className="rf-card">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium">Derniers droits calculés</span>
        <span className="badge-amber">En attente</span>
      </div>
      <div className="space-y-1.5">
        {rights.map((r) => (
          <div key={r.song} className="flex items-center justify-between p-2 rounded-lg border border-gray-100 bg-gray-50 cursor-pointer hover:border-gray-200 transition-colors">
            <div>
              <div className="text-[11px] font-medium flex items-center gap-1">
                {r.song}
                {r.da && <span className="tag-da">DA</span>}
                {r.dv && <span className="tag-dv">DV</span>}
              </div>
              <div className="text-[10px] text-gray-400 mt-0.5">{r.artist}</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-medium" style={{ fontFamily: 'var(--font-dm-mono), monospace', color: r.color }}>{r.amount}</div>
              <div className="text-[9px] text-gray-400" style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>{r.type}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 p-2.5 bg-gray-50 rounded-lg text-center border border-gray-100">
        <div className="text-[10px] text-gray-400 mb-1">Prochain cycle trimestriel</div>
        <div className="text-base font-bold text-[var(--rf-green)]" style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>8 240 MAD</div>
        <div className="text-[9px] text-gray-400 mt-0.5" style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>Versement automatique le 1er oct. 2025</div>
      </div>
    </div>
  )
}

// ── ReserveFund ──────────────────────────────────────────────────────────────
export function ReserveFund() {
  const items = [
    { song: 'Lmima', artist: 'Saad Lamjarred · 1 240 passages', amount: '3 720 MAD', status: 'notified' },
    { song: 'Ya Bent Bladi', artist: 'Belkhayat · 890 passages', amount: '2 670 MAD', status: 'waiting' },
    { song: '+ 245 autres oeuvres', artist: 'Droits en réserve', amount: '35 790 MAD', status: 'waiting' },
  ]

  return (
    <div className="relative bg-white border border-[var(--rf-purple)] rounded-xl p-4 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--rf-purple)] via-[#7F77DD] to-[var(--rf-purple)]" />

      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-md bg-[var(--rf-purple-light)] flex items-center justify-center text-sm">⬛</div>
        <div>
          <div className="text-xs font-medium">Fonds de Réserve — Artistes non inscrits</div>
          <div className="text-[10px] text-gray-400">Droits collectés · En attente de réclamation · 18 mois</div>
        </div>
        <span className="badge-purple ml-auto">Visible Admin BMDA</span>
      </div>

      <div className="text-2xl font-bold text-[var(--rf-purple)] mb-1" style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>42 180 MAD</div>
      <div className="text-[10px] text-gray-400 mb-3" style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>247 oeuvres · 8 mois écoulés sur 18 · redistribution le 01/04/2026</div>

      <div className="flex justify-between text-[9px] text-gray-400 mb-1" style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>
        <span>Période de réclamation</span>
        <span>8 / 18 mois</span>
      </div>
      <div className="h-1 bg-gray-100 rounded-full mb-4">
        <div className="h-full rounded-full bg-[var(--rf-purple)]" style={{ width: '44%' }} />
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        {items.map((item) => (
          <div key={item.song} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-medium truncate">{item.song}</div>
              <div className="text-[9px] text-gray-400 truncate">{item.artist}</div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-[11px] font-medium text-[var(--rf-purple)]" style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>{item.amount}</div>
              <span className={item.status === 'notified' ? 'badge-blue' : 'badge-amber'} style={{ fontSize: '9px' }}>
                {item.status === 'notified' ? 'Notifié' : 'En attente'}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button className="rf-btn-purple flex-1 text-xs">Voir tous les artistes</button>
        <button className="rf-btn-outline flex-1 text-xs">Envoyer notifications</button>
      </div>
    </div>
  )
}

// ── NextCycleBanner ───────────────────────────────────────────────────────────
export function NextCycleBanner() {
  return (
    <div className="bg-white border border-[var(--rf-green)] rounded-xl p-3 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[var(--rf-green)]" />
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Cycle trimestriel en cours — Q3 2025</div>
          <div className="text-xl font-bold text-[var(--rf-green)]" style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>31 740 MAD</div>
          <div className="text-[10px] text-gray-400 mt-1" style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>01 juil. → 30 sept. 2025 · Versement automatique le 01 oct. 2025</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-gray-400 mb-1" style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>Avancement</div>
          <div className="text-2xl font-bold" style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>78%</div>
          <div className="w-24 h-1 bg-gray-100 rounded-full mt-1 ml-auto">
            <div className="h-full rounded-full bg-[var(--rf-green)]" style={{ width: '78%' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightsQueue
