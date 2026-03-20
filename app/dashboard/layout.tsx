'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { getMockRole, clearMockRole } from '@/lib/mock-auth'
import { LogOut, Menu, X, LayoutDashboard, Building2, Briefcase, Users, CalendarDays, Clock } from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Обзор', icon: LayoutDashboard },
  { href: '/dashboard/facilities', label: 'Объекты', icon: Building2 },
  { href: '/dashboard/positions', label: 'Должности', icon: Briefcase },
  { href: '/dashboard/employees', label: 'Сотрудники', icon: Users },
  { href: '/dashboard/schedules', label: 'Расписания', icon: CalendarDays },
  { href: '/dashboard/shift-templates', label: 'Шаблоны смен', icon: Clock },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [ready, setReady] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const role = getMockRole()
    if (role !== 'admin') {
      router.replace('/')
    } else {
      setReady(true)
    }
  }, [router])

  const handleLogout = () => {
    clearMockRole()
    router.push('/')
  }

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? 'w-60' : 'w-16'} bg-foreground text-white transition-all duration-300 flex flex-col flex-shrink-0`}
      >
        {/* Logo */}
        <div className="h-16 px-4 border-b border-white/10 flex items-center justify-between">
          {sidebarOpen && (
            <span className="font-bold text-sm tracking-wide uppercase text-white/80">
              Admin Panel
            </span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded hover:bg-white/10 transition text-white/60 hover:text-white ml-auto"
            aria-label="Переключить меню"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-0.5 px-2">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${active
                    ? 'bg-primary text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
              >
                <Icon size={18} className="flex-shrink-0" />
                {sidebarOpen && <span>{label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <LogOut size={18} className="flex-shrink-0" />
            {sidebarOpen && 'Выйти'}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-surface border-b border-border px-6 flex items-center justify-between flex-shrink-0">
          <h1 className="text-lg font-semibold text-foreground">Административная панель</h1>
          <span className="text-xs font-medium text-white bg-primary px-3 py-1 rounded-full">
            Администратор
          </span>
        </header>
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
