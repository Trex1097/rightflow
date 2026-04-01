'use client'

export function RightsQueue() {
  const rights = [
    { song: 'Ila Meta', artist: 'Saad Lamjarred', amount: '+1 840 MAD', type: 'stream + radio', da: true, dv: true, dot: 'var(--rf-green)' },
    { song: 'Weld El Ghaba', artist: 'Dj Van', amount: '+3 120 MAD', type: 'streaming', da: false, dv: true, dot: 'var(--rf-purple)' },
    { song: 'Bghit Nebki', artist: 'Douzi', amount: '+2 360 MAD', type: 'radio + synchro', da: true, dv: true, dot: 'var(--rf-green)' },
    { song: 'Ghaltana', artist: 'RedOne ft. Faydee', amount: '+920 MAD', type: 'espace public', da: true, dv: false, dot: 'var(--rf-amber)' },
  ]
  return (
    <div className="rf-card" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Droits calculés</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>En attente de versement</div>
        </div>
        <span className="badge-amber">Q3 2025</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {rights.map((r) => (
          <div key={r.song} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, background: 'var(--input-bg)', border: '1px solid var(--card-border)', cursor: 'pointer', transition: 'border-color 0.15s' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: r.dot, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 5 }}>
                {r.song}
                {r.da && <span className="tag-da">DA</span>}
                {r.dv && <span className="tag-dv">DV</span>}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{r.artist} · {r.type}</div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: r.dot, fontFamily: 'var(--font-dm-mono), monospace', flexShrink: 0 }}>{r.amount}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, padding: '12px', borderRadius: 10, background: 'rgba(29,185,116,0.06)', border: '1px solid rgba(29,185,116,0.12)' }}>
        <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 4, fontFamily: 'var(--font-dm-mono), monospace' }}>Prochain versement · 01 oct. 2025</div>
        <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--rf-green)', fontFamily: 'var(--font-dm-mono), monospace' }}>8 240 MAD</div>
      </div>
    </div>
  )
}

export function ReserveFund() {
  const items = [
    { song: 'Lmima', artist: 'Saad Lamjarred · 1 240 passages', amount: '3 720 MAD', status: 'notified' },
    { song: 'Ya Bent Bladi', artist: 'Belkhayat · 890 passages', amount: '2 670 MAD', status: 'waiting' },
    { song: '+ 245 autres', artist: 'Droits en réserve', amount: '35 790 MAD', status: 'waiting' },
  ]
  return (
    <div className="rf-card" style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(123,110,246,0.2)' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--rf-purple), #a78bfa)', borderRadius: '16px 16px 0 0' }} />
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <div style={{ width: 24, height: 24, borderRadius: 8, background: 'rgba(123,110,246,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'var(--rf-purple-text)' }}>⬛</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Fonds de Réserve</div>
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Artistes non inscrits · 18 mois de réclamation</div>
        </div>
        <span className="badge-purple">Admin BMDA</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
        <span style={{ fontSize: '1.9rem', fontWeight: 700, color: 'var(--rf-purple)', fontFamily: 'var(--font-dm-mono), monospace' }}>42 180</span>
        <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>MAD</span>
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 16, fontFamily: 'var(--font-dm-mono), monospace' }}>247 oeuvres · redistribution le 01/04/2026</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-muted)', marginBottom: 6, fontFamily: 'var(--font-dm-mono), monospace' }}>
        <span>Période de réclamation</span><span>8 / 18 mois</span>
      </div>
      <div style={{ height: 6, borderRadius: 99, background: 'var(--bar-bg)', marginBottom: 16 }}>
        <div style={{ height: '100%', borderRadius: 99, width: '44%', background: 'linear-gradient(90deg, var(--rf-purple), #a78bfa)' }} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
        {items.map((item) => (
          <div key={item.song} style={{ padding: '10px 12px', borderRadius: 10, background: 'var(--input-bg)', border: '1px solid var(--card-border)' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.song}</div>
            <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.artist}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--rf-purple-text)', fontFamily: 'var(--font-dm-mono), monospace' }}>{item.amount}</span>
              <span className={item.status === 'notified' ? 'badge-blue' : 'badge-amber'} style={{ fontSize: 9 }}>{item.status === 'notified' ? 'Notifié' : 'En attente'}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="rf-btn-purple" style={{ flex: 1, fontSize: 12, padding: '8px' }}>Voir tous les artistes</button>
        <button className="rf-btn-outline" style={{ flex: 1, fontSize: 12, padding: '8px' }}>Envoyer notifications</button>
      </div>
    </div>
  )
}

export function NextCycleBanner() {
  return (
    <div className="rf-card" style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(29,185,116,0.18)' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--rf-green)', borderRadius: '16px 16px 0 0' }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: 140, height: 100, background: 'radial-gradient(circle, rgba(29,185,116,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)', marginBottom: 6 }}>Cycle trimestriel — Q3 2025</div>
          <div style={{ fontSize: '1.7rem', fontWeight: 700, color: 'var(--rf-green)', fontFamily: 'var(--font-dm-mono), monospace' }}>31 740 MAD</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4, fontFamily: 'var(--font-dm-mono), monospace' }}>01 juil. → 30 sept. · Versement auto. 01 oct. 2025</div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 4 }}>Avancement</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--rf-green)', fontFamily: 'var(--font-dm-mono), monospace' }}>78%</div>
          <div style={{ width: 100, height: 5, borderRadius: 99, background: 'var(--bar-bg)', marginTop: 6, marginLeft: 'auto' }}>
            <div style={{ height: '100%', borderRadius: 99, width: '78%', background: 'var(--rf-green)' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightsQueue
