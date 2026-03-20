import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const facilityId = searchParams.get('facility_id')
    const employeeId = searchParams.get('employee_id')
    const startDate = searchParams.get('start_date')
    const endDate = searchParams.get('end_date')

    const supabase = await createClient()

    let query = supabase
      .from('timesheets')
      .select('*, employees(first_name, last_name), schedules(scheduled_date)')
      .order('created_at', { ascending: false })

    if (facilityId) {
      query = query.eq('facility_id', facilityId)
    }

    if (employeeId) {
      query = query.eq('employee_id', employeeId)
    }

    if (startDate) {
      query = query.gte('created_at', startDate)
    }

    if (endDate) {
      query = query.lte('created_at', endDate)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Timesheets fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { facility_id, employee_id, schedule_id, check_in_time, check_out_time, notes, status } = await request.json()
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('timesheets')
      .insert({
        facility_id,
        employee_id,
        schedule_id,
        check_in_time,
        check_out_time,
        notes,
        status: status || 'pending',
      })
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    console.error('Timesheet create error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
