import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';

const ApartmentCard = ({ apartment }) => {
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_APARTMENTS_STORAGE_BUCKET;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

  const imageUrl = `https://fra.cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${apartment.image}/view?project=${projectId}`;

  const imageSrc = apartment.image ? imageUrl : '/images/no-image.jpg';

  return (
    <div className='bg-white shadow rounded-lg p-4 mt-4 grid grid-cols-1 gap-4 md:grid-cols-12 justify-between items-start sm:items-center'>
      <div className='md:col-span-3'>
        <Image
          src={imageSrc}
          width={400}
          height={100}
          alt={apartment.name}
          className='w-full mb-3 sm:mb-0 object-cover rounded-lg'
        />
      </div>
      <div className='space-y-1 md:col-span-3 text-center'>
        <h4 className='text-lg font-bold text-blue-700 tracking-tight'>
          {apartment.name.toUpperCase()}
        </h4>

        <div className=''>
          <p>
            <span className='font-semibold text-slate-400 text-xs uppercase tracking-wider mr-1'>
              City:
            </span>
            <span className='font-medium text-slate-500'>{apartment.city}</span>
          </p>
          <p>
            <span className='font-semibold text-slate-400 text-xs uppercase tracking-wider mr-1'>
              Size:
            </span>
            <span className='font-medium text-sm text-slate-500'>
              {apartment.size} m<sup className='text-xs'>2</sup>
            </span>
          </p>
          <p>
            <span className='font-semibold text-slate-400 text-xs uppercase tracking-wider mr-1'>
              Guests:
            </span>
            <span className='font-medium text-sm text-slate-500'>
              {apartment.guests}
            </span>
          </p>
          <p>
            <span className='font-semibold text-slate-400 text-xs uppercase tracking-wider mr-1'>
              Price:
            </span>
            <span className='font-bold text-blue-600 text-base'>
              {formatPrice(apartment.price)}
            </span>
            <span className='text-xs text-slate-500'> / night</span>
          </p>
        </div>
      </div>
      <div className='text-center md:text-left md:col-span-4 bg-slate-50/50 p-4 rounded-xl border border-slate-100/80'>
        <p className='text-sm text-slate-600 leading-relaxed'>
          {apartment.title}
        </p>
      </div>
      <div className='md:col-span-2 md:justify-self-center'>
        <Link
          href={`/apartments/${apartment.$id}`}
          className='inline-block w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-100 transition-all duration-150 text-sm tracking-wide text-center'
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default ApartmentCard;
