import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const facilityId = searchParams.get('facility_id')

    const supabase = await createClient()

    let query = supabase
      .from('positions')
      .select('*')
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
    console.error('Positions fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { facility_id, name, description, hourly_rate, required_count } = await request.json()
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('positions')
      .insert({
        facility_id,
        name,
        description,
        hourly_rate: hourly_rate || 0,
        required_count: required_count || 1,
      })
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    console.error('Position create error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
