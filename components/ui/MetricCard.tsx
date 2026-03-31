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

const deltaColors = {
  green: 'text-[var(--rf-green)]',
  purple: 'text-[var(--rf-purple)]',
  red: 'text-[var(--rf-orange)]',
  muted: 'text-gray-400',
}

const valueColors = {
  green: 'text-[var(--rf-green)]',
  purple: 'text-[var(--rf-purple)]',
  default: 'text-gray-900',
}

export default function MetricCard({ label, value, suffix, delta, deltaColor = 'muted', valueColor = 'default', admin }: MetricCardProps) {
  return (
    <div className={clsx('rf-metric', admin && 'border-[var(--rf-purple)] bg-[var(--rf-purple-light)]')}>
      <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">{label}</div>
      <div className={clsx('text-xl font-bold leading-none', valueColors[valueColor])} style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>
        {value}
        {suffix && <span className="text-sm ml-0.5">{suffix}</span>}
      </div>
      {delta && (
        <div className={clsx('text-[10px] mt-1', deltaColors[deltaColor])} style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>
          {delta}
        </div>
      )}
    </div>
  )
}
