'use server';

import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';
import { ID } from 'node-appwrite';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import checkAuth from './checkAuth';
import { sendBookingRequestConfirmation } from '@/email';

async function createBooking(previousState, formData) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('appwrite-session');

  if (!sessionCookie) {
    redirect('/login');
  }
  const apartmentName = formData.get('apartment_name');
  const adults = formData.get('adults');
  const children = formData.get('children');
  const adultsNum = Number(adults) || 0;
  const childrenNum = Number(children) || 0;
  const checkIn = formData.get('check_in');
  const checkOut = formData.get('check_out');
  const totalGuests = adultsNum + childrenNum;
  const totalGuesteStr = totalGuests.toString();
  const totalPrice = formData.get('total_price');
  const totalNights = formData.get('total_nights');
  const userName = formData.get('user_name');
  const phone = formData.get('phone');
  const comment = formData.get('comment');
  const guests = formData.get('guests');
  const maxGuests = Number(guests) || 0;
  if (!adults) {
    return {
      error: 'Please enter number of guests',
      fields: {
        adults,
        userName,
        phone,
        comment,
        children,
      },
    };
  }

  if (!userName) {
    return {
      error: 'Please enter your name',
      fields: {
        adults,
        userName,
        phone,
        comment,
        children,
      },
    };
  }

  if (!phone) {
    return {
      error: 'Please enter your phone number',
      fields: {
        adults,
        userName,
        phone,
        comment,
        children,
      },
    };
  }

  if (totalGuests > maxGuests) {
    return {
      error: 'Too many guests for this apartment',
      fields: {
        adults,
        userName,
        phone,
        comment,
      },
    };
  }

  try {
    const { tablesDB } = await createSessionClient(sessionCookie.value);

    // Get user's ID
    const { user } = await checkAuth();

    if (!user) {
      return {
        error: 'You must be logged in to book a room',
      };
    }

    // Create booking
    const booking = await tablesDB.createRow(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      ID.unique(),
      {
        apartment_id: formData.get('apartment_id'),
        apartment_name: apartmentName,
        check_in: checkIn,
        check_out: checkOut,
        total_nights: totalNights,
        total_price: totalPrice,
        user_id: user.id,
        user_name: userName,
        user_email: user.email,
        adults,
        children,
        total_guests: totalGuesteStr,
        user_phone: phone,
        comment,
      },
    );
    sendBookingRequestConfirmation({ booking });
    // cookieStore.delete('appwrite-booking');
    revalidatePath('/bookings', 'layout');
    return {
      success: true,
      id: booking.$id,
    };
  } catch (error) {
    console.log('Failed to book apartment', error);
    return {
      error: 'Something went wrong',
      fields: {
        adults,
        userName,
        phone,
        comment,
        children,
      },
    };
  }
}

export default createBooking;
