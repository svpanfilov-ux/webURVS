import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const facilityId = searchParams.get('facility_id')
    const startDate = searchParams.get('start_date')
    const endDate = searchParams.get('end_date')

    const supabase = await createClient()

    let query = supabase
      .from('schedules')
      .select('*, employees(first_name, last_name), positions(name), shift_templates(name, start_time, end_time)')
      .order('scheduled_date', { ascending: true })

    if (facilityId) {
      query = query.eq('facility_id', facilityId)
    }

    if (startDate) {
      query = query.gte('scheduled_date', startDate)
    }

    if (endDate) {
      query = query.lte('scheduled_date', endDate)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Schedules fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { facility_id, employee_id, position_id, shift_template_id, scheduled_date, start_time, end_time, notes } = await request.json()
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('schedules')
      .insert({
        facility_id,
        employee_id,
        position_id,
        shift_template_id,
        scheduled_date,
        start_time,
        end_time,
        notes,
        created_by: user.id,
      })
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    console.error('Schedule create error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
