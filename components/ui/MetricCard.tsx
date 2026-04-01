interface MetricCardProps {
  label: string
  value: string | number
  suffix?: string
  delta?: string
  deltaColor?: 'green' | 'purple' | 'red' | 'muted'
  valueColor?: 'green' | 'purple' | 'default'
  admin?: boolean
}

const valueColors = {
  green: 'var(--rf-green)',
  purple: 'var(--rf-purple)',
  default: 'var(--text-primary)',
}

const deltaColors = {
  green: 'var(--rf-green)',
  purple: 'var(--rf-purple-text)',
  red: 'var(--rf-orange)',
  muted: 'var(--text-muted)',
}

const accentColors = {
  green: 'var(--rf-green)',
  purple: 'var(--rf-purple)',
  default: '#2A2A2A',
}

export default function MetricCard({ label, value, suffix, delta, deltaColor = 'muted', valueColor = 'default', admin }: MetricCardProps) {
  const accent = admin ? 'var(--rf-purple)' : accentColors[valueColor]
  const cardBg = admin ? 'rgba(123,110,246,0.06)' : 'var(--card-bg)'
  const cardBorder = admin ? 'rgba(123,110,246,0.18)' : 'var(--card-border)'

  return (
    <div className="rf-metric" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: accent, borderRadius: '16px 16px 0 0' }} />
      <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)', marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ fontSize: '1.65rem', fontWeight: 700, lineHeight: 1, fontFamily: 'var(--font-dm-mono), monospace', color: valueColors[valueColor] }}>
        {value}
        {suffix && <span style={{ fontSize: '0.9rem', marginLeft: 3, opacity: 0.6 }}>{suffix}</span>}
      </div>
      {delta && (
        <div style={{ marginTop: 6, fontSize: 10, fontWeight: 500, color: deltaColors[deltaColor], fontFamily: 'var(--font-dm-mono), monospace' }}>
          {delta}
        </div>
      )}
    </div>
  )
}
