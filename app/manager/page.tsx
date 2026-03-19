'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth } from 'date-fns'
import { ru } from 'date-fns/locale'

interface Schedule {
  id: string
  date: string
  shift_template_id: string
}

interface ShiftTemplate {
  id: string
  name: string
  start_time: string
  end_time: string
}

export default function ManagerSchedulePage() {
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [shifts, setShifts] = useState<ShiftTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [user, setUser] = useState<any>(null)
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
      fetchSchedulesAndShifts()
    }
  }, [user, currentDate])

  const fetchSchedulesAndShifts = async () => {
    try {
      const startDate = format(startOfMonth(currentDate), 'yyyy-MM-dd')
      const endDate = format(endOfMonth(currentDate), 'yyyy-MM-dd')

      const [schedulesRes, shiftsRes] = await Promise.all([
        supabase
          .from('schedules')
          .select('*')
          .gte('date', startDate)
          .lte('date', endDate)
          .order('date'),
        supabase.from('shift_templates').select('*'),
      ])

      setSchedules(schedulesRes.data || [])
      setShifts(shiftsRes.data || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getShiftInfo = (shiftId: string) => {
    return shifts.find((s) => s.id === shiftId)
  }

  const getDaySchedule = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    return schedules.find((s) => s.date === dateStr)
  }

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  })

  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Мой график</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            ← Назад
          </button>
          <span className="text-lg font-semibold">
            {format(currentDate, 'MMMM yyyy', { locale: ru })}
          </span>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Вперед →
          </button>
        </div>
      </div>

      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day) => (
              <div key={day} className="text-center font-semibold text-gray-600 py-2">
                {day}
              </div>
            ))}

            {days.map((day) => {
              const schedule = getDaySchedule(day)
              const shift = schedule ? getShiftInfo(schedule.shift_template_id) : null

              return (
                <div
                  key={day.toISOString()}
                  className={`min-h-24 p-2 border rounded-lg ${
                    !isSameMonth(day, currentDate)
                      ? 'bg-gray-100'
                      : schedule
                        ? 'bg-blue-50 border-blue-300'
                        : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="font-semibold text-sm mb-1">
                    {format(day, 'd')}
                  </div>
                  {shift && (
                    <div className="text-xs">
                      <div className="font-semibold text-blue-600">{shift.name}</div>
                      <div className="text-gray-600">
                        {shift.start_time} - {shift.end_time}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
