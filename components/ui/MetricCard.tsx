import clsx from 'clsx'

interface MetricCardProps {
  label: string
  value: string | number
  suffix?: string
  delta?: string
  deltaColor?: 'green' | 'purple' | 'red' | 'muted'
  valueColor?: 'green' | 'purple' | 'default'
  admin?: boolean
}

const accentColors = {
  green: 'var(--rf-green)',
  purple: 'var(--rf-purple)',
  default: '#E5E7EB',
}

const valueColors = {
  green: 'var(--rf-green)',
  purple: 'var(--rf-purple)',
  default: '#111827',
}

const deltaColors = {
  green: 'var(--rf-green)',
  purple: 'var(--rf-purple)',
  red: 'var(--rf-orange)',
  muted: '#9CA3AF',
}

export default function MetricCard({ label, value, suffix, delta, deltaColor = 'muted', valueColor = 'default', admin }: MetricCardProps) {
  const accent = admin ? 'var(--rf-purple)' : accentColors[valueColor]

  return (
    <div className="rf-metric" style={admin ? { background: '#0D0B1A', border: '1px solid rgba(123,110,246,0.2)' } : {}}>
      {/* Accent top line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: accent, borderRadius: '12px 12px 0 0' }} />

      <div className="text-[10px] font-semibold uppercase tracking-[0.08em] mb-2"
        style={{ color: admin ? '#6b7280' : '#9CA3AF', letterSpacing: '0.06em' }}>
        {label}
      </div>

      <div className="leading-none font-bold" style={{
        fontSize: '1.6rem',
        fontFamily: 'var(--font-dm-mono), monospace',
        color: admin ? (valueColor === 'purple' ? 'var(--rf-purple)' : '#E5E7EB') : valueColors[valueColor],
      }}>
        {value}
        {suffix && <span style={{ fontSize: '0.85rem', marginLeft: 2, opacity: 0.7 }}>{suffix}</span>}
      </div>

      {delta && (
        <div className="mt-1.5 text-[10px] font-medium"
          style={{ color: admin ? '#4b5563' : deltaColors[deltaColor], fontFamily: 'var(--font-dm-mono), monospace' }}>
          {delta}
        </div>
      )}
    </div>
  )
}
