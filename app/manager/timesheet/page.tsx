'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { format } from 'date-fns'
import { Plus, Trash2, CheckCircle } from 'lucide-react'

interface Timesheet {
  id: string
  date: string
  start_time: string
  end_time: string
  status: 'pending' | 'approved' | 'rejected'
  notes: string
  created_at: string
}

export default function TimesheetPage() {
  const [timesheets, setTimesheets] = useState<Timesheet[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [formData, setFormData] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    start_time: '09:00',
    end_time: '17:00',
    notes: '',
  })
  const [showForm, setShowForm] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  useEffect(() => {
    if (user) {
      fetchTimesheets()
    }
  }, [user])

  const fetchTimesheets = async () => {
    try {
      const { data, error } = await supabase
        .from('timesheets')
        .select('*')
        .order('date', { ascending: false })

      if (error) throw error
      setTimesheets(data || [])
    } catch (error) {
      console.error('Error fetching timesheets:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { error } = await supabase.from('timesheets').insert([
        {
          date: formData.date,
          start_time: formData.start_time,
          end_time: formData.end_time,
          notes: formData.notes,
          status: 'pending',
        },
      ])

      if (error) throw error
      setFormData({
        date: format(new Date(), 'yyyy-MM-dd'),
        start_time: '09:00',
        end_time: '17:00',
        notes: '',
      })
      setShowForm(false)
      fetchTimesheets()
    } catch (error) {
      console.error('Error adding timesheet:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены?')) return
    try {
      const { error } = await supabase.from('timesheets').delete().eq('id', id)
      if (error) throw error
      fetchTimesheets()
    } catch (error) {
      console.error('Error deleting timesheet:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-50 border-green-200'
      case 'rejected':
        return 'bg-red-50 border-red-200'
      default:
        return 'bg-yellow-50 border-yellow-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Одобрено'
      case 'rejected':
        return 'Отклонено'
      default:
        return 'На рассмотрении'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Табелирование</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} /> Добавить запись
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Новая запись в табеле</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Время начала
                </label>
                <input
                  type="time"
                  value={formData.start_time}
                  onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Время окончания
                </label>
                <input
                  type="time"
                  value={formData.end_time}
                  onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Примечания
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Примечания к записи (опционально)"
                rows={3}
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
          {timesheets.length === 0 ? (
            <p className="text-gray-500">Записей в табеле не найдено</p>
          ) : (
            timesheets.map((timesheet) => (
              <div key={timesheet.id} className={`p-6 rounded-lg shadow border-l-4 ${getStatusColor(timesheet.status)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold">
                        {format(new Date(timesheet.date), 'dd MMMM yyyy')}
                      </h3>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        timesheet.status === 'approved'
                          ? 'bg-green-200 text-green-800'
                          : timesheet.status === 'rejected'
                            ? 'bg-red-200 text-red-800'
                            : 'bg-yellow-200 text-yellow-800'
                      }`}>
                        {getStatusText(timesheet.status)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">
                      {timesheet.start_time} - {timesheet.end_time}
                    </p>
                    {timesheet.notes && (
                      <p className="text-gray-500 text-sm italic">{timesheet.notes}</p>
                    )}
                  </div>
                  {timesheet.status === 'pending' && (
                    <button
                      onClick={() => handleDelete(timesheet.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
