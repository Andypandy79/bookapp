import getApartmentsId from '@/lib/actions/getApartmentsId';
import AdminBookingForm from '@/components/AdminBookingForm';

const AdminAddBookingPage = async () => {
  const apartments = await getApartmentsId();
  return (
    <div className='max-w-md mx-auto my-10 bg-white rounded-2xl shadow-xl border border-blue-50/50 overflow-hidden'>
      <div className='bg-blue-600 px-6 py-4 text-white'>
        <h2 className='text-xl font-bold tracking-tight'>Add Booking</h2>
        <p className='text-xs text-blue-100 mt-1'>
          Please add all booking details and confirm.
        </p>
      </div>
      <AdminBookingForm apartments={apartments} />
    </div>
  );
};

export default AdminAddBookingPage;
