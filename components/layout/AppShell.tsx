'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Tracking', href: '/tracking', badge: 'Live' },
  { label: 'Paiements', href: '/paiements' },
  { label: 'Catalogue', href: '/catalogue', badge: '47' },
  { label: 'Admin BMDA', href: '/admin', admin: true },
]

const SIDEBAR_SECTIONS = [
  {
    title: 'Principal',
    items: [
      { label: "Vue d'ensemble", href: '/dashboard', icon: '○' },
      { label: "Droits d'auteur", href: '/dashboard?view=da', icon: '◆' },
      { label: 'Droits voisins', href: '/dashboard?view=dv', icon: '◇' },
    ],
  },
  {
    title: 'Gestion',
    items: [
      { label: 'Catalogue', href: '/catalogue', icon: '≡', badge: '47' },
      { label: 'Tracking', href: '/tracking', icon: '◉', badge: 'Live', badgeClass: 'badge-green' },
      { label: 'Paiements', href: '/paiements', icon: '₁' },
    ],
  },
  {
    title: 'Admin',
    items: [
      { label: 'Admin BMDA', href: '/admin', icon: '⊞' },
    ],
  },
]

const BOTTOM_NAV = [
  { label: 'Dashboard', href: '/dashboard', icon: '○' },
  { label: 'Tracking', href: '/tracking', icon: '◉' },
  { label: 'Paiements', href: '/paiements', icon: '₁' },
  { label: 'Catalogue', href: '/catalogue', icon: '≡' },
  { label: 'Admin', href: '/admin', icon: '⊞' },
]

interface AppShellProps {
  children: React.ReactNode
  activePage?: string
}

export default function AppShell({ children, activePage }: AppShellProps) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: 'var(--nav-bg)' }}>
      {/* Topbar */}
      <header style={{ background: 'var(--nav-bg)', borderBottom: '1px solid var(--nav-border)', height: '52px' }}
        className="flex items-center px-5 gap-4 z-10 flex-shrink-0">

        <Link href="/dashboard" className="flex items-center gap-2.5 flex-shrink-0">
          <div style={{ width: 24, height: 24, borderRadius: 8, background: 'var(--rf-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontSize: 12, fontWeight: 700 }}>R</span>
          </div>
          <span style={{ color: 'white', fontWeight: 700, fontSize: 15, letterSpacing: '-0.3px' }}>RightFlow</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 ml-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = item.href === '/dashboard' ? pathname === item.href : pathname.startsWith(item.href)
            return (
              <Link key={item.href} href={item.href}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{
                  color: isActive ? 'white' : '#6b7280',
                  background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                  fontFamily: 'var(--font-syne), sans-serif',
                }}>
                {item.label}
                {item.badge && (
                  <span style={{
                    fontSize: 9, fontWeight: 600, padding: '1px 5px', borderRadius: 6,
                    background: item.badge === 'Live' ? 'rgba(29,185,116,0.15)' : 'rgba(255,255,255,0.08)',
                    color: item.badge === 'Live' ? 'var(--rf-green)' : '#9ca3af',
                    fontFamily: 'var(--font-dm-mono), monospace',
                  }}>{item.badge}</span>
                )}
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto md:ml-3 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
          style={{ background: 'rgba(29,185,116,0.15)', color: 'var(--rf-green)', border: '1px solid rgba(29,185,116,0.2)' }}>
          IS
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar — desktop only */}
        <aside className="hidden md:flex flex-col w-[188px] flex-shrink-0 overflow-y-auto p-3 gap-0.5"
          style={{ background: 'var(--nav-bg)', borderRight: '1px solid var(--nav-border)' }}>
          {SIDEBAR_SECTIONS.map((section) => (
            <div key={section.title} className="mb-3">
              <div className="px-3 py-1.5 text-[9px] uppercase tracking-[0.12em] font-semibold"
                style={{ color: '#3D3D3D' }}>
                {section.title}
              </div>
              {section.items.map((item) => (
                <Link key={item.href} href={item.href}
                  className={clsx('sb-item', pathname === item.href.split('?')[0] ? 'active' : '')}>
                  <span style={{ fontSize: 13 }}>{item.icon}</span>
                  <span className="flex-1" style={{ fontSize: 12 }}>{item.label}</span>
                  {item.badge && (
                    <span className={item.badgeClass || 'badge-dark'}>{item.badge}</span>
                  )}
                </Link>
              ))}
            </div>
          ))}

          {/* Bottom of sidebar */}
          <div className="mt-auto pt-3" style={{ borderTop: '1px solid var(--nav-border)' }}>
            <div className="px-3 py-2 rounded-xl" style={{ background: 'rgba(29,185,116,0.06)', border: '1px solid rgba(29,185,116,0.12)' }}>
              <div className="text-[9px] font-semibold mb-1" style={{ color: 'var(--rf-green)' }}>Taux reversement</div>
              <div className="text-lg font-bold" style={{ color: 'white', fontFamily: 'var(--font-dm-mono), monospace' }}>98.4%</div>
              <div className="text-[9px]" style={{ color: '#6b7280', fontFamily: 'var(--font-dm-mono), monospace' }}>vs 62% BMDA</div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0" style={{ background: 'var(--content-bg)' }}>
          {children}
        </main>
      </div>

      {/* Bottom nav — mobile only */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-20 flex"
        style={{ background: 'var(--nav-bg)', borderTop: '1px solid var(--nav-border)' }}>
        {BOTTOM_NAV.map((item) => {
          const isActive = item.href === '/dashboard' ? pathname === item.href : pathname.startsWith(item.href)
          return (
            <Link key={item.href} href={item.href}
              className="flex-1 flex flex-col items-center justify-center py-2.5 gap-1">
              <span style={{ fontSize: 16, color: isActive ? 'var(--rf-green)' : '#4b5563' }}>{item.icon}</span>
              <span style={{ fontSize: 9, fontWeight: 600, color: isActive ? 'var(--rf-green)' : '#4b5563', fontFamily: 'var(--font-syne), sans-serif' }}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
