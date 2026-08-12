'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useActionState } from 'react';
import { toast } from 'sonner';
import createApartment from '@/lib/actions/createApartment';

const AdminAddApartment = () => {
  const [state, formAction] = useActionState(createApartment, {});
  const router = useRouter();

  useEffect(() => {
    if (state.error) toast.error(state.error);

    if (state.success) {
      toast.success('Great news! Added new apartment successfully');
      router.push('/admin/apartments');
    }
  }, [state]);

  return (
    <div className='max-w-md mx-auto my-10 bg-white rounded-2xl shadow-xl border border-blue-50/50 overflow-hidden'>
      <div className='bg-blue-600 px-6 py-4 text-white'>
        <h2 className='text-xl font-bold tracking-tight'>Add Apartment</h2>
        <p className='text-xs text-blue-100 mt-1'>
          Please add all apartment details and confirm.
        </p>
      </div>
      <form action={formAction} className='p-6 mt-4 space-y-6'>
        <div>
          <label
            htmlFor='user_name'
            className='block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1'
          >
            Your Name <span className='text-rose-500'>*</span>
          </label>
          <input
            type='text'
            id='user_name'
            name='user_name'
            defaultValue={state?.fields?.userName ?? ''}
            placeholder='Please add your name'
            className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200 text-sm'
          />
        </div>
        <div>
          <label
            htmlFor='name'
            className='block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1'
          >
            Apartment Name <span className='text-rose-500'>*</span>
          </label>
          <input
            type='text'
            id='name'
            name='name'
            defaultValue={state?.fields?.name ?? ''}
            placeholder='Please add apartment name'
            className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200 text-sm'
          />
        </div>
        <div>
          <label
            htmlFor='city'
            className='block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1'
          >
            City <span className='text-rose-500'>*</span>
          </label>
          <input
            type='text'
            id='city'
            name='city'
            defaultValue={state?.fields?.city ?? ''}
            placeholder='Please add city'
            className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200 text-sm'
          />
        </div>
        <div>
          <label
            htmlFor='bedrooms'
            className='block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1'
          >
            Bedrooms <span className='text-rose-500'>*</span>
          </label>
          <input
            type='number'
            id='bedrooms'
            name='bedrooms'
            defaultValue={state?.fields?.bedrooms ?? ''}
            placeholder='Please add number of bedrooms'
            className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200 text-sm'
          />
        </div>
        <div>
          <label
            htmlFor='guests'
            className='block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1'
          >
            Guests <span className='text-rose-500'>*</span>
          </label>
          <input
            type='number'
            id='guests'
            name='guests'
            defaultValue={state?.fields?.guests ?? ''}
            placeholder='Please add number of guests'
            className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200 text-sm'
          />
        </div>
        <div>
          <label
            htmlFor='price'
            className='block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1'
          >
            Price <span className='text-rose-500'>*</span>
          </label>
          <input
            type='number'
            id='price'
            name='price'
            defaultValue={state?.fields?.price ?? ''}
            placeholder='Please add price per night'
            className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200 text-sm'
          />
        </div>
        <div>
          <label
            htmlFor='size'
            className='block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1'
          >
            Size<span className='text-rose-500'>*</span>
          </label>
          <input
            type='number'
            id='size'
            name='size'
            defaultValue={state?.fields?.size ?? ''}
            placeholder='Please add size in square meters'
            className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200 text-sm'
          />
        </div>
        <div>
          <label
            htmlFor='amenities'
            className='block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1'
          >
            Amenities <span className='text-rose-500'>*</span>
          </label>
          <input
            type='text'
            id='amenities'
            name='amenities'
            defaultValue={state?.fields?.amenities ?? ''}
            placeholder='Amenities (Wi-Fi, pools, or parking, etc.)'
            className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200 text-sm'
          />
        </div>
        <div>
          <label
            htmlFor='title'
            className='block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1'
          >
            Title <span className='text-rose-500'>*</span>
          </label>
          <textarea
            id='title'
            name='title'
            rows={3}
            defaultValue={state?.fields?.title ?? ''}
            placeholder='Please add short title for the apartment'
            className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200 text-sm resize-none'
          />
        </div>
        <div>
          <label
            htmlFor='description'
            className='block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1'
          >
            Description <span className='text-rose-500'>*</span>
          </label>
          <textarea
            id='description'
            name='description'
            rows={3}
            defaultValue={state?.fields?.description ?? ''}
            placeholder='Please add full description of the apartment'
            className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200 text-sm resize-none'
          />
        </div>
        <div>
          <label
            htmlFor='image'
            className='block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1'
          >
            Image
          </label>
          <input
            type='file'
            id='image'
            name='image'
            // defaultValue={state?.fields?.userName ?? ''}
            placeholder='Please add image'
            className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200 text-sm'
          />
        </div>
        <button
          type='submit'
          className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-100 transition-all duration-150 text-sm tracking-wide mt-2'
        >
          Confirm
        </button>
      </form>
    </div>
  );
};

export default AdminAddApartment;
