'use client';

import { toast } from 'sonner';
import cancelBooking from '@/lib/actions/cancelBooking';
import { useRouter } from 'next/navigation';

const CancelBookingButton = ({ bookingId }) => {
  const router = useRouter();

  const handleCancelBooking = () => {
    toast('Are you sure you want to cancel this booking?', {
      action: {
        label: 'Confirm',
        onClick: async () => {
          try {
            const result = await cancelBooking(bookingId);

            if (result.success) {
              toast.success('Booking cancelled successfully!');
              router.push('/admin');
            } else {
              toast.error(result.error || 'Failed to cancel booking');
            }
          } catch (error) {
            console.error('Failed to cancel booking:', error);
            toast.error('Failed to cancel booking');
          }
        },
      },
      cancel: {
        label: 'Cancel',
        onClick: () => toast('Booking cancellation aborted'),
      },
    });
  };

  return (
    <button
      className='rounded-md bg-red-50 px-2 py-1 text-sm font-medium text-red-700 inset-ring inset-ring-red-600/10 cursor-pointer hover:bg-red-100'
      onClick={handleCancelBooking}
    >
      Cancel
    </button>
  );
};

export default CancelBookingButton;
