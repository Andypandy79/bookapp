'use client';

import { toast } from 'sonner';
import confirmBooking from '@/lib/actions/confirmBooking';
import { useRouter } from 'next/navigation';

const ConfirmBookingButton = ({ bookingId }) => {
  const router = useRouter();

  const handleConfirmBooking = () => {
    toast('Are you sure you want to confirm this booking?', {
      action: {
        label: 'Confirm',
        onClick: async () => {
          try {
            const result = await confirmBooking(bookingId);

            if (result.success) {
              toast.success('Booking confirmed!');
              router.push('/admin/bookings');
            } else {
              toast.error(result.error || 'Failed to confirm booking');
            }
          } catch (error) {
            console.error('Failed to confirm booking:', error);
            toast.error('Failed to confirm booking');
          }
        },
      },
      cancel: {
        label: 'Cancel',
        onClick: () => toast('Booking confirmation aborted'),
      },
    });
  };

  return (
    <button
      className='rounded-md bg-green-50 px-2 py-1 mb-3 text-sm font-medium text-green-700 inset-ring inset-ring-green-600/10 cursor-pointer hover:bg-green-100'
      onClick={handleConfirmBooking}
    >
      Confirm
    </button>
  );
};

export default ConfirmBookingButton;
