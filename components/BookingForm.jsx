'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useActionState } from 'react';
import { toast } from 'sonner';
import checkBookingDates from '@/lib/actions/checkBookingDates';

const BookingForm = ({ apartment }) => {
  const [state, formAction] = useActionState(checkBookingDates, {});
  const [tempStart, setTempStart] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const router = useRouter();
  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
      if (state.requiresLogin) {
        router.push(
          `/login?callbackUrl=${encodeURIComponent(
            `/apartments/${apartment.id}`,
          )}`,
        );
      }
    }

    if (state.success) {
      toast.success('Great news! Your chosen date is available to book');
      router.push('/bookings/confirm');
    }
  }, [state, router]);

  // const handleCheckInChange = (e) => {
  //   const newCheckInDate = e.target.value;
  //   setCheckIn(newCheckInDate);

  //   if (!checkOut || checkOut < newCheckInDate) {
  //     setCheckOut(newCheckInDate);
  //   }
  // };

  const handleBlur = () => {
    setCheckIn(tempStart);

    if (checkOut && tempStart > checkOut) {
      setCheckOut('');
    }
  };

  const today = new Date().toISOString().split('T')[0];
  return (
    <div className='pt-6 border-t border-slate-100'>
      <h2 className='text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2'>
        <span className='inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse' />
        Choose your dates
      </h2>

      <form action={formAction} className='mt-5 space-y-6'>
        <input type='hidden' name='apartment_id' value={apartment.id} />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <div>
            <label
              htmlFor='check_in'
              className='block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5'
            >
              Check-In Date
            </label>
            <input
              type='date'
              id='check_in'
              name='check_in'
              value={tempStart}
              onChange={(e) => setTempStart(e.target.value)}
              onBlur={handleBlur}
              min={today}
              className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200 text-sm'
            />
          </div>
          <div>
            <label
              htmlFor='check_out'
              className='block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5'
            >
              Check-Out Date
            </label>
            <input
              type='date'
              id='check_out'
              name='check_out'
              value={checkOut}
              min={checkIn}
              // disabled={!checkIn}
              onChange={(e) => setCheckOut(e.target.value)}
              className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200 text-sm'
            />
          </div>
          <div className='md:col-span-2 pt-2'>
            <button
              type='submit'
              className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-100 transition-all duration-150 text-sm tracking-wide text-center'
            >
              Check Availability
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
