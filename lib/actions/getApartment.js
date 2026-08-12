'use server';

import { createAdminClient } from '@/config/appwrite';
import { redirect } from 'next/navigation';

async function getApartment(id) {
  try {
    const { tablesDB } = await createAdminClient();

    // Fetch apartments
    const apartment = await tablesDB.getRow(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_APARTMENTS,
      id,
    );
    return {
      id: apartment.$id,
      name: apartment.name,
      city: apartment.city,
      size: apartment.size,
      guests: apartment.guests,
      price: apartment.price,
      image: apartment.image,
      title: apartment.title,
      description: apartment.description,
      amenities: apartment.amenities,
    };
  } catch (error) {
    console.log('Failed to get apartment', error);
    redirect('/error');
  }
}

export default getApartment;
