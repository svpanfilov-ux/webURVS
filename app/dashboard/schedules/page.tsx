'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { mockSchedules, mockEmployees, mockShiftTemplates } from '@/lib/mock-data'
import { Plus, Trash2 } from 'lucide-react'
import { format, addDays } from 'date-fns'
import { ru } from 'date-fns/locale'

interface Schedule {
  id: string
  employee_id: string
  shift_template_id: string
  date: string
  created_at: string
}

interface Employee {
  id: string
  first_name: string
  last_name: string
}

interface ShiftTemplate {
  id: string
  name: string
}

export default function SchedulesPage() {
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [shifts, setShifts] = useState<ShiftTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    employee_id: '',
    shift_template_id: '',
    date: format(new Date(), 'yyyy-MM-dd'),
  })
  const [showForm, setShowForm] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [schedulesRes, employeesRes, shiftsRes] = await Promise.all([
        supabase
          .from('schedules')
          .select('*')
          .order('scheduled_date', { ascending: false })
          .limit(100),
        supabase.from('employees').select('*'),
        supabase.from('shift_templates').select('*'),
      ])

      setSchedules(schedulesRes.data || mockSchedules)
      setEmployees(employeesRes.data || mockEmployees)
      setShifts(shiftsRes.data || mockShiftTemplates)
    } catch (error) {
      console.warn('Supabase не доступен, используются mock-данные', error)
      setSchedules(mockSchedules)
      setEmployees(mockEmployees)
      setShifts(mockShiftTemplates)
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { error } = await supabase.from('schedules').insert([
        {
          employee_id: formData.employee_id,
          shift_template_id: formData.shift_template_id,
          date: formData.date,
        },
      ])

      if (error) throw error
      setFormData({
        employee_id: '',
        shift_template_id: '',
        date: format(new Date(), 'yyyy-MM-dd'),
      })
      setShowForm(false)
      fetchData()
    } catch (error) {
      console.error('Error adding schedule:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены?')) return
    try {
      const { error } = await supabase.from('schedules').delete().eq('id', id)
      if (error) throw error
      fetchData()
    } catch (error) {
      console.error('Error deleting schedule:', error)
    }
  }

  const getEmployeeName = (id: string) => {
    const emp = employees.find((e) => e.id === id)
    return emp ? `${emp.first_name} ${emp.last_name}` : 'N/A'
  }

  const getShiftName = (id: string) => shifts.find((s) => s.id === id)?.name || 'N/A'

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Расписания</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} /> Добавить расписание
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Новое расписание</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Сотрудник
              </label>
              <select
                value={formData.employee_id}
                onChange={(e) => setFormData({ ...formData, employee_id: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Выберите сотрудника</option>
                {employees.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.first_name} {e.last_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Смена
              </label>
              <select
                value={formData.shift_template_id}
                onChange={(e) => setFormData({ ...formData, shift_template_id: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Выберите смену</option>
                {shifts.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Дата
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
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
          {schedules.length === 0 ? (
            <p className="text-gray-500">Расписаний не найдено</p>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Сотрудник
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Смена
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Дата
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900"></th>
                  </tr>
                </thead>
                <tbody>
                  {schedules.map((schedule) => (
                    <tr key={schedule.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {getEmployeeName(schedule.employee_id)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {getShiftName(schedule.shift_template_id)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {format(new Date(schedule.date), 'dd MMMM yyyy', { locale: ru })}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => handleDelete(schedule.id)}
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
