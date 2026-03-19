'use client'

import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Staff Schedule Manager
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Современное решение для управления штатным расписанием и графиками сотрудников
          </p>

          {!user ? (
            <div className="flex gap-4 justify-center">
              <Link
                href="/auth/login"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Вход
              </Link>
              <Link
                href="/auth/sign-up"
                className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Регистрация
              </Link>
            </div>
          ) : (
            <div className="flex gap-4 justify-center">
              <Link
                href="/dashboard"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Перейти в админ-панель
              </Link>
              <Link
                href="/manager"
                className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Перейти в менеджер
              </Link>
            </div>
          )}

          <div className="mt-20 grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-3xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Штатное расписание
              </h3>
              <p className="text-gray-600">
                Создавайте и управляйте структурой должностей компании
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-3xl mb-4">📅</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Графики смен
              </h3>
              <p className="text-gray-600">
                Генерируйте оптимальные графики работы сотрудников
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-3xl mb-4">⏱️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Табелирование
              </h3>
              <p className="text-gray-600">
                Отслеживайте рабочее время и табелируйте сотрудников
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
