'use client'

// ── RightsQueue ──────────────────────────────────────────────────────────────
export function RightsQueue() {
  const rights = [
    { song: 'Ila Meta', artist: 'Saad Lamjarred', amount: '+1 840 MAD', type: 'stream + radio', da: true, dv: true, dot: 'var(--rf-green)' },
    { song: 'Weld El Ghaba', artist: 'Dj Van', amount: '+3 120 MAD', type: 'streaming', da: false, dv: true, dot: 'var(--rf-purple)' },
    { song: 'Bghit Nebki', artist: 'Douzi', amount: '+2 360 MAD', type: 'radio + synchro', da: true, dv: true, dot: 'var(--rf-green)' },
    { song: 'Ghaltana', artist: 'RedOne ft. Faydee', amount: '+920 MAD', type: 'espace public', da: true, dv: false, dot: 'var(--rf-amber)' },
  ]

  return (
    <div className="rf-card flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-sm font-semibold text-gray-900">Droits calculés</div>
          <div className="text-xs text-gray-400 mt-0.5">En attente de versement</div>
        </div>
        <span className="badge-amber">Q3 2025</span>
      </div>

      <div className="space-y-2">
        {rights.map((r) => (
          <div key={r.song}
            className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all hover:shadow-sm"
            style={{ background: '#F9FAFB', border: '1px solid #EAECEF' }}>
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: r.dot }} />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                {r.song}
                {r.da && <span className="tag-da">DA</span>}
                {r.dv && <span className="tag-dv">DV</span>}
              </div>
              <div className="text-[10px] text-gray-400 mt-0.5">{r.artist} · {r.type}</div>
            </div>
            <div className="text-xs font-bold flex-shrink-0" style={{ color: r.dot, fontFamily: 'var(--font-dm-mono), monospace' }}>
              {r.amount}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 p-3 rounded-xl" style={{ background: 'rgba(29,185,116,0.06)', border: '1px solid rgba(29,185,116,0.12)' }}>
        <div className="text-[10px] text-gray-400 mb-1" style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>
          Prochain versement automatique — 01 oct. 2025
        </div>
        <div className="text-xl font-bold" style={{ color: 'var(--rf-green)', fontFamily: 'var(--font-dm-mono), monospace' }}>
          8 240 MAD
        </div>
      </div>
    </div>
  )
}

// ── ReserveFund ──────────────────────────────────────────────────────────────
export function ReserveFund() {
  const items = [
    { song: 'Lmima', artist: 'Saad Lamjarred · 1 240 passages', amount: '3 720 MAD', status: 'notified' },
    { song: 'Ya Bent Bladi', artist: 'Belkhayat · 890 passages', amount: '2 670 MAD', status: 'waiting' },
    { song: '+ 245 autres', artist: 'Droits en réserve', amount: '35 790 MAD', status: 'waiting' },
  ]

  return (
    <div className="rf-card relative overflow-hidden"
      style={{ border: '1px solid rgba(123,110,246,0.25)' }}>
      {/* Top accent */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--rf-purple), #a78bfa)', borderRadius: '12px 12px 0 0' }} />

      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs"
              style={{ background: 'var(--rf-purple-light)', color: 'var(--rf-purple)' }}>⬛</div>
            <div className="text-sm font-semibold text-gray-900">Fonds de Réserve</div>
          </div>
          <div className="text-xs text-gray-400">Artistes non inscrits · 18 mois de réclamation</div>
        </div>
        <span className="badge-purple">Admin BMDA</span>
      </div>

      <div className="flex items-baseline gap-3 mb-1">
        <div className="text-3xl font-bold" style={{ color: 'var(--rf-purple)', fontFamily: 'var(--font-dm-mono), monospace' }}>
          42 180
        </div>
        <div className="text-sm text-gray-400 font-medium">MAD</div>
      </div>
      <div className="text-xs text-gray-400 mb-3" style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>
        247 oeuvres · redistribution le 01/04/2026
      </div>

      {/* Progress */}
      <div className="flex justify-between text-[10px] text-gray-400 mb-1.5" style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>
        <span>Période de réclamation</span><span>8 / 18 mois</span>
      </div>
      <div className="h-2 rounded-full mb-4" style={{ background: '#F0F1F3' }}>
        <div className="h-full rounded-full" style={{ width: '44%', background: 'linear-gradient(90deg, var(--rf-purple), #a78bfa)' }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
        {items.map((item) => (
          <div key={item.song} className="p-2.5 rounded-xl" style={{ background: '#F9FAFB', border: '1px solid #EAECEF' }}>
            <div className="text-xs font-semibold text-gray-900 truncate">{item.song}</div>
            <div className="text-[9px] text-gray-400 truncate mt-0.5">{item.artist}</div>
            <div className="flex items-center justify-between mt-2">
              <div className="text-xs font-bold" style={{ color: 'var(--rf-purple)', fontFamily: 'var(--font-dm-mono), monospace' }}>{item.amount}</div>
              <span className={item.status === 'notified' ? 'badge-blue' : 'badge-amber'} style={{ fontSize: '9px' }}>
                {item.status === 'notified' ? 'Notifié' : 'En attente'}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button className="rf-btn-purple flex-1 text-xs py-2">Voir tous les artistes</button>
        <button className="rf-btn-outline flex-1 text-xs py-2">Envoyer notifications</button>
      </div>
    </div>
  )
}

// ── NextCycleBanner ───────────────────────────────────────────────────────────
export function NextCycleBanner() {
  return (
    <div className="rf-card relative overflow-hidden" style={{ border: '1px solid rgba(29,185,116,0.2)' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--rf-green)', borderRadius: '12px 12px 0 0' }} />
      {/* Glow bg */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 80, background: 'radial-gradient(circle, rgba(29,185,116,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-gray-400 mb-1">
            Cycle trimestriel — Q3 2025
          </div>
          <div className="text-2xl font-bold" style={{ color: 'var(--rf-green)', fontFamily: 'var(--font-dm-mono), monospace' }}>
            31 740 MAD
          </div>
          <div className="text-xs text-gray-400 mt-1" style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>
            01 juil. → 30 sept. · Versement auto. 01 oct. 2025
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-[10px] text-gray-400 mb-1">Avancement</div>
          <div className="text-3xl font-bold" style={{ color: 'var(--rf-green)', fontFamily: 'var(--font-dm-mono), monospace' }}>78%</div>
          <div className="w-28 h-2 rounded-full mt-1.5 ml-auto" style={{ background: '#F0F1F3' }}>
            <div className="h-full rounded-full" style={{ width: '78%', background: 'var(--rf-green)' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightsQueue
