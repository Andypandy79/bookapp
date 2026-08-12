'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useActionState } from 'react';
import { toast } from 'sonner';
import createBooking from '@/lib/actions/createBooking';
import { formatDate, formatPrice } from '@/lib/utils';

const ConfirmBookingForm = ({ apartment, booking }) => {
  const [state, formAction] = useActionState(createBooking, {});

  const router = useRouter();
  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.success) {
      toast.success('Apartment has been booked!');
      router.push('/bookings');
    }
  }, [state]);

  const totalPrice = booking.totalNights * apartment.price;
  return (
    <form action={formAction} className='p-6 space-y-6'>
      <input type='hidden' name='apartment_id' value={apartment.id} />
      <input type='hidden' name='apartment_name' value={apartment.name} />
      <input type='hidden' name='guests' value={apartment.guests} />
      <input type='hidden' name='check_in' value={booking.checkIn} />
      <input type='hidden' name='check_out' value={booking.checkOut} />
      <input type='hidden' name='total_nights' value={booking.totalNights} />
      <input type='hidden' name='total_price' value={totalPrice} />

      <div className='grid grid-cols-2 gap-4'>
        <div className='bg-slate-50 p-3 rounded-xl border border-slate-100'>
          <span className='block text-xs font-semibold text-slate-500 uppercase tracking-wider'>
            Check-In
          </span>
          <span className='text-sm font-bold text-slate-800'>
            {formatDate(booking.checkIn)}
          </span>
        </div>
        <div className='bg-slate-50 p-3 rounded-xl border border-slate-100'>
          <span className='block text-xs font-semibold text-slate-500 uppercase tracking-wider'>
            Check-Out
          </span>
          <span className='text-sm font-bold text-slate-800'>
            {formatDate(booking.checkOut)}
          </span>
        </div>
      </div>

      <div className='space-y-2 pt-2'>
        <div className='flex justify-between text-sm text-slate-600'>
          <span>Price per night</span>
          <span className='font-medium text-slate-800'>
            {formatPrice(apartment.price)}
          </span>
        </div>
        <div className='flex justify-between text-sm text-slate-600'>
          <span>Total stay</span>
          <span className='font-medium text-slate-800'>
            {booking.totalNights} nights
          </span>
        </div>

        <hr className='border-slate-100 my-3' />

        <div className='flex justify-between items-center'>
          <span className='text-base font-bold text-slate-800'>
            Total Price
          </span>
          <span className='text-2xl font-black text-blue-600'>
            {formatPrice(totalPrice)}
          </span>
        </div>
      </div>

      <hr className='border-slate-100' />
      <div className=''>
        <p className='block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1'>
          Guests <span className='text-rose-500'>*</span>
        </p>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label htmlFor='adults' className='sr-only'>
              Adults
            </label>
            <input
              type='number'
              name='adults'
              id='adults'
              defaultValue={state?.fields?.adults ?? ''}
              placeholder='Adults'
              min='0'
              max='5'
              className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200 text-sm'
            />
          </div>
          <div>
            <label
              htmlFor='children'
              className='block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1 sr-only'
            >
              Children
            </label>
            <input
              type='number'
              name='children'
              id='children'
              defaultValue={state?.fields?.children ?? ''}
              placeholder='Children'
              min='0'
              max='5'
              className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200 text-sm'
            />
          </div>
        </div>
      </div>
      <div className='space-y-4'>
        <div>
          <label
            htmlFor='user_name'
            className='block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1'
          >
            Name <span className='text-rose-500'>*</span>
          </label>
          <input
            type='text'
            name='user_name'
            defaultValue={state?.fields?.userName ?? ''}
            placeholder='Please add your name'
            className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200 text-sm'
          />
        </div>
        <div>
          <label
            htmlFor='phone'
            className='block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1'
          >
            Phone Number <span className='text-rose-500'>*</span>
          </label>
          <input
            type='tel'
            id='phone'
            name='phone'
            defaultValue={state?.fields?.phone ?? ''}
            placeholder='Phone number with country code'
            className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200 text-sm'
          />
        </div>
        <div>
          <label
            htmlFor='comment'
            className='block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1'
          >
            Special Requests / Comments
          </label>
          <textarea
            id='comment'
            name='comment'
            rows={3}
            defaultValue={state?.fields?.comment ?? ''}
            placeholder='Any specific preferences or notes for your stay...'
            className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200 text-sm resize-none'
          />
        </div>
      </div>
      <button
        type='submit'
        className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-100 transition-all duration-150 text-sm tracking-wide mt-2'
      >
        Confirm Booking
      </button>
    </form>
  );
};

export default ConfirmBookingForm;
