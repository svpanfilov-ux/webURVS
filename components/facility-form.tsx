'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

interface FacilityFormProps {
  onSuccess?: () => void
}

export function FacilityForm({ onSuccess }: FacilityFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
  })

  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Пользователь не аутентифицирован')

      const { error } = await supabase
        .from('facilities')
        .insert({
          name: formData.name,
          address: formData.address,
          description: formData.description,
          created_by: user.id,
        })

      if (error) throw error

      toast({
        title: 'Успешно',
        description: 'Объект создан',
      })

      setFormData({ name: '', address: '', description: '' })
      onSuccess?.()
    } catch (error) {
      console.error('Ошибка:', error)
      toast({
        title: 'Ошибка',
        description: 'Не удалось создать объект',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Название</label>
        <Input
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Название объекта"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Адрес</label>
        <Input
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="Адрес объекта"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Описание</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Описание объекта"
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? 'Создание...' : 'Создать объект'}
      </Button>
    </form>
  )
}
