import Image from 'next/image';
import { formatDate, formatPrice } from '@/lib/utils';
import ConfirmBookingButton from './ConfirmBookingButton';
import CancelBookingButton from './CancelBookingButton';

const AdminBookedApartment = ({ booking }) => {
  return (
    <div className='bg-white shadow rounded-lg p-4 mt-4 grid grid-cols-1 gap-4 sm:grid-cols-4 justify-between items-center text-center'>
      <div className='sm:col-span-2 md:col-span-1'>
        <h4 className='text-base font-bold text-blue-700 uppercase tracking-tight'>
          {booking.apartmentName}
        </h4>
        <h6 className='text-base font-bold text-slate-600 uppercase tracking-tight'>
          {booking.apartmentCity}
        </h6>
        <div className=''>
          <p>
            <span className='font-semibold text-slate-400 text-xs uppercase tracking-wider mr-1'>
              Check In:
            </span>
            <span className='font-medium text-sm text-slate-500'>
              {formatDate(booking.checkIn)}
            </span>
          </p>
          <p>
            <span className='font-semibold text-slate-400 text-xs uppercase tracking-wider mr-1'>
              Check Out:
            </span>
            <span className='font-medium text-sm text-slate-500'>
              {formatDate(booking.checkOut)}
            </span>
          </p>
          <p>
            <span className='font-semibold text-slate-400 text-xs uppercase tracking-wider mr-1'>
              Nights:
            </span>
            <span className='font-medium text-sm text-slate-500'>
              {booking.totalNights}
            </span>
          </p>
        </div>
      </div>
      <div className='sm:col-span-2 md:col-span-1 text-center'>
        <p>
          <span className='font-semibold text-slate-400 text-xs uppercase tracking-wider mr-1'>
            Guest:
          </span>
          <span className='font-medium text-sm text-slate-500'>
            {booking.totalGuests}
          </span>
        </p>
        <p>
          <span className='font-semibold text-slate-400 text-xs uppercase tracking-wider mr-1'>
            Adult:
          </span>
          <span className='font-medium text-sm text-slate-500'>
            {booking.adults}
          </span>
        </p>
        {booking.children && (
          <p>
            <span className='font-semibold text-slate-400 text-xs uppercase tracking-wider mr-1'>
              Child:
            </span>
            <span className='font-medium text-sm text-slate-500'>
              {booking.children}
            </span>
          </p>
        )}
        <p>
          <span className='font-semibold text-slate-400 text-xs uppercase tracking-wider mr-1'>
            Night:
          </span>
          <span className='font-medium text-sm text-slate-500'>
            {formatPrice(booking.price)}
          </span>
        </p>
        <p>
          <span className='font-semibold text-slate-400 text-xs uppercase tracking-wider mr-1'>
            Price:
          </span>
          <span className='font-bold text-blue-600 text-base'>
            {formatPrice(booking.totalPrice)}
          </span>
        </p>
      </div>
      <div className='sm:col-span-2 md:col-span-1 justify-self-center'>
        <p>
          <span className='font-semibold text-slate-500 text-xs uppercase tracking-wider'>
            {booking.userName}
          </span>
        </p>
        <p>
          <span className='font-semibold text-slate-500 text-xs uppercase tracking-wider'>
            {booking.userPhone}
          </span>
        </p>
        <p>
          <span className='font-semibold text-slate-500 text-xs uppercase tracking-wider'>
            {booking.userEmail}
          </span>
        </p>

        <p>
          <span className='font-semibold text-slate-400 text-xs uppercase tracking-wider mr-1'>
            Booked:
          </span>
          <span className='font-medium text-sm text-slate-500'>
            {formatDate(booking.createdAt)}
          </span>
        </p>
      </div>
      <div className='sm:col-span-2 md:col-span-1 flex flex-col items-center'>
        {booking.confirmed ? (
          <span className='rounded-md bg-green-50 px-2 py-1 mb-3 text-sm font-medium text-green-700 inset-ring inset-ring-green-600/10'>
            Confirmed
          </span>
        ) : (
          <span className='rounded-md bg-red-50 px-2 py-1 mb-3 text-sm font-medium text-red-700 inset-ring inset-ring-red-600/10'>
            Pending
          </span>
        )}

        {!booking.confirmed && <ConfirmBookingButton bookingId={booking.id} />}
        <CancelBookingButton bookingId={booking.id} />
      </div>
      {booking.comment && (
        <div className='text-center sm:col-span-4 md:text-left bg-slate-50/50 p-4 rounded-xl border border-slate-100/80'>
          <span className='block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1.5'>
            Comment
          </span>
          <p className='text-sm text-slate-600 leading-relaxed'>
            {booking.comment}
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminBookedApartment;
