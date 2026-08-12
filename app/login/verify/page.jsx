'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useActionState } from 'react';
import { toast } from 'sonner';
import createSession from '@/lib/actions/createSession';
import { useAuth } from '@/context/authContext';

const VerifyPage = () => {
  const [state, formAction] = useActionState(createSession, {});
  const { isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin } =
    useAuth();
  const hasAdmin = state.isAdmin;
  const router = useRouter();

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.success) {
      toast.success('Logged in successfully!');
      setIsAuthenticated(true);
      setIsAdmin(hasAdmin);
      router.push('/');
    }
  }, [state]);

  return (
    <>
      <div className='flex items-center justify-center min-h-[75vh] px-4'>
        <div className='w-full max-w-md rounded-2xl bg-white shadow-xl border border-blue-100 p-8'>
          <div className='text-center mb-5'>
            <h2 className='text-2xl font-bold text-blue-700'>
              Confirm your email
            </h2>
            <p className='text-gray-500 mt-2'>Enter your verification code</p>
          </div>
          <form action={formAction} className='space-y-6'>
            <div>
              <label
                htmlFor='code'
                className='block text-sm font-semibold text-blue-700 mb-2'
              >
                Code
              </label>

              <input
                id='code'
                name='code'
                type='text'
                autoComplete='off'
                autoFocus
                defaultValue={state?.field ?? ''}
                placeholder='Enter your code'
                className='w-full rounded-lg border border-blue-200 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
              />
            </div>

            <button
              type='submit'
              className='w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]'
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default VerifyPage;
