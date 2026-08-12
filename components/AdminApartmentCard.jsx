import Link from 'next/link';
import Image from 'next/image';
import { formatPrice, formatDate } from '@/lib/utils';
import DeleteApartmentButton from './DeleteApartmentButton';

const AdminApartmentCard = ({ apartment }) => {
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_APARTMENTS_STORAGE_BUCKET;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

  const imageUrl = `https://fra.cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${apartment.image}/view?project=${projectId}`;

  const imageSrc = apartment.image ? imageUrl : '/images/no-image.jpg';

  return (
    <div className='bg-white shadow rounded-lg p-4 mt-4 grid grid-col-1 gap-4 sm:grid-cols-4 justify-between items-start sm:items-center'>
      <div className='sm:col-span-4 md:col-span-1'>
        <Image
          src={imageSrc}
          width={400}
          height={100}
          alt={apartment.name}
          className='w-full mb-3 sm:mb-0 object-cover rounded-lg'
        />
      </div>
      <div className='sm:col-span-2 md:col-span-1 text-center'>
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
      <div className='sm:col-span-2 md:col-span-1 text-center'>
        <p>
          <span className='font-semibold text-slate-400 text-xs uppercase tracking-wider mr-1'>
            Owner:
          </span>
          <span className='font-medium text-slate-500'>
            {apartment.user_name}
          </span>
        </p>
        <p>
          <span className='font-semibold text-slate-400 text-xs uppercase tracking-wider mr-1'>
            Created:
          </span>
          <span className='font-medium text-slate-500'>
            {formatDate(apartment.$createdAt)}
          </span>
        </p>
        <p>
          <span className='font-semibold text-slate-400 text-xs uppercase tracking-wider mr-1'>
            Updated:
          </span>
          <span className='font-medium text-slate-500'>
            {formatDate(apartment.$updatedAt)}
          </span>
        </p>
      </div>
      <div className='flex flex-col gap-2 sm:col-span-4 md:col-span-1 md:justify-self-center'>
        <Link
          href={`/apartments/${apartment.$id}`}
          className='inline-block w-full md:w-auto rounded-md bg-blue-50 px-2 py-1 text-sm font-semibold tracking-wide text-center text-blue-700 inset-ring inset-ring-blue-600/10 cursor-pointer hover:bg-blue-100'
        >
          Edit
        </Link>
        <DeleteApartmentButton apartmentId={apartment.$id} />
      </div>
      <div className='sm:col-span-2 text-center sm:text-left  bg-slate-50/50 p-4 mt-4 rounded-xl border border-slate-100/80'>
        <span className='block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1.5'>
          Title
        </span>
        <p className='text-sm text-slate-600 leading-relaxed'>
          {apartment.title}
        </p>
      </div>
      <div className='sm:col-span-2 text-center sm:text-left  bg-slate-50/50 p-4 mt-4 rounded-xl border border-slate-100/80'>
        <span className='block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1.5'>
          Amenities
        </span>
        <p className='text-sm text-slate-600 leading-relaxed'>
          {apartment.amenities}
        </p>
      </div>
      <div className='sm:col-span-4 text-center sm:text-left  bg-slate-50/50 p-4 mt-4 rounded-xl border border-slate-100/80'>
        <span className='block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1.5'>
          Description
        </span>
        <p className='text-sm text-slate-600 leading-relaxed'>
          {apartment.description}
        </p>
      </div>
    </div>
  );
};

export default AdminApartmentCard;
