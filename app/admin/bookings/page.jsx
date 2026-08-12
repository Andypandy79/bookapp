import Heading from '@/components/Heading';
import getAllBookings from '@/lib/actions/getAllBookings';
import BoookingsFilter from '@/components/BookingsFilter';
const AdminBookingPage = async () => {
  const bookings = await getAllBookings();

  return (
    <>
      <Heading title='Bookings' />
      {bookings.length > 0 ? (
        <BoookingsFilter bookings={bookings} />
      ) : (
        <p className='text-gray-600 mt-4'>You don't have any bookings yet</p>
      )}
    </>
  );
};

export default AdminBookingPage;
