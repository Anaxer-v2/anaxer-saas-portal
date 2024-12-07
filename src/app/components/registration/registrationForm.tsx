'use client';

import Link from 'next/link'
import { CheckIcon, CheckCircleIcon } from '@heroicons/react/20/solid'
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../authContext';
import { useRouter } from 'next/navigation';
import ProgressLoader, { Step } from '../shared/progressLoader';
import CreateAccount from './createAccount';
import EntityDetails from './entityDetails';
import OtpVerification from './otp';

function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

const industries = ['Technology', 'Healthcare', 'Finance', 'Education', 'Retail'];
const countries = [
  { name: 'United States', code: 'US' },
  { name: 'Canada', code: 'CA' },
  { name: 'United Kingdom', code: 'GB' },
  { name: 'Australia', code: 'AU' },
  { name: 'Germany', code: 'DE' }
];

const checkAuthStatus = async () => {
  try {
    const response = await axios.get('/api/auth/check', { withCredentials: true });
    console.log('Auth status:', response.data.isAuthenticated);
    return response.data.isAuthenticated;
  } catch (error) {
    console.error('Error checking auth status:', error);
    return false;
  }
};

export default function RegisterForm() {
  const { setIsAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [steps, setSteps] = useState<Step[]>([
    { name: 'Step 1', status: 'current' },
    { name: 'Step 2', status: 'upcoming' },
    { name: 'Step 3', status: 'upcoming' },
  ]);
  const [formData, setFormData] = useState({
    first_name: '', last_name: '', email: '', password: '',
    business_name: '', industry: '', country: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '']);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOtpEmail = async () => {
    try {
      const response = await axios.post('/api/auth/otp/send', {}, { withCredentials: true });
      if (response.data.success) {
        console.log('OTP email sent successfully');
      } else {
        console.error('Failed to send OTP email:', response.data.error);
      }
    } catch (error) {
      console.error('Failed to send OTP email:', error);
    }
  };

  const resendOTP = async () => {
    setIsLoading(true);
    try {
      await sendOtpEmail();
      setVerificationError(null);
    } catch (error) {
      console.error('Failed to resend OTP:', error);
      setVerificationError('Failed to send new code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newOtp = [...otpCode];
    newOtp[index] = e.target.value;
    setOtpCode(newOtp);
    if (e.target.value && index < 3) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4);
    const newOtp = [...otpCode];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtpCode(newOtp);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (currentStep === 1) {
      try {
        const response = await axios.post('/api/auth/signup', {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          password: formData.password,
        }, { withCredentials: true });
        
        console.log('Signup response:', response.data);

        if (response.data.success) {
          setIsAuthenticated(true);
          setCurrentStep(2);
          const newSteps = [...steps];
          newSteps[0].status = 'complete';
          newSteps[1].status = 'current';
          setSteps(newSteps);
          await checkAuthStatus();
        } else {
          console.error('Signup failed:', response.data.error);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.error('Signup failed:', error.response.data);
        } else {
          console.error('Signup failed:', error);
        }
      } finally {
        setIsLoading(false);
      }
    } else if (currentStep === 2) {
      try {
        const response = await axios.patch('/api/auth/entity', {
          entity_name: formData.business_name,
          industry: formData.industry,
          stripe_charges_enabled: false,
          country_code: countries.find(c => c.name === formData.country)?.code,
        }, { withCredentials: true });

        if (response.status === 200) {
          setCurrentStep(3);
          const newSteps = [...steps];
          newSteps[1].status = 'complete';
          newSteps[2].status = 'current';
          setSteps(newSteps);
        }
      } catch (error) {
        console.error('Entity update failed:', error);
      } finally {
        setIsLoading(false);
      }
    } else if (currentStep === 3) {
      try {
        const response = await axios.post('/api/auth/otp/verify', { 
          code: otpCode.join('')
        }, { withCredentials: true });

        if (response.data.success) {
          const { verification_result, new_code_required } = response.data.data;
          
          if (verification_result === 'success') {
            router.push('/workspace');
          } else if (verification_result === 'failed') {
            if (new_code_required) {
              setVerificationError('Code expired. Click here to send a new one.');
            } else {
              setVerificationError('Incorrect code. Please try again.');
            }
          }
        } else {
          setVerificationError('OTP verification failed. Please try again.');
        }
      } catch (error) {
        console.error('OTP verification error:', error);
        setVerificationError('An error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (currentStep === 3) {
      sendOtpEmail();
    }
  }, [currentStep]);

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto">
      <img
        src="/assets/requiredLogoBlack.svg"
        alt="Required"
        className="h-8 w-auto mb-6"
      />
      
      <ProgressLoader steps={steps} />

      <h2 className="mt-2 text-2xl font-bold leading-9 tracking-tight text-gray-900">
        {currentStep === 1 ? 'Create your account' : currentStep === 2 ? 'Business Information' : 'OTP Verification'}
      </h2>

      <form onSubmit={handleSubmit} className="mt-10 w-full space-y-6">
        {currentStep === 1 ? (
          <CreateAccount formData={formData} handleInputChange={handleInputChange} />
        ) : currentStep === 2 ? (
          <EntityDetails 
            formData={formData} 
            handleInputChange={handleInputChange} 
            industries={industries} 
            countries={countries} 
          />
        ) : (
          <OtpVerification
            otpCode={otpCode}
            handleOtpChange={handleOtpChange}
            handleOtpKeyDown={handleOtpKeyDown}
            handleOtpPaste={handleOtpPaste}
            resendOTP={resendOTP}
          />
        )}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : null}
            {currentStep === 1 ? 'Create my account' : currentStep === 2 ? 'Continue' : 'Verify OTP'}
          </button>
        </div>
      </form>

      {verificationError && (
        <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
          <p>{verificationError}</p>
        </div>
      )}

      {currentStep === 1 && (
        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Log in here
          </Link>
        </p>
      )}
    </div>
  )
}
