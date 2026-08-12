import Heading from '@/components/Heading';
import AdminApartmentCard from '@/components/AdminApartmentCard';
import getAllApartments from '@/lib/actions/getAllApartments';

const AdminApartmentPage = async () => {
  const apartments = await getAllApartments();
  return (
    <>
      <Heading title='Apartments' />
      {apartments.length > 0 ? (
        apartments.map((apartment) => (
          <AdminApartmentCard key={apartment.$id} apartment={apartment} />
        ))
      ) : (
        <p>No apartments available at the moment</p>
      )}
    </>
  );
};

export default AdminApartmentPage;
