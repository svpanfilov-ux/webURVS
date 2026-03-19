'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Employee {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  position_id: string
}

interface Position {
  id: string
  name: string
}

export default function TeamPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [positions, setPositions] = useState<Position[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [employeesRes, positionsRes] = await Promise.all([
        supabase.from('employees').select('*').order('created_at'),
        supabase.from('positions').select('*'),
      ])

      setEmployees(employeesRes.data || [])
      setPositions(positionsRes.data || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getPositionName = (id: string) => positions.find((p) => p.id === id)?.name || 'N/A'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Моя команда</h1>
        <p className="text-gray-600">Список сотрудников и их информация</p>
      </div>

      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <div className="grid gap-4">
          {employees.length === 0 ? (
            <p className="text-gray-500">Сотрудников не найдено</p>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      ФИО
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Телефон
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Должность
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {employee.first_name} {employee.last_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{employee.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{employee.phone}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {getPositionName(employee.position_id)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
