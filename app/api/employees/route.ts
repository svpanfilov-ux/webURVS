import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const facilityId = searchParams.get('facility_id')

    const supabase = await createClient()

    let query = supabase
      .from('employees')
      .select('*, positions(name), facilities(name)')
      .order('created_at', { ascending: false })

    if (facilityId) {
      query = query.eq('facility_id', facilityId)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Employees fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { facility_id, position_id, first_name, last_name, phone, email, hire_date, status } = await request.json()
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('employees')
      .insert({
        facility_id,
        position_id,
        first_name,
        last_name,
        phone,
        email,
        hire_date,
        status: status || 'active',
      })
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    console.error('Employee create error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
