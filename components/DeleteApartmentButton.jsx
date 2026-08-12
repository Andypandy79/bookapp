'use client';

import { toast } from 'sonner';
import deleteApartment from '@/lib/actions/deleteApartment';
import { useRouter } from 'next/navigation';

const DeleteApartmentButton = ({ apartmentId }) => {
  const router = useRouter();

  const handleDeleteApartment = () => {
    toast('Are you sure you want to delete this apartment?', {
      action: {
        label: 'Confirm',
        onClick: async () => {
          try {
            const result = await deleteApartment(apartmentId);

            if (result.success) {
              toast.success('Apartment deleted successfully!');
              router.push('/admin/apartments');
            } else {
              toast.error(result.error || 'Failed to delete apartment');
            }
          } catch (error) {
            console.error('Failed to delete apartment:', error);
            toast.error('Failed to delete apartment');
          }
        },
      },
      cancel: {
        label: 'Cancel',
        onClick: () => toast('Apartment deletion aborted'),
      },
    });
  };

  return (
    <button
      className='rounded-md bg-red-50 px-2 py-1 text-sm font-medium text-red-700 inset-ring inset-ring-red-600/10 cursor-pointer hover:bg-red-100'
      onClick={handleDeleteApartment}
    >
      Delete
    </button>
  );
};

export default DeleteApartmentButton;
