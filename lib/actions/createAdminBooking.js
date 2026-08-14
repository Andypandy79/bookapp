'use server';

import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';
import { ID } from 'node-appwrite';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import checkAuth from './checkAuth';
import { DateTime } from 'luxon';
import checkApartmentAvailability from './checkApartmentAvailability';
import { validateEmail } from '../utils';
import { sendBookingConfirmation } from '@/email';

async function createAdminBooking(previousState, formData) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('appwrite-session');
  if (!sessionCookie) {
    redirect('/login');
  }

  const apartmentId = formData.get('apartment_id');
  const apartmentName = formData.get('apartment_name');
  const checkIn = formData.get('check_in');
  const checkOut = formData.get('check_out');
  const totalNights = formData.get('total_nights');
  const totalPrice = formData.get('total_price');
  const confirmed = formData.get('confirmed') === 'on';
  const sendConfirmation = formData.get('send_confirmation') === 'on';
  const adults = formData.get('adults');
  const children = formData.get('children');
  const userName = formData.get('user_name');
  const userEmail = formData.get('user_email');
  const userPhone = formData.get('user_phone');
  const comment = formData.get('comment');
  const adultsNum = Number(adults) || 0;
  const childrenNum = Number(children) || 0;
  const totalGuestsNum = adultsNum + childrenNum;
  const totalGuests = totalGuestsNum.toString();
  const guests = formData.get('guests');
  const maxGuests = Number(guests) || 0;

  if (!apartmentId) {
    return {
      error: 'Please select apartment',
      fields: {
        apartmentId,
        adults,
        children,
        userName,
        userEmail,
        userPhone,
        comment,
      },
    };
  }

  if (!checkIn) {
    return {
      error: 'Please select check-in date',
      fields: {
        apartmentId,
        adults,
        children,
        userName,
        userEmail,
        userPhone,
        comment,
      },
    };
  }

  if (!checkOut) {
    return {
      error: 'Please selec check-out date',
      fields: {
        apartmentId,
        adults,
        children,
        userName,
        userEmail,
        userPhone,
        comment,
      },
    };
  }

  if (!adults) {
    return {
      error: 'Please add number of guests',
      fields: {
        apartmentId,
        adults,
        children,
        userName,
        userEmail,
        userPhone,
        comment,
      },
    };
  }

  if (!userName) {
    return {
      error: 'Please add your name',
      fields: {
        apartmentId,
        adults,
        children,
        userName,
        userEmail,
        userPhone,
        comment,
      },
    };
  }

  if (!userEmail) {
    return {
      error: 'Please add your email',
      fields: {
        apartmentId,
        adults,
        children,
        userName,
        userEmail,
        userPhone,
        comment,
      },
    };
  }

  if (!validateEmail(userEmail)) {
    return {
      error: 'Please enter a valid email address.',
    };
  }

  if (!userPhone) {
    return {
      error: 'Please add your phone number',
      fields: {
        apartmentId,
        adults,
        children,
        userName,
        userEmail,
        userPhone,
        comment,
      },
    };
  }

  if (totalGuests > maxGuests) {
    return {
      error: 'Too many guests for this apartment',
      fields: {
        apartmentId,
        adults,
        children,
        userName,
        userEmail,
        userPhone,
        comment,
      },
    };
  }

  const checkInDate = DateTime.fromISO(checkIn);
  const checkOutDate = DateTime.fromISO(checkOut);

  if (!checkInDate.isValid || !checkOutDate.isValid) {
    return {
      error: 'Invalid date format',
      fields: {
        apartmentId,
        adults,
        children,
        userName,
        userEmail,
        userPhone,
        comment,
      },
    };
  }

  if (checkInDate > checkOutDate) {
    return {
      error: 'Check-in date must be before check-out date',
      fields: {
        apartmentId,
        adults,
        children,
        userName,
        userEmail,
        userPhone,
        comment,
      },
    };
  }

  if (totalNights < 5) {
    return {
      error: 'Sorry, you must book for at least 5 nights',
      fields: {
        apartmentId,
        adults,
        children,
        userName,
        userEmail,
        userPhone,
        comment,
      },
    };
  }

  // Check if room is available
  const isAvailable = await checkApartmentAvailability(
    apartmentId,
    checkIn,
    checkOut,
  );

  if (!isAvailable) {
    return {
      error: 'Sorry, this apartment is already booked for the selected time',
      fields: {
        apartmentId,
        adults,
        children,
        userName,
        userEmail,
        userPhone,
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
    // Create booking
    const booking = await tablesDB.createRow(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      ID.unique(),
      {
        apartment_id: apartmentId,
        apartment_name: apartmentName,
        check_in: checkIn,
        check_out: checkOut,
        total_nights: totalNights,
        total_price: totalPrice,
        user_id: user.id,
        user_name: userName,
        user_email: userEmail,
        user_phone: userPhone,
        adults,
        children,
        total_guests: totalGuests,
        confirmed,
        comment,
      },
    );

    if (sendConfirmation) {
      sendBookingConfirmation({ booking });
    }
    revalidatePath('/bookings', 'layout');
    revalidatePath('/admin/bookings', 'layout');
    return {
      success: true,
      id: booking.$id,
    };
  } catch (error) {
    console.log('Failed to book apartment', error);
    return {
      error: 'Something went wrong',
      fields: {
        apartmentId,
        adults,
        children,
        userName,
        userEmail,
        userPhone,
        comment,
      },
    };
  }
}

export default createAdminBooking;
