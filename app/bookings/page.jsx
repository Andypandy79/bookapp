import Heading from '@/components/Heading';
import BookedApartmentCard from '@/components/BookedApartmentCard';
import getBooking from '@/lib/actions/getBooking';

const BookingsPage = async () => {
  const bookings = await getBooking();
  return (
    <>
      <Heading title='My Bookings' />
      {bookings.map((booking) => (
        <BookedApartmentCard key={booking.$id} booking={booking} />
      ))}
    </>
  );
};

export default BookingsPage;
