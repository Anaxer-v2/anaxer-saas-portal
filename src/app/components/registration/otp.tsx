import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/20/solid';

interface OtpVerificationProps {
  otpCode: string[];
  handleOtpChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  handleOtpKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
  handleOtpPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  resendOTP: () => void;
}

export default function OtpVerification({
  otpCode,
  handleOtpChange,
  handleOtpKeyDown,
  handleOtpPaste,
  resendOTP
}: OtpVerificationProps) {
  return (
    <>
      <div>
        <div className="mb-6 rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">We have sent a code to your email address</p>
            </div>
          </div>
        </div>
        <label htmlFor="otp" className="block text-sm font-medium leading-6 text-gray-900 mb-2">
          Enter OTP
        </label>
        <div className="flex items-center justify-between">
          {[0, 1, 2, 3].map((index) => (
            <React.Fragment key={index}>
              <input
                type="text"
                maxLength={1}
                value={otpCode[index]}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleOtpKeyDown(e, index)}
                onPaste={(e) => handleOtpPaste(e)}
                className="w-12 h-12 text-center text-2xl rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                id={`otp-${index}`}
              />
              {index < 3 && <span className="w-4 h-px bg-gray-300 mx-1"></span>}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-600 text-center">
        Didn't receive the code?{' '}
        <button
          type="button"
          onClick={resendOTP}
          className="text-indigo-600 hover:text-indigo-500 font-semibold"
        >
          Click here to resend
        </button>
      </div>
    </>
  );
}