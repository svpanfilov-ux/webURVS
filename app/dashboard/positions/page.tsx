'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { mockPositions } from '@/lib/mock-data'
import { Plus, Trash2 } from 'lucide-react'

interface Position {
  id: string
  name: string
  description: string
  hourly_rate?: number
  salary_min?: number
  salary_max?: number
  created_at?: string
}

export default function PositionsPage() {
  const [positions, setPositions] = useState<Position[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    salary_min: 0,
    salary_max: 0,
  })
  const [showForm, setShowForm] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchPositions()
  }, [])

  const fetchPositions = async () => {
    try {
      const { data, error } = await supabase.from('positions').select('*').order('created_at', { ascending: false })
      if (error) throw error
      setPositions(data || mockPositions)
    } catch (error) {
      console.warn('Supabase не доступен, используются mock-данные', error)
      setPositions(mockPositions)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { error } = await supabase.from('positions').insert([
        {
          name: formData.name,
          description: formData.description,
          salary_min: formData.salary_min,
          salary_max: formData.salary_max,
        },
      ])

      if (error) throw error
      setFormData({ name: '', description: '', salary_min: 0, salary_max: 0 })
      setShowForm(false)
      fetchPositions()
    } catch (error) {
      console.error('Error adding position:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены?')) return
    try {
      const { error } = await supabase.from('positions').delete().eq('id', id)
      if (error) throw error
      fetchPositions()
    } catch (error) {
      console.error('Error deleting position:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Должности</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} /> Добавить должность
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Новая должность</h2>
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
                placeholder="Название должности"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Описание
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Описание должности"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Мин. зарплата
                </label>
                <input
                  type="number"
                  value={formData.salary_min}
                  onChange={(e) => setFormData({ ...formData, salary_min: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Макс. зарплата
                </label>
                <input
                  type="number"
                  value={formData.salary_max}
                  onChange={(e) => setFormData({ ...formData, salary_max: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="0"
                />
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
          {positions.length === 0 ? (
            <p className="text-gray-500">Должностей не найдено</p>
          ) : (
            positions.map((position) => (
              <div key={position.id} className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">{position.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{position.description}</p>
                    <p className="text-gray-500 text-sm mt-2">
                      Зарплата: {position.salary_min} - {position.salary_max}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(position.id)}
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
