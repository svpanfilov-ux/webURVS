'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { mockFacilities } from '@/lib/mock-data'
import { Plus, Trash2 } from 'lucide-react'

interface Facility {
  id: string
  name: string
  address: string
  description: string
  created_at?: string
}

export default function FacilitiesPage() {
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({ name: '', address: '', description: '' })
  const [showForm, setShowForm] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchFacilities()
  }, [])

  const fetchFacilities = async () => {
    try {
      const { data, error } = await supabase.from('facilities').select('*').order('created_at', { ascending: false })
      if (error) throw error
      setFacilities(data || mockFacilities)
    } catch (error) {
      console.warn('Supabase не доступен, используются mock-данные', error)
      setFacilities(mockFacilities)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { error } = await supabase.from('facilities').insert([
        {
          name: formData.name,
          address: formData.address,
          description: formData.description,
        },
      ])

      if (error) throw error
      setFormData({ name: '', address: '', description: '' })
      setShowForm(false)
      fetchFacilities()
    } catch (error) {
      console.error('Error adding facility:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены?')) return
    try {
      const { error } = await supabase.from('facilities').delete().eq('id', id)
      if (error) throw error
      fetchFacilities()
    } catch (error) {
      console.error('Error deleting facility:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Объекты</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} /> Добавить объект
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Новый объект</h2>
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
                placeholder="Название объекта"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Адрес
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Адрес объекта"
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
                placeholder="Описание объекта"
                rows={4}
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
          {facilities.length === 0 ? (
            <p className="text-gray-500">Объектов не найдено</p>
          ) : (
            facilities.map((facility) => (
              <div key={facility.id} className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">{facility.name}</h3>
                    <p className="text-gray-600">{facility.address}</p>
                    <p className="text-gray-500 text-sm mt-2">{facility.description}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(facility.id)}
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
