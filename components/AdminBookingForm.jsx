'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useActionState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';
import createAdminBooking from '@/lib/actions/createAdminBooking';

const AdminBookingForm = ({ apartments }) => {
  const [tempStart, setTempStart] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [isChecked, setIsChecked] = useState(true);
  const [sendConfirmation, setSendConfirmation] = useState(false);
  const [formVersion, setFormVersion] = useState(0);

  const [state, formAction] = useActionState(createAdminBooking, {
    fields: {},
  });
  const router = useRouter();

  const selectedApartment = apartments.find(
    (apartment) => apartment.id === selectedId,
  );

  const nights =
    checkIn && checkOut
      ? Math.max(
          0,
          (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24),
        )
      : 0;

  useEffect(() => {
    if (selectedApartment && nights > 0) {
      setTotalPrice(String(selectedApartment.price * nights));
    }
  }, [selectedId, nights]);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
      setSelectedId(state.fields?.apartmentId ?? '');
      setFormVersion((v) => v + 1);
    }
    if (state?.success) {
      toast.success('Apartment has been booked!');
      router.push('/admin/bookings');
    }
  }, [state, router]);

  const handleBlur = () => {
    setCheckIn(tempStart);

    if (checkOut && tempStart > checkOut) {
      setCheckOut('');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <form action={formAction} className='p-6 mt-4 space-y-6'>
      <div className='relative w-full'>
        <select
          key={formVersion} // remount instead of relying on the stale controlled value
          name='apartment_id'
          defaultValue={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className='w-full appearance-none px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-center text-sm'
        >
          <option value='' disabled>
            Select apartment
          </option>

          {apartments.map((apartment) => (
            <option key={apartment.id} value={apartment.id}>
              {apartment.name}
            </option>
          ))}
        </select>
        <FaChevronDown
          size={12}
          className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <input
          type='hidden'
          name='apartment_name'
          value={selectedApartment?.name ?? ''}
        />
        <input
          type='hidden'
          name='guests'
          value={selectedApartment?.guests ?? ''}
        />
        <input type='hidden' name='total_nights' value={nights ?? ''} />
        <div>
          <label
            htmlFor='check_in'
            className='block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1'
          >
            Check In <span className='text-rose-500'>*</span>
          </label>
          <input
            type='date'
            id='check_in'
            name='check_in'
            value={tempStart}
            onChange={(e) => setTempStart(e.target.value)}
            onBlur={handleBlur}
            min={today}
            className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200 text-sm'
          />
        </div>
        <div>
          <label
            htmlFor='check_out'
            className='block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1'
          >
            Check Out <span className='text-rose-500'>*</span>
          </label>
          <input
            type='date'
            id='check_out'
            name='check_out'
            value={checkOut}
            min={checkIn}
            // disabled={!checkIn}
            onChange={(e) => setCheckOut(e.target.value)}
            className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200 text-sm'
          />
        </div>
      </div>
      <div className='space-y-2 pt-2'>
        <div className='flex justify-between text-sm text-slate-600'>
          <span>Price per night</span>
          <span className='font-medium text-slate-800'>
            {selectedApartment?.price
              ? `${formatPrice(selectedApartment.price)}`
              : ''}
          </span>
        </div>
        <div className='flex justify-between text-sm text-slate-600'>
          <span>Total stay</span>
          <span className='font-medium text-slate-800'>
            {nights ? `${nights} nights` : ''}
          </span>
        </div>

        <hr className='border-slate-100 my-3' />
        <div className='grid grid-cols-2'>
          <label
            htmlFor='total_price'
            className='block text-sm font-bold text-blue-700 uppercase tracking-wide mt-2'
          >
            Total Price
          </label>
          <div className='relative'>
            <input
              type='text'
              id='total_price'
              name='total_price'
              value={totalPrice}
              onChange={(e) => setTotalPrice(e.target.value)}
              placeholder='Total price'
              className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-blue-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200 text-sm font-semibold'
            />
            {totalPrice && (
              <span className='absolute right-4 top-1/2 -translate-y-1/2 text-blue-700'>
                €
              </span>
            )}
          </div>
        </div>
      </div>
      <div className=' grid grid-cols-2 place-items-center'>
        <label
          htmlFor='confirmed'
          className='block text-xs font-bold text-slate-700 uppercase tracking-wide mt-1'
        >
          Confirm
        </label>
        <input
          id='confirmed'
          name='confirmed'
          type='checkbox'
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          className='w-4 h-4'
        />
      </div>
      <div className='grid grid-cols-2 place-items-center'>
        <label
          htmlFor='send_confirmation'
          className='block text-xs font-bold text-slate-700 uppercase tracking-wide mt-1'
        >
          Send booking confirmation
        </label>

        <input
          id='send_confirmation'
          name='send_confirmation'
          type='checkbox'
          checked={sendConfirmation}
          onChange={(e) => setSendConfirmation(e.target.checked)}
          className='w-4 h-4'
        />
      </div>
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
          htmlFor='user_email'
          className='block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1'
        >
          Email <span className='text-rose-500'>*</span>
        </label>
        <input
          type='user_email'
          name='user_email'
          defaultValue={state?.fields?.userEmail ?? ''}
          placeholder='Please add your email'
          className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200 text-sm'
        />
      </div>
      <div>
        <label
          htmlFor='user_phone'
          className='block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1'
        >
          Phone Number <span className='text-rose-500'>*</span>
        </label>
        <input
          type='tel'
          id='user_phone'
          name='user_phone'
          defaultValue={state?.fields?.userPhone ?? ''}
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
      <button
        type='submit'
        className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-100 transition-all duration-150 text-sm tracking-wide mt-2'
      >
        Confirm Booking
      </button>
    </form>
  );
};

export default AdminBookingForm;
