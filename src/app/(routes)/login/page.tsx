'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Login from '@/app/components/login/login'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // Check workflow step
        const { data: profile } = await supabase
          .from('profiles')
          .select('workflow_step')
          .eq('id', session.user.id)
          .single()

        if (profile?.workflow_step === 'entity_pending') {
          router.replace('/register?step=2')
        } else {
          router.replace('/workspace')
        }
      }
    })

    // Also check initial session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        // Check workflow step
        const { data: profile } = await supabase
          .from('profiles')
          .select('workflow_step')
          .eq('id', session.user.id)
          .single()

        if (profile?.workflow_step === 'entity_pending') {
          router.replace('/register?step=2')
        } else {
          router.replace('/workspace')
        }
      }
    }

    checkSession()

    return () => subscription.unsubscribe()
  }, [supabase, router])

  return <Login />
}