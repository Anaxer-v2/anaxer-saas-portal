'use client';

import Link from 'next/link'
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/utils/supabase';
import CreateAccount from './createAccount';
import EntityDetails from './entityDetails';

const industries = ['Technology', 'Healthcare', 'Finance', 'Education', 'Retail'];
const countries = [
  { name: 'United States', code: 'US' },
  { name: 'Canada', code: 'CA' },
  { name: 'United Kingdom', code: 'GB' },
  { name: 'Australia', code: 'AU' },
  { name: 'Germany', code: 'DE' }
];

export default function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    first_name: '', last_name: '', email: '', password: '',
    business_name: '', industry: '', country: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeForm = async () => {
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // If user is authenticated, check their workflow step
        const { data: profile } = await supabase
          .from('profiles')
          .select('workflow_step, first_name, last_name, email')
          .eq('id', session.user.id)
          .single();

        if (profile?.workflow_step === 'entity_pending') {
          // If they're on entity_pending, move to step 2 and pre-fill data
          setCurrentStep(2);
          setFormData(prev => ({
            ...prev,
            first_name: profile.first_name,
            last_name: profile.last_name,
            email: profile.email
          }));
        } else if (profile?.workflow_step === 'completed') {
          // If they're already completed, redirect to workspace
          router.push('/workspace');
        }
      } else {
        // If no session and step param is present, redirect to login
        const step = searchParams.get('step');
        if (step === '2') {
          router.push('/login');
        }
      }
    };

    initializeForm();
  }, [router, searchParams]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (currentStep === 1) {
      try {
        // Sign up with metadata included
        const { data: { user }, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              first_name: formData.first_name,
              last_name: formData.last_name,
            }
          }
        });

        if (signUpError) {
          console.error('SignUp Error:', signUpError);
          throw signUpError;
        }
        
        if (!user) throw new Error('No user data returned');

        // Wait a moment for the trigger to complete
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Update the profile with first name and last name
        const { error: updateProfileError } = await supabase
          .from('profiles')
          .update({
            first_name: formData.first_name,
            last_name: formData.last_name,
            workflow_step: 'entity_pending'
          })
          .eq('id', user.id);

        if (updateProfileError) {
          console.error('Profile Update Error:', updateProfileError);
          throw updateProfileError;
        }

        // Move to step 2
        setCurrentStep(2);
      } catch (error) {
        console.error('Error:', error);
        setError(error instanceof Error ? error.message : 'An error occurred during sign up');
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        // Get the current user's ID
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.error('User Error:', userError);
          throw userError;
        }
        if (!user) throw new Error('No user found');

        // Create the entity
        const { error: entityError } = await supabase
          .from('entities')
          .insert({
            name: formData.business_name,
            industry: formData.industry,
            country_code: countries.find(c => c.name === formData.country)?.code,
            created_by: user.id
          });

        if (entityError) {
          console.error('Entity Error:', entityError);
          throw entityError;
        }

        // Update workflow status to completed
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ workflow_step: 'completed' })
          .eq('id', user.id);

        if (updateError) {
          console.error('Update Error:', updateError);
          throw updateError;
        }

        // Registration complete, redirect to workspace
        router.push('/workspace');
      } catch (error) {
        console.error('Error:', error);
        setError(error instanceof Error ? error.message : 'An error occurred during entity creation');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center w-full max-w-[448px] mx-auto">
        <img
          src="/assets/Anaxer_black.svg"
          alt="Anaxer"
          className="h-8 w-auto mb-6"
        />
        
        <h2 className="mt-2 text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {currentStep === 1 ? 'Create your account' : 'Business Information'}
        </h2>

        <form onSubmit={handleSubmit} className="mt-10 w-full space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 ? (
            <CreateAccount formData={formData} handleInputChange={handleInputChange} />
          ) : (
            <EntityDetails 
              formData={formData} 
              handleInputChange={handleInputChange} 
              industries={industries} 
              countries={countries} 
            />
          )}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center rounded-md bg-[#3b82f6] h-[43px] text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : null}
              {currentStep === 1 ? 'Create my account' : 'Continue to dashboard'}
            </button>
          </div>
        </form>

        {currentStep === 1 && (
          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Log in here
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
