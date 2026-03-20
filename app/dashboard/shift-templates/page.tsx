'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { mockShiftTemplates } from '@/lib/mock-data'
import { Plus, Trash2 } from 'lucide-react'

interface ShiftTemplate {
  id: string
  name: string
  start_time: string
  end_time: string
  duration_hours?: number
  description?: string
  created_at?: string
}

export default function ShiftTemplatesPage() {
  const [shifts, setShifts] = useState<ShiftTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    start_time: '09:00',
    end_time: '17:00',
    description: '',
  })
  const [showForm, setShowForm] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchShifts()
  }, [])

  const fetchShifts = async () => {
    try {
      const { data, error } = await supabase.from('shift_templates').select('*').order('created_at', { ascending: false })
      if (error) throw error
      setShifts(data || mockShiftTemplates)
    } catch (error) {
      console.warn('Supabase не доступен, используются mock-данные', error)
      setShifts(mockShiftTemplates)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { error } = await supabase.from('shift_templates').insert([
        {
          name: formData.name,
          start_time: formData.start_time,
          end_time: formData.end_time,
          description: formData.description,
        },
      ])

      if (error) throw error
      setFormData({ name: '', start_time: '09:00', end_time: '17:00', description: '' })
      setShowForm(false)
      fetchShifts()
    } catch (error) {
      console.error('Error adding shift:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены?')) return
    try {
      const { error } = await supabase.from('shift_templates').delete().eq('id', id)
      if (error) throw error
      fetchShifts()
    } catch (error) {
      console.error('Error deleting shift:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Шаблоны смен</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} /> Добавить шаблон
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Новый шаблон смены</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Название
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Например: День (утро)"
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
                Описание
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Описание смены"
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
          {shifts.length === 0 ? (
            <p className="text-gray-500">Шаблонов не найдено</p>
          ) : (
            shifts.map((shift) => (
              <div key={shift.id} className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">{shift.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {shift.start_time} - {shift.end_time}
                    </p>
                    <p className="text-gray-500 text-sm mt-2">{shift.description}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(shift.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
