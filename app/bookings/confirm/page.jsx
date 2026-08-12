import getBookingCookies from '@/lib/actions/getBookingCookies';
import ConfirmBookingForm from '@/components/ConfirmBookingForm';

const ConfirmPage = async () => {
  const data = await getBookingCookies();
  const { booking, apartment } = data;

  // const parseApartment = JSON.parse(JSON.stringify(apartment || {}));
  return (
    <>
      {apartment || booking ? (
        <div className='max-w-md mx-auto my-10 bg-white rounded-2xl shadow-xl border border-blue-50/50 overflow-hidden'>
          <div className='bg-blue-600 px-6 py-4 text-white'>
            <h2 className='text-xl font-bold tracking-tight'>
              Booking Request Summary
            </h2>
            <p className='text-xs text-blue-100 mt-1'>
              Review your details and complete booking request
            </p>
          </div>
          <h2 className='text-xl text-center tracking-tight pt-6'>
            {apartment.name.toUpperCase()}
          </h2>
          <ConfirmBookingForm booking={booking} apartment={apartment} />
        </div>
      ) : (
        <p className='text-center text-slate-600'>No booking data available.</p>
      )}
    </>
  );
};

export default ConfirmPage;
