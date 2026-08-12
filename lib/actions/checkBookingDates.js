'use server';

import { cookies } from 'next/headers';
import checkAuth from './checkAuth';
import { DateTime } from 'luxon';
import checkApartmentAvailability from './checkApartmentAvailability';

async function checkBookingDates(previousState, formData) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('appwrite-session');
  if (!sessionCookie) {
    return {
      error: 'You must be logged in to book apartment',
      requiresLogin: true,
    };
  }

  try {
    // Get user's ID
    const { user } = await checkAuth();

    if (!user) {
      return {
        error: 'You must be logged in to book apartment',
        requiresLogin: true,
      };
    }

    const checkIn = formData.get('check_in');
    const checkOut = formData.get('check_out');
    const apartmentId = formData.get('apartment_id');

    if (!checkIn) {
      return {
        error: 'Please select check-in date',
      };
    }

    if (!checkOut) {
      return {
        error: 'Please select check-out date',
      };
    }

    const checkInDate = DateTime.fromISO(checkIn);
    const checkOutDate = DateTime.fromISO(checkOut);

    if (!checkInDate.isValid || !checkOutDate.isValid) {
      return {
        error: 'Invalid date format',
      };
    }

    if (checkInDate > checkOutDate) {
      return {
        error: 'Check-in date must be before check-out date',
      };
    }

    const totalNights = Math.round(checkOutDate.diff(checkInDate, 'days').days);

    if (totalNights < 5) {
      return {
        error: 'Sorry, you must book for at least 5 nights',
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
      };
    }

    const booking = {
      checkIn,
      checkOut,
      apartmentId,
      totalNights,
    };

    cookieStore.set('appwrite-booking', JSON.stringify(booking), {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 20, // 20 minutes
      path: '/',
    });

    return {
      success: true,
      // booking,
    };
  } catch (error) {
    console.error(error);
    return {
      error: 'Something went wrong booking apartment',
    };
  }
}

export default checkBookingDates;
