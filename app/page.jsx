import Heading from '@/components/Heading';
import ApartmentCard from '@/components/ApartmentCard';
import getAllApartments from '@/lib/actions/getAllApartments';

const HomePage = async () => {
  const apartments = await getAllApartments();
  return (
    <>
      <Heading title='Available Apartments' />
      {apartments.length > 0 ? (
        apartments.map((apartment) => (
          <ApartmentCard key={apartment.$id} apartment={apartment} />
        ))
      ) : (
        <p>No apartments available at the moment</p>
      )}
    </>
  );
};

export default HomePage;
