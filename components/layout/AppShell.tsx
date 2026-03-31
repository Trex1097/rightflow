'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: '▪' },
  { label: 'Tracking', href: '/tracking', icon: '◉', badge: 'Live', badgeClass: 'badge-green' },
  { label: 'Paiements', href: '/paiements', icon: '$' },
  { label: 'Catalogue', href: '/catalogue', icon: '●', badge: '47' },
  { label: 'Admin BMDA', href: '/admin', icon: '⬛', admin: true },
]

const SIDEBAR_SECTIONS = [
  {
    title: 'Principal',
    items: [
      { label: "Vue d'ensemble", href: '/dashboard', icon: '▪' },
      { label: "Droits d'auteur", href: '/dashboard?view=da', icon: '♩' },
      { label: 'Droits voisins', href: '/dashboard?view=dv', icon: '◆' },
    ],
  },
  {
    title: 'Gestion',
    items: [
      { label: 'Catalogue', href: '/catalogue', icon: '●', badge: '47' },
      { label: 'Tracking', href: '/tracking', icon: '◉', badge: 'Live', badgeClass: 'badge-green' },
      { label: 'Paiements', href: '/paiements', icon: '$' },
    ],
  },
  {
    title: 'Admin',
    items: [
      { label: 'Fonds de réserve', href: '/admin#reserve', icon: '⬛' },
      { label: 'Admin BMDA', href: '/admin', icon: '⊞' },
    ],
  },
]

const BOTTOM_NAV = [
  { label: 'Dashboard', href: '/dashboard', icon: '▪' },
  { label: 'Tracking', href: '/tracking', icon: '◉' },
  { label: 'Paiements', href: '/paiements', icon: '$' },
  { label: 'Catalogue', href: '/catalogue', icon: '●' },
  { label: 'Admin', href: '/admin', icon: '⬛' },
]

interface AppShellProps {
  children: React.ReactNode
  activePage?: string
}

export default function AppShell({ children, activePage }: AppShellProps) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Topbar */}
      <header className="h-[50px] bg-white border-b border-gray-100 flex items-center px-4 gap-3 z-10 flex-shrink-0">
        <Link href="/dashboard" className="flex items-center gap-2 text-base font-bold tracking-tight">
          <span className="w-2 h-2 rounded-full bg-[var(--rf-green)] inline-block" />
          RightFlow
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-1 ml-auto">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'px-3 py-1.5 text-xs font-medium rounded-md border transition-colors',
                pathname.startsWith(item.href.split('?')[0]) && item.href !== '/dashboard' || pathname === item.href
                  ? 'bg-gray-50 border-gray-200 text-gray-900'
                  : item.admin
                  ? 'border-[var(--rf-purple-light)] text-[var(--rf-purple)] hover:bg-[var(--rf-purple-light)]'
                  : 'border-transparent text-gray-500 hover:bg-gray-50'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="w-7 h-7 rounded-full bg-[var(--rf-green-dark)] flex items-center justify-center text-[11px] font-medium text-[var(--rf-green-light)] ml-auto md:ml-2">
          IS
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar — desktop only */}
        <aside className="hidden md:flex w-[180px] bg-white border-r border-gray-100 p-3 flex-col gap-1 overflow-y-auto flex-shrink-0">
          {SIDEBAR_SECTIONS.map((section) => (
            <div key={section.title}>
              <div className="text-[9px] uppercase tracking-widest text-gray-400 font-medium px-2 py-2">
                {section.title}
              </div>
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'sb-item',
                    pathname === item.href.split('?')[0] ? 'active' : ''
                  )}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span className="flex-1 text-[12px]">{item.label}</span>
                  {item.badge && (
                    <span className={clsx('text-[9px] px-1.5 py-0.5 rounded-full', item.badgeClass || 'bg-gray-100 text-gray-500')}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          ))}
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 pb-16 md:pb-0">
          {children}
        </main>
      </div>

      {/* Bottom nav — mobile only */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-20 flex">
        {BOTTOM_NAV.map((item) => {
          const isActive = item.href === '/dashboard' ? pathname === item.href : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5"
            >
              <span className={clsx('text-base', isActive ? 'text-[var(--rf-green)]' : 'text-gray-400')}>
                {item.icon}
              </span>
              <span className={clsx('text-[9px] font-medium', isActive ? 'text-[var(--rf-green)]' : 'text-gray-400')}
                style={{ fontFamily: 'var(--font-syne), sans-serif' }}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
