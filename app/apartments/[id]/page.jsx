import Heading from '@/components/Heading';
import Link from 'next/link';
import Image from 'next/image';
import { FaChevronLeft } from 'react-icons/fa';
import getApartment from '@/lib/actions/getApartment';
import { formatPrice } from '@/lib/utils';
import BookingForm from '@/components/BookingForm';
// import Book from '@/components/Book';

const ApartmentPage = async ({ params }) => {
  const { id } = await params;
  const apartment = await getApartment(id);

  if (!apartment) {
    return <Heading title='Apartment not found' />;
  }

  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_APARTMENTS_STORAGE_BUCKET;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

  const imageUrl = `https://fra.cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${apartment.image}/view?project=${projectId}`;

  const imageSrc = apartment.image ? imageUrl : '/images/no-image.jpg';
  const parseApartment = JSON.parse(JSON.stringify(apartment));
  return (
    <>
      <Heading title={apartment.name} />
      <div className='bg-white shadow rounded-lg p-4 mt-4'>
        <Link
          href='/'
          className='inline-flex items-center text-xs font-bold text-slate-500 hover:text-blue-600 uppercase tracking-wide mb-6 group transition-colors duration-200'
        >
          <FaChevronLeft className='mr-1.5 transform group-hover:-translate-x-0.5 transition-transform duration-150' />
          <span>Back</span>
        </Link>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3 items-center '>
          <div className='md:col-span-2'>
            <Image
              src={imageSrc}
              width={400}
              height={100}
              alt={apartment.name}
              className='w-full mb-3 sm:mb-0 object-cover rounded-lg'
            />
          </div>
          <div className='text-center'>
            <h4 className='text-lg font-bold text-blue-700 tracking-tight'>
              {apartment.name.toUpperCase()}
            </h4>

            <div className=''>
              <p>
                <span className='font-semibold text-slate-400 text-xs uppercase tracking-wider mr-1'>
                  City:
                </span>
                <span className='font-medium text-slate-500'>
                  {apartment.city}
                </span>
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
            {apartment.amenities ? (
              <div className='text-center md:text-left  bg-slate-50/50 p-4 mt-4 rounded-xl border border-slate-100/80'>
                <span className='block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1.5'>
                  Amenities
                </span>
                <p className='text-sm text-slate-600 leading-relaxed'>
                  {apartment.amenities}
                </p>
              </div>
            ) : null}
          </div>
          <div className='md:col-span-3 text-center md:text-left  bg-slate-50/50 p-4 rounded-xl border border-slate-100/80'>
            <span className='block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1.5'>
              Description
            </span>
            <p className='text-sm text-slate-600 leading-relaxed'>
              {apartment.description}
            </p>
          </div>

          <div className='md:col-span-3'>
            <BookingForm apartment={apartment} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ApartmentPage;
