'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { mockEmployees, mockPositions, mockFacilities } from '@/lib/mock-data'
import { Plus, Trash2 } from 'lucide-react'

interface Employee {
  id: string
  first_name: string
  last_name: string
  email: string
  position_id: string
  facility_id: string
  phone: string
  created_at: string
}

interface Position {
  id: string
  name: string
}

interface Facility {
  id: string
  name: string
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [positions, setPositions] = useState<Position[]>([])
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position_id: '',
    facility_id: '',
    phone: '',
  })
  const [showForm, setShowForm] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [employeesRes, positionsRes, facilitiesRes] = await Promise.all([
        supabase.from('employees').select('*').order('created_at', { ascending: false }),
        supabase.from('positions').select('*'),
        supabase.from('facilities').select('*'),
      ])

      setEmployees(employeesRes.data || mockEmployees)
      setPositions(positionsRes.data || mockPositions)
      setFacilities(facilitiesRes.data || mockFacilities)
    } catch (error) {
      console.warn('Supabase не доступен, используются mock-данные', error)
      setEmployees(mockEmployees)
      setPositions(mockPositions)
      setFacilities(mockFacilities)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { error } = await supabase.from('employees').insert([
        {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          position_id: formData.position_id,
          facility_id: formData.facility_id,
          phone: formData.phone,
        },
      ])

      if (error) throw error
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        position_id: '',
        facility_id: '',
        phone: '',
      })
      setShowForm(false)
      fetchData()
    } catch (error) {
      console.error('Error adding employee:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены?')) return
    try {
      const { error } = await supabase.from('employees').delete().eq('id', id)
      if (error) throw error
      fetchData()
    } catch (error) {
      console.error('Error deleting employee:', error)
    }
  }

  const getPositionName = (id: string) => positions.find((p) => p.id === id)?.name || 'N/A'
  const getFacilityName = (id: string) => facilities.find((f) => f.id === id)?.name || 'N/A'

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Сотрудники</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} /> Добавить сотрудника
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Новый сотрудник</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Имя
                </label>
                <input
                  type="text"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Фамилия
                </label>
                <input
                  type="text"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Телефон
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Должность
                </label>
                <select
                  value={formData.position_id}
                  onChange={(e) => setFormData({ ...formData, position_id: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Выберите должность</option>
                  {positions.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Объект
                </label>
                <select
                  value={formData.facility_id}
                  onChange={(e) => setFormData({ ...formData, facility_id: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Выберите объект</option>
                  {facilities.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Сохранить
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      )}

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
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ФИО</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Должность</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Объект</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Телефон</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900"></th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {employee.first_name} {employee.last_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{employee.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {getPositionName(employee.position_id)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {getFacilityName(employee.facility_id)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{employee.phone}</td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => handleDelete(employee.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 size={20} />
                        </button>
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
