'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'

interface NavigationProps {
  userRole?: 'admin' | 'manager' | 'employee'
}

export function Navigation({ userRole }: NavigationProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-bold text-lg">
            Staff Schedule
          </Link>

          <div className="flex gap-6 items-center">
            {userRole === 'admin' && (
              <>
                <Link href="/dashboard" className="hover:text-blue-600">
                  Dashboard
                </Link>
                <Link href="/dashboard/facilities" className="hover:text-blue-600">
                  Объекты
                </Link>
                <Link href="/dashboard/positions" className="hover:text-blue-600">
                  Должности
                </Link>
                <Link href="/dashboard/employees" className="hover:text-blue-600">
                  Сотрудники
                </Link>
                <Link href="/dashboard/shift-templates" className="hover:text-blue-600">
                  Шаблоны смен
                </Link>
                <Link href="/dashboard/schedules" className="hover:text-blue-600">
                  Расписания
                </Link>
              </>
            )}

            {userRole === 'manager' && (
              <>
                <Link href="/manager" className="hover:text-blue-600">
                  График
                </Link>
                <Link href="/manager/timesheet" className="hover:text-blue-600">
                  Табелирование
                </Link>
                <Link href="/manager/team" className="hover:text-blue-600">
                  Команда
                </Link>
              </>
            )}

            <Button onClick={handleLogout} variant="outline">
              Выход
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
