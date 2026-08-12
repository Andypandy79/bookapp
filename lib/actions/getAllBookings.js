'use server';

import { createSessionClient, Query } from '@/config/appwrite';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import checkAuth from './checkAuth';

async function getAllBookings() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('appwrite-session');
  if (!sessionCookie) {
    redirect('/login');
  }

  const { isAdmin } = await checkAuth();

  if (!isAdmin) {
    redirect('/');
  }

  try {
    const { tablesDB } = await createSessionClient(sessionCookie.value);

    // Fetch users bookings
    const bookings = await tablesDB.listRows(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      [
        Query.select([
          '*',
          'apartment_id.name',
          'apartment_id.city',
          'apartment_id.price',
        ]),
        Query.orderAsc('check_in'),
      ],
    );
    return bookings.rows.map((booking) => ({
      id: booking.$id,
      userId: booking.user_id,
      apartmentId: booking.apartment_id.$id,
      apartmentName: booking.apartment_id.name,
      apartmentCity: booking.apartment_id.city,
      price: booking.apartment_id.price,
      totalPrice: booking.total_price,
      checkIn: booking.check_in,
      checkOut: booking.check_out,
      totalNights: booking.total_nights,
      adults: booking.adults,
      children: booking.children,
      totalGuests: booking.total_guests,
      confirmed: booking.confirmed,
      comment: booking.comment,
      userName: booking.user_name,
      userEmail: booking.user_email,
      userPhone: booking.user_phone,
      createdAt: booking.$createdAt,
    }));
  } catch (error) {
    console.log('Failed to get user bookings', error);
    return {
      error: 'Failed to get bookings',
    };
  }
}

export default getAllBookings;
