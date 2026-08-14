'use server';

import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import checkAuth from './checkAuth';
import { sendBookingConfirmation } from '@/email';

async function confirmBooking(bookingId) {
  const sessionCookie = (await cookies()).get('appwrite-session');
  if (!sessionCookie) {
    redirect('/login');
  }

  try {
    const { isAdmin } = await checkAuth();

    if (!isAdmin) {
      redirect('/');
    }

    const { tablesDB } = await createSessionClient(sessionCookie.value);

    // Get the booking
    const booking = await tablesDB.updateRow(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      bookingId,
      {
        confirmed: true,
      },
    );
    revalidatePath('/bookings', 'layout');
    revalidatePath('/admin/bookings', 'layout');
    sendBookingConfirmation({ booking });

    return {
      success: true,
    };
  } catch (error) {
    console.log('Failed to confirm booking', error);
    return {
      error: 'Failed to confirm booking',
    };
  }
}

export default confirmBooking;
