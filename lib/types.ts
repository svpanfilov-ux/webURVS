export type UserRole = 'admin' | 'manager' | 'employee'

export interface Profile {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  role: UserRole
  facility_id?: string
  created_at: string
  updated_at: string
}

export interface Facility {
  id: string
  name: string
  address?: string
  description?: string
  created_by?: string
  created_at: string
  updated_at: string
}

export interface Position {
  id: string
  facility_id: string
  name: string
  description?: string
  hourly_rate?: number
  required_count?: number
  created_at: string
  updated_at: string
}

export interface Employee {
  id: string
  profile_id?: string
  facility_id: string
  position_id?: string
  first_name: string
  last_name: string
  phone?: string
  email?: string
  hire_date?: string
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}

export interface ShiftTemplate {
  id: string
  facility_id: string
  name: string
  start_time: string
  end_time: string
  duration_hours: number
  description?: string
  created_at: string
  updated_at: string
}

export interface Schedule {
  id: string
  facility_id: string
  employee_id: string
  position_id?: string
  shift_template_id?: string
  scheduled_date: string
  start_time?: string
  end_time?: string
  notes?: string
  created_by?: string
  created_at: string
  updated_at: string
}

export interface Timesheet {
  id: string
  facility_id: string
  employee_id: string
  schedule_id?: string
  check_in_time?: string
  check_out_time?: string
  notes?: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  updated_at: string
}
