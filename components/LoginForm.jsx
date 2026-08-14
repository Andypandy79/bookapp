'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useActionState } from 'react';
import { toast } from 'sonner';
import createToken from '@/lib/actions/createToken';

const LoginForm = ({ callbackUrl }) => {
  const [state, formAction] = useActionState(createToken, {});
  const router = useRouter();

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }

    if (state.success) {
      toast.success('Check your email to get code');

      const verifyUrl = state.callbackUrl
        ? `/login/verify?callbackUrl=${encodeURIComponent(state.callbackUrl)}`
        : '/login/verify';

      router.push(verifyUrl);
    }
  }, [state, router]);

  return (
    <div className='flex items-center justify-center min-h-[75vh] px-4'>
      <div className='w-full max-w-md rounded-2xl bg-white shadow-xl border border-blue-100 p-8'>
        <div className='text-center mb-5'>
          <h2 className='text-2xl font-bold text-blue-700'>Welcome Back</h2>
          <p className='text-gray-500 mt-2'>
            Enter your email to receive a verification code.
          </p>
        </div>
        <form action={formAction} className='space-y-6'>
          <div>
            <input type='hidden' name='callbackUrl' value={callbackUrl ?? ''} />
            <label
              htmlFor='email'
              className='block text-sm font-semibold text-blue-700 mb-2'
            >
              Email
            </label>

            <input
              id='email'
              name='email'
              type='text'
              autoComplete='email'
              defaultValue={state?.field ?? ''}
              placeholder='you@example.com'
              className='w-full rounded-lg border border-blue-200 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
            />
          </div>

          <button
            type='submit'
            className='w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]'
          >
            Send Verification Code
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
