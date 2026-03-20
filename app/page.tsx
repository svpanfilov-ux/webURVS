'use client'

import { useRouter } from 'next/navigation'
import { setMockRole, type MockRole } from '@/lib/mock-auth'
import { LayoutDashboard, ClipboardList } from 'lucide-react'

const roles: {
  id: MockRole
  title: string
  subtitle: string
  description: string
  href: string
  icon: React.ReactNode
  features: string[]
}[] = [
  {
    id: 'admin',
    title: 'Администратор',
    subtitle: 'Управление системой',
    description: 'Настройка объектов, должностей, сотрудников и графиков работы',
    href: '/dashboard',
    icon: <LayoutDashboard size={32} strokeWidth={1.5} />,
    features: [
      'Штатное расписание',
      'Объекты и должности',
      'Управление сотрудниками',
      'Шаблоны смен и графики',
    ],
  },
  {
    id: 'manager',
    title: 'Менеджер объекта',
    subtitle: 'Табелирование',
    description: 'Просмотр графика команды и ведение табеля рабочего времени',
    href: '/manager',
    icon: <ClipboardList size={32} strokeWidth={1.5} />,
    features: [
      'График моей команды',
      'Табель рабочего времени',
      'Отметки присутствия',
      'Просмотр сотрудников',
    ],
  },
]

export default function Home() {
  const router = useRouter()

  const handleSelect = (role: MockRole, href: string) => {
    setMockRole(role)
    router.push(href)
  }

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-muted border border-border rounded-full px-4 py-1.5 mb-6">
          Демо-режим
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-3 text-balance">
          Staff Schedule Manager
        </h1>
        <p className="text-muted text-lg max-w-md mx-auto text-pretty leading-relaxed">
          Выберите роль для входа в систему
        </p>
      </div>

      {/* Role cards */}
      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => handleSelect(role.id, role.href)}
            className="flex-1 bg-surface border border-border rounded-xl p-8 text-left
                       hover:border-primary hover:shadow-lg transition-all duration-200
                       group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {/* Icon */}
            <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-6
                            text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-200">
              {role.icon}
            </div>

            {/* Title */}
            <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-1">
              {role.subtitle}
            </p>
            <h2 className="text-xl font-bold text-foreground mb-3">
              {role.title}
            </h2>
            <p className="text-sm text-muted leading-relaxed mb-6">
              {role.description}
            </p>

            {/* Features */}
            <ul className="space-y-2">
              {role.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-primary
                            group-hover:gap-3 transition-all duration-200">
              Войти как {role.title}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Footer note */}
      <p className="mt-10 text-xs text-muted text-center">
        Авторизация отключена в демо-режиме.{' '}
        <span className="opacity-60">Данные сохраняются в Supabase.</span>
      </p>
    </main>
  )
}
