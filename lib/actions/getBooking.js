'use server';

import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';
import { Query } from 'node-appwrite';
import { redirect } from 'next/navigation';
import checkAuth from './checkAuth';

async function getBooking() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('appwrite-session');
  if (!sessionCookie) {
    redirect('/login');
  }

  try {
    const { user } = await checkAuth();

    if (!user) {
      return {
        error: 'You must be logged in to view bookings',
      };
    }
    const { tablesDB } = await createSessionClient(sessionCookie.value);

    // Fetch users bookings
    const bookings = await tablesDB.listRows(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      //   [Query.equal('user_id', user.id)],
      [
        Query.equal('user_id', user.id),
        Query.select(['*', 'apartment_id.image', 'apartment_id.city']),
        Query.orderAsc('check_in'),
      ],
    );

    return bookings.rows;
  } catch (error) {
    console.log('Failed to get user bookings', error);
    return {
      error: 'Failed to get bookings',
    };
  }
}

export default getBooking;
