'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function CallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { error } = await supabase.auth.exchangeCodeForSession(
          searchParams.get('code') || ''
        )

        if (error) {
          router.push('/auth/error')
        } else {
          router.push('/dashboard')
        }
      } catch (error) {
        router.push('/auth/error')
      }
    }

    handleCallback()
  }, [searchParams, router, supabase.auth])

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-600">Загрузка...</p>
      </div>
    </main>
  )
}
