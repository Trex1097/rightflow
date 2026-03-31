'use client'
import AppShell from '@/components/layout/AppShell'
import MetricCard from '@/components/ui/MetricCard'
import SourceBreakdown from '@/components/dashboard/SourceBreakdown'
import { RightsQueue, ReserveFund, NextCycleBanner } from '@/components/dashboard/index'

export default function DashboardPage() {
  return (
    <AppShell activePage="dashboard">
      <div className="p-5 space-y-4">
        <div className="grid grid-cols-4 gap-3">
          <MetricCard label="Passages détectés" value="14 382" delta="+12% ce mois" deltaColor="green" />
          <MetricCard label="Droits d'auteur (DA)" value="17 240" suffix="MAD" valueColor="green" delta="Q3 2025" deltaColor="muted" />
          <MetricCard label="Droits voisins (DV)" value="14 500" suffix="MAD" valueColor="purple" delta="Q3 2025" deltaColor="muted" />
          <MetricCard label="Taux reversement" value="98.4" suffix="%" delta="vs 62% BMDA" deltaColor="green" />
        </div>
        <NextCycleBanner />
        <div className="grid grid-cols-[1.3fr_1fr] gap-3">
          <SourceBreakdown />
          <RightsQueue />
        </div>
        <ReserveFund />
      </div>
    </AppShell>
  )
}