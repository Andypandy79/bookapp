'use server';

import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import checkAuth from './checkAuth';

async function getBookingCookies(previousState, formData) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('appwrite-session');
  if (!sessionCookie) {
    return {
      error: 'Session information not found.',
    };
  }
  const bookingCookie = cookieStore.get('appwrite-booking');
  //   if (!bookingCookies) {
  //     redirect('/');
  //   }
  if (!bookingCookie) {
    return {
      error: 'Booking information not found.',
    };
  }
  const booking = JSON.parse(bookingCookie.value);
  try {
    // Get user's ID
    const { user } = await checkAuth();

    if (!user) {
      return {
        error: 'You must be logged in to book apartment',
      };
    }

    const { tablesDB } = await createSessionClient(sessionCookie.value);

    // Fetch apartment
    const apartmentData = await tablesDB.getRow(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_APARTMENTS,
      booking.apartmentId,
    );
    const apartment = {
      id: apartmentData.$id,
      name: apartmentData.name,
      city: apartmentData.city,
      size: apartmentData.size,
      guests: apartmentData.guests,
      price: apartmentData.price,
      image: apartmentData.image,
      title: apartmentData.title,
      description: apartmentData.description,
      amenities: apartmentData.amenities,
    };

    return {
      success: true,
      booking,
      apartment,
    };
  } catch (error) {
    console.error(error);
    return {
      error: 'Something went wrong booking apartment',
    };
  }
}

export default getBookingCookies;
