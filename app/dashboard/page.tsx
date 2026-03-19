'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    facilities: 0,
    positions: 0,
    employees: 0,
    schedules: 0,
  })
  const [chartData, setChartData] = useState([])
  const supabase = createClient()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [facilitiesRes, positionsRes, employeesRes, schedulesRes] = await Promise.all([
          supabase.from('facilities').select('*', { count: 'exact' }),
          supabase.from('positions').select('*', { count: 'exact' }),
          supabase.from('employees').select('*', { count: 'exact' }),
          supabase.from('schedules').select('*', { count: 'exact' }),
        ])

        setStats({
          facilities: facilitiesRes.count || 0,
          positions: positionsRes.count || 0,
          employees: employeesRes.count || 0,
          schedules: schedulesRes.count || 0,
        })

        setChartData([
          { name: 'Объекты', value: facilitiesRes.count || 0 },
          { name: 'Должности', value: positionsRes.count || 0 },
          { name: 'Сотрудники', value: employeesRes.count || 0 },
          { name: 'Расписания', value: schedulesRes.count || 0 },
        ])
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }

    fetchStats()
  }, [supabase])

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Объекты</h3>
          <p className="text-4xl font-bold text-blue-600">{stats.facilities}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Должности</h3>
          <p className="text-4xl font-bold text-green-600">{stats.positions}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Сотрудники</h3>
          <p className="text-4xl font-bold text-purple-600">{stats.employees}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Расписания</h3>
          <p className="text-4xl font-bold text-orange-600">{stats.schedules}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-6">Статистика</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
