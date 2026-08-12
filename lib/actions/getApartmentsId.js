'use server';

import { createAdminClient, Query } from '@/config/appwrite';
import { redirect } from 'next/navigation';

async function getApartmentsId() {
  try {
    const { tablesDB } = await createAdminClient();

    // Fetch apartments
    const apartments = await tablesDB.listRows(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_APARTMENTS,
      [Query.select(['$id', 'name', 'price', 'guests'])],
    );
    const apartmentsDetails = apartments.rows.map((apartment) => ({
      id: apartment.$id,
      name: apartment.name,
      price: apartment.price,
      guests: apartment.guests,
    }));

    return apartmentsDetails;
  } catch (error) {
    console.log('Failed to get apartments', error);
    redirect('/error');
  }
}

export default getApartmentsId;
