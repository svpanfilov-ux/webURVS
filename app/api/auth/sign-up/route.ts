import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password, fullName } = await request.json()

    const supabase = await createClient()

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${request.headers.get('origin')}/auth/callback`}`,
      },
    })

    if (signUpError) {
      return NextResponse.json({ error: signUpError.message }, { status: 400 })
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Sign up error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
