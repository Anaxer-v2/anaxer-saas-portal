'use client';

import Link from 'next/link'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Auth } from '@supabase/auth-ui-react'

// Custom theme based on your project's design system
const customTheme = {
  default: {
    colors: {
      brand: '#3b82f6', // blue-500
      brandAccent: '#2563eb', // blue-600
      brandButtonText: 'white',
      defaultButtonBackground: 'white',
      defaultButtonBackgroundHover: '#f9fafb', // gray-50
      defaultButtonBorder: '#e5e7eb', // gray-200
      defaultButtonText: '#374151', // gray-700
      dividerBackground: '#e5e7eb', // gray-200
      inputBackground: 'white',
      inputBorder: '#e5e7eb', // gray-200
      inputBorderHover: '#3b82f6', // blue-500
      inputBorderFocus: '#3b82f6', // blue-500
      inputText: '#1f2937', // gray-800
      inputLabelText: '#374151', // gray-700
      inputPlaceholder: '#9ca3af', // gray-400
    },
    space: {
      spaceSmall: '4px',
      spaceMedium: '8px',
      spaceLarge: '16px',
      labelBottomMargin: '8px',
      anchorBottomMargin: '4px',
      emailInputSpacing: '4px',
      socialAuthSpacing: '4px',
      buttonPadding: '10px 15px',
      inputPadding: '10px 15px',
    },
    fonts: {
      bodyFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
      buttonFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
      inputFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
    },
    fontSizes: {
      baseBodySize: '14px',
      baseInputSize: '14px',
      baseLabelSize: '14px',
      baseButtonSize: '14px',
    },
    borderWidths: {
      buttonBorderWidth: '1px',
      inputBorderWidth: '1px',
    },
    radii: {
      borderRadiusButton: '0.5rem',
      buttonBorderRadius: '0.5rem',
      inputBorderRadius: '0.375rem',
    },
  }
}

export default function Login() {
  const router = useRouter();
  const supabase = createClientComponentClient()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // Fetch the user's profile to check workflow step
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('workflow_step')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          return;
        }

        if (profile?.workflow_step === 'entity_pending') {
          router.push('/register?step=2');
        } else {
          router.push('/workspace');
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase, router])

  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md space-y-8 px-6">
        {/* Logo and title */}
        <div className="text-center">
          <Image
            className="mx-auto h-8 w-auto mb-5"
            src="/assets/Anaxer_black.svg"
            alt="Anaxer"
            width={100}
            height={32}
            priority
          />
          <h2 className="mt-2 text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        {/* Supabase Auth UI */}
        <Auth
          supabaseClient={supabase}
          theme="custom"
          appearance={{ theme: customTheme }}
          providers={['google']}
          view="sign_in"
          showLinks={false}
          localization={{
            variables: {
              sign_in: {
                email_label: 'Email address',
                password_label: 'Password',
                email_input_placeholder: 'name@company.com',
                password_input_placeholder: 'Your password',
                button_label: 'Sign in to your account',
                loading_button_label: 'Signing in...',
                social_provider_text: 'Sign in with {{provider}}',
                link_text: 'Already have an account? Sign in',
              },
            },
          }}
        />

        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}