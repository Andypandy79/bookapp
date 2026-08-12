import Image from 'next/image';
import { formatDate, formatPrice } from '@/lib/utils';

const BookedApartmentCard = ({ booking }) => {
  const { apartment_id: apartment } = booking;
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_APARTMENTS_STORAGE_BUCKET;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

  const imageUrl = `https://fra.cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${apartment.image}/view?project=${projectId}`;

  const imageSrc = apartment.image ? imageUrl : '/images/no-image.jpg';

  return (
    <div className='bg-white shadow rounded-lg p-4 mt-4 grid grid-cols-1 gap-4 md:grid-cols-3 justify-between items-start sm:items-center'>
      <div className='col-span-1'>
        <Image
          src={imageSrc}
          width={400}
          height={100}
          alt={booking.apartment_name}
          className='w-full mb-3 sm:mb-0 object-cover rounded-lg'
        />
      </div>
      <div className='col-span-1 space-y-1 text-center'>
        <h4 className='text-lg font-bold text-blue-700 uppercase tracking-tight'>
          {booking.apartment_name}
        </h4>

        <div className=''>
          <h4 className='font-semibold text-slate-600 text-sm uppercase tracking-wider'>
            {apartment.city}
          </h4>
          <p>
            <span className='font-semibold text-slate-400 text-xs uppercase tracking-wider mr-1'>
              Check In:
            </span>
            <span className='font-medium text-sm text-slate-500'>
              {formatDate(booking.check_in)}
            </span>
          </p>
          <p>
            <span className='font-semibold text-slate-400 text-xs uppercase tracking-wider mr-1'>
              Check Out:
            </span>
            <span className='font-medium text-sm text-slate-500'>
              {formatDate(booking.check_out)}
            </span>
          </p>

          <p>
            <span className='font-semibold text-slate-400 text-xs uppercase tracking-wider mr-1'>
              Guests:
            </span>
            <span className='font-medium text-sm text-slate-500'>
              {parseInt(booking.adults || 0, 10) +
                parseInt(booking.children || 0, 10)}
            </span>
          </p>
          <p>
            <span className='font-semibold text-slate-400 text-xs uppercase tracking-wider mr-1'>
              Nights:
            </span>
            <span className='font-medium text-sm text-slate-500'>
              {booking.total_nights}
            </span>
          </p>
          <p>
            <span className='font-semibold text-slate-400 text-xs uppercase tracking-wider mr-1'>
              Price:
            </span>
            <span className='font-bold text-blue-600 text-base'>
              {formatPrice(booking.total_price)}
            </span>
          </p>
        </div>
      </div>
      <div className='col-span-1 justify-self-center'>
        {booking.confirmed ? (
          <span className='inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm font-medium text-green-700 inset-ring inset-ring-green-600/20'>
            Confirmed
          </span>
        ) : (
          <span className='inline-flex items-center rounded-md bg-red-50 px-2 py-1 my-2 text-sm font-medium text-red-700 inset-ring inset-ring-red-600/10'>
            Pending
          </span>
        )}
      </div>
      {booking.comment && (
        <div className='text-center md:col-span-3 md:text-left bg-slate-50/50 p-4 rounded-xl border border-slate-100/80'>
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

export default BookedApartmentCard;
