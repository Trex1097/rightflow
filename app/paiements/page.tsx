'use client'
import AppShell from '@/components/layout/AppShell'
import MetricCard from '@/components/ui/MetricCard'

const CYCLES = [
  { label: 'Cycle en cours — Q3 2025', amount: '31 740', dates: '01 juil. → 30 sept. 2025', payDate: 'Versement auto. 01 oct. 2025', progress: 78, status: 'active' },
  { label: 'Cycle précédent — Q2 2025', amount: '24 820', dates: '01 avr. → 30 juin 2025', payDate: 'Versé le 01/07/2025', progress: 100, status: 'done' },
  { label: 'Prochain cycle — Q4 2025', amount: '—', dates: '01 oct. → 31 déc. 2025', payDate: 'Versement auto. 01 jan. 2026', progress: 0, status: 'upcoming' },
]

const PAYMENTS = [
  { initials: 'SL', name: 'Saad Lamjarred', da: '5 200', dv: '3 100', works: 4, total: '8 300', status: 'scheduled' },
  { initials: 'DZ', name: 'Douzi', da: '2 800', dv: '1 900', works: 2, total: '4 700', status: 'scheduled' },
  { initials: 'MZ', name: 'Maher Zain', da: '4 100', dv: '2 200', works: 3, total: '6 300', status: 'scheduled' },
  { initials: 'RO', name: 'RedOne', da: '1 800', dv: '980', works: 1, total: '2 780', status: 'scheduled' },
  { initials: 'HA', name: 'Hatim Ammor', da: '1 200', dv: '640', works: 2, total: '1 840', status: 'scheduled' },
]

const avatarBg: Record<string, string> = {
  SL: 'rgba(29,185,116,0.15)',
  DZ: 'rgba(123,110,246,0.15)',
  MZ: 'rgba(245,158,11,0.15)',
  RO: 'rgba(59,130,246,0.15)',
  HA: 'rgba(249,115,22,0.15)',
}
const avatarColor: Record<string, string> = {
  SL: 'var(--rf-green)',
  DZ: 'var(--rf-purple-text)',
  MZ: 'var(--rf-amber)',
  RO: '#60a5fa',
  HA: 'var(--rf-orange)',
}

export default function PaiementsPage() {
  return (
    <AppShell activePage="paiements">
      <div className="p-4 md:p-5 space-y-4">
        <div className="flex items-center gap-3">
          <h1 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>Paiements</h1>
          <span className="badge-blue">Cycles trimestriels</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <MetricCard label="Total Q3 2025" value="31 740" suffix=" MAD" valueColor="green" />
          <MetricCard label="Artistes à payer" value="47" delta="ce cycle" deltaColor="muted" />
          <MetricCard label="DA versés" value="17 240" suffix=" MAD" valueColor="green" />
          <MetricCard label="DV versés" value="14 500" suffix=" MAD" valueColor="purple" />
        </div>

        {/* Cycles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {CYCLES.map(cycle => (
            <div key={cycle.label} className="rf-card relative overflow-hidden"
              style={{ border: cycle.status === 'active' ? '1px solid rgba(29,185,116,0.3)' : undefined }}>
              {cycle.status === 'active' && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--rf-green)', borderRadius: '16px 16px 0 0' }} />}
              <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 4 }}>{cycle.label}</div>
              <div style={{ fontSize: 18, fontWeight: 700, fontFamily: 'var(--font-dm-mono), monospace', color: cycle.status === 'active' ? 'var(--rf-green)' : cycle.status === 'done' ? 'var(--text-secondary)' : 'var(--text-muted)' }}>
                {cycle.amount}{cycle.amount !== '—' && ' MAD'}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2, marginBottom: 8, fontFamily: 'var(--font-dm-mono), monospace' }}>{cycle.dates}</div>
              {cycle.status !== 'upcoming' && (
                <div style={{ height: 4, borderRadius: 99, background: 'var(--bar-bg)', marginBottom: 4 }}>
                  <div style={{ height: '100%', borderRadius: 99, width: `${cycle.progress}%`, background: cycle.status === 'done' ? 'var(--text-muted)' : 'var(--rf-green)' }} />
                </div>
              )}
              <div style={{ fontSize: 9, marginTop: 4, color: cycle.status === 'done' ? 'var(--rf-green)' : 'var(--text-muted)', fontFamily: 'var(--font-dm-mono), monospace' }}>
                {cycle.status === 'done' && '✓ '}{cycle.payDate}
              </div>
            </div>
          ))}
        </div>

        {/* Artists payments */}
        <div className="rf-card">
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>Reversements Q3 2025 — Artistes</span>
            <span className="badge-amber">En attente versement</span>
          </div>
          <div className="space-y-2">
            {PAYMENTS.map(p => (
              <div key={p.name} className="flex items-center gap-3 p-2.5 rounded-lg"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--card-border)' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-medium flex-shrink-0"
                  style={{ background: avatarBg[p.initials], color: avatarColor[p.initials] }}>
                  {p.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)' }}>{p.name}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2, fontFamily: 'var(--font-dm-mono), monospace' }}>
                    DA: {p.da} MAD · <span style={{ color: 'var(--rf-purple-text)' }}>DV: {p.dv} MAD</span> · {p.works} oeuvre{p.works > 1 ? 's' : ''}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--rf-green)', fontFamily: 'var(--font-dm-mono), monospace' }}>{p.total} MAD</div>
                  <span className="badge-amber" style={{ fontSize: '9px' }}>01 oct.</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid var(--card-border)', marginTop: 12, paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Total Q3 2025 · DA + DV · 47 artistes</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--rf-green)', fontFamily: 'var(--font-dm-mono), monospace' }}>31 740 MAD</div>
          </div>
        </div>

        {/* Payment methods info */}
        <div className="rf-card">
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>Méthodes de reversement acceptées</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {['Virement bancaire (IBAN)', 'Orange Money', 'CIH Pay', 'Wave'].map(m => (
              <div key={m} className="p-2 rounded-lg text-center"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--card-border)' }}>
                <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 4 }}>{m}</div>
                <span className="badge-green" style={{ fontSize: '9px' }}>Actif</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
