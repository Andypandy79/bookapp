'use server';

import { createAdminClient } from '@/config/appwrite';
import { redirect } from 'next/navigation';

async function getAllApartments() {
  try {
    const { tablesDB } = await createAdminClient();

    // Fetch apartments
    const apartments = await tablesDB.listRows(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_APARTMENTS,
    );
    return apartments.rows;
  } catch (error) {
    console.log('Failed to get apartments', error);
    redirect('/error');
  }
}

export default getAllApartments;
