// Временные mock-данные для демо-приложения
// Будут заменены на реальные данные из Supabase

export const mockProfiles = [
  { id: '1', email: 'admin@test.com', full_name: 'Администратор', role: 'admin' },
  { id: '2', email: 'manager@test.com', full_name: 'Иван Иванов', role: 'manager' },
  { id: '3', email: 'emp1@test.com', full_name: 'Петр Петров', role: 'employee' },
  { id: '4', email: 'emp2@test.com', full_name: 'Мария Сидорова', role: 'employee' },
]

export const mockFacilities = [
  {
    id: '1',
    name: 'Офис Москва',
    address: 'ул. Ленина, д. 1, Москва',
    description: 'Главный офис компании',
    created_by: '1',
  },
  {
    id: '2',
    name: 'Офис Санкт-Петербург',
    address: 'пр. Невский, д. 50, СПб',
    description: 'Филиал в Санкт-Петербурге',
    created_by: '1',
  },
  {
    id: '3',
    name: 'Офис Казань',
    address: 'ул. Баумана, д. 25, Казань',
    description: 'Филиал в Казани',
    created_by: '1',
  },
]

export const mockPositions = [
  {
    id: '1',
    facility_id: '1',
    name: 'Менеджер',
    description: 'Менеджер по работе с клиентами',
    hourly_rate: 500.0,
    required_count: 3,
  },
  {
    id: '2',
    facility_id: '1',
    name: 'Администратор',
    description: 'Администратор офиса',
    hourly_rate: 450.0,
    required_count: 2,
  },
  {
    id: '3',
    facility_id: '1',
    name: 'Аналитик',
    description: 'Аналитик данных',
    hourly_rate: 600.0,
    required_count: 1,
  },
  {
    id: '4',
    facility_id: '2',
    name: 'Менеджер',
    description: 'Менеджер по работе с клиентами',
    hourly_rate: 500.0,
    required_count: 2,
  },
]

export const mockEmployees = [
  {
    id: '1',
    profile_id: '3',
    facility_id: '1',
    position_id: '1',
    first_name: 'Петр',
    last_name: 'Петров',
    phone: '+79991234567',
    email: 'emp1@test.com',
    hire_date: '2024-01-15',
    status: 'active',
  },
  {
    id: '2',
    profile_id: '4',
    facility_id: '1',
    position_id: '1',
    first_name: 'Мария',
    last_name: 'Сидорова',
    phone: '+79991234568',
    email: 'emp2@test.com',
    hire_date: '2024-02-01',
    status: 'active',
  },
]

export const mockShiftTemplates = [
  {
    id: '1',
    facility_id: '1',
    name: 'Утренняя',
    start_time: '08:00:00',
    end_time: '16:00:00',
    duration_hours: 8,
    description: 'Утренняя смена 8:00-16:00',
  },
  {
    id: '2',
    facility_id: '1',
    name: 'Дневная',
    start_time: '12:00:00',
    end_time: '20:00:00',
    duration_hours: 8,
    description: 'Дневная смена 12:00-20:00',
  },
  {
    id: '3',
    facility_id: '1',
    name: 'Вечерняя',
    start_time: '16:00:00',
    end_time: '00:00:00',
    duration_hours: 8,
    description: 'Вечерняя смена 16:00-00:00',
  },
]

export const mockSchedules = [
  {
    id: '1',
    facility_id: '1',
    employee_id: '1',
    position_id: '1',
    shift_template_id: '1',
    scheduled_date: '2025-03-17',
    start_time: '08:00:00',
    end_time: '16:00:00',
    notes: 'Понедельник',
  },
  {
    id: '2',
    facility_id: '1',
    employee_id: '1',
    position_id: '1',
    shift_template_id: '1',
    scheduled_date: '2025-03-18',
    start_time: '08:00:00',
    end_time: '16:00:00',
    notes: 'Вторник',
  },
  {
    id: '3',
    facility_id: '1',
    employee_id: '2',
    position_id: '1',
    shift_template_id: '2',
    scheduled_date: '2025-03-17',
    start_time: '12:00:00',
    end_time: '20:00:00',
    notes: 'Дневная смена',
  },
]

export const mockTimesheets = [
  {
    id: '1',
    facility_id: '1',
    employee_id: '1',
    schedule_id: '1',
    check_in_time: '2025-03-17T08:05:00',
    check_out_time: '2025-03-17T16:00:00',
    notes: 'Вовремя',
    status: 'approved',
  },
  {
    id: '2',
    facility_id: '1',
    employee_id: '1',
    schedule_id: '2',
    check_in_time: '2025-03-18T08:00:00',
    check_out_time: '2025-03-18T16:15:00',
    notes: 'Немного задержались',
    status: 'approved',
  },
  {
    id: '3',
    facility_id: '1',
    employee_id: '2',
    schedule_id: '3',
    check_in_time: '2025-03-17T12:10:00',
    check_out_time: null,
    notes: 'Еще не уходила',
    status: 'pending',
  },
]
