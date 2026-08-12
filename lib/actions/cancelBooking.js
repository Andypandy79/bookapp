'use server';

import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import checkAuth from './checkAuth';

async function cancelBooking(bookingId) {
  const sessionCookie = (await cookies()).get('appwrite-session');
  if (!sessionCookie) {
    redirect('/login');
  }

  try {
    // Get user's ID
    const { isAdmin } = await checkAuth();

    if (!isAdmin) {
      return {
        error: 'You are not authorized to confirm this booking',
      };
    }
    const { tablesDB } = await createSessionClient(sessionCookie.value);
    // Get the booking
    const booking = await tablesDB.getRow(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      bookingId,
    );

    // Delete booking
    await tablesDB.deleteRow(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      bookingId,
    );

    return {
      success: true,
    };
  } catch (error) {
    console.log('Failed to cancel booking', error);
    return {
      error: 'Failed to cancel booking',
    };
  }
}

export default cancelBooking;
