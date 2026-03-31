'use client'
import AppShell from '@/components/layout/AppShell'
import MetricCard from '@/components/ui/MetricCard'
import clsx from 'clsx'

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

const avatarColors: Record<string, string> = {
  SL: 'var(--rf-green-light)',
  DZ: 'var(--rf-purple-light)',
  MZ: 'var(--rf-amber-light)',
  RO: 'var(--rf-blue-light)',
  HA: 'var(--rf-orange-light)',
}
const avatarText: Record<string, string> = {
  SL: 'var(--rf-green-text)',
  DZ: 'var(--rf-purple-text)',
  MZ: 'var(--rf-amber-text)',
  RO: 'var(--rf-blue-text)',
  HA: 'var(--rf-orange-text)',
}

export default function PaiementsPage() {
  return (
    <AppShell activePage="paiements">
      <div className="p-5 space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-bold">Paiements</h1>
          <span className="badge-blue">Cycles trimestriels</span>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <MetricCard label="Total Q3 2025" value="31 740" suffix=" MAD" valueColor="green" />
          <MetricCard label="Artistes à payer" value="47" delta="ce cycle" deltaColor="muted" />
          <MetricCard label="DA versés" value="17 240" suffix=" MAD" valueColor="green" />
          <MetricCard label="DV versés" value="14 500" suffix=" MAD" valueColor="purple" />
        </div>

        {/* Cycles */}
        <div className="grid grid-cols-3 gap-3">
          {CYCLES.map(cycle => (
            <div key={cycle.label} className={clsx('rf-card relative overflow-hidden', cycle.status === 'active' && 'border-[var(--rf-green)]')}>
              {cycle.status === 'active' && <div className="absolute top-0 left-0 right-0 h-0.5 bg-[var(--rf-green)]" />}
              <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">{cycle.label}</div>
              <div className={clsx('text-lg font-bold', cycle.status === 'active' ? 'text-[var(--rf-green)]' : cycle.status === 'done' ? 'text-gray-700' : 'text-gray-300')}
                style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>
                {cycle.amount}{cycle.amount !== '—' && ' MAD'}
              </div>
              <div className="text-[10px] text-gray-400 mt-0.5 mb-2" style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>{cycle.dates}</div>
              {cycle.status !== 'upcoming' && (
                <>
                  <div className="h-1 bg-gray-100 rounded-full mb-1">
                    <div className="h-full rounded-full" style={{ width: `${cycle.progress}%`, background: cycle.status === 'done' ? '#d1d5db' : 'var(--rf-green)' }} />
                  </div>
                </>
              )}
              <div className={clsx('text-[9px] mt-1', cycle.status === 'done' ? 'text-[var(--rf-green)]' : 'text-gray-400')} style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>
                {cycle.status === 'done' && '✓ '}{cycle.payDate}
              </div>
            </div>
          ))}
        </div>

        {/* Artists payments */}
        <div className="rf-card">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium">Reversements Q3 2025 — Artistes</span>
            <span className="badge-amber">En attente versement</span>
          </div>
          <div className="space-y-2">
            {PAYMENTS.map(p => (
              <div key={p.name} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-medium flex-shrink-0"
                  style={{ background: avatarColors[p.initials], color: avatarText[p.initials] }}>
                  {p.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium">{p.name}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5" style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>
                    DA: {p.da} MAD · <span style={{ color: 'var(--rf-purple)' }}>DV: {p.dv} MAD</span> · {p.works} oeuvre{p.works > 1 ? 's' : ''}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-bold text-[var(--rf-green)]" style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>{p.total} MAD</div>
                  <span className="badge-amber" style={{ fontSize: '9px' }}>01 oct.</span>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between items-center">
            <div className="text-xs text-gray-400">Total Q3 2025 · DA + DV · 47 artistes</div>
            <div className="text-base font-bold text-[var(--rf-green)]" style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>31 740 MAD</div>
          </div>
        </div>

        {/* Payment methods info */}
        <div className="rf-card">
          <div className="text-xs font-medium mb-3">Méthodes de reversement acceptées</div>
          <div className="grid grid-cols-4 gap-2">
            {['Virement bancaire (IBAN)', 'Orange Money', 'CIH Pay', 'Wave'].map(m => (
              <div key={m} className="p-2 bg-gray-50 rounded-lg text-center">
                <div className="text-[11px] font-medium">{m}</div>
                <span className="badge-green" style={{ fontSize: '9px' }}>Actif</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
