'use server';

import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';
import { Query } from 'node-appwrite';
import { redirect } from 'next/navigation';
import { DateTime } from 'luxon';

// Convert a date string to a Luxon DateTime object in UTC
function toUTCDateTime(dateString) {
  return DateTime.fromISO(dateString, { zone: 'utc' }).toUTC();
}

// Check for overlapping date ranges
function dateRangesOverlap(checkInA, checkOutA, checkInB, checkOutB) {
  return checkInA < checkOutB && checkOutA > checkInB;
}

async function checkApartmentAvailability(apartmentId, checkIn, checkOut) {
  const sessionCookie = (await cookies()).get('appwrite-session');
  if (!sessionCookie) {
    redirect('/login');
  }

  try {
    const { tablesDB } = await createSessionClient(sessionCookie.value);

    const checkInDate = toUTCDateTime(checkIn);
    const checkOutDate = toUTCDateTime(checkOut);
    // Fetch all bookings for a given apartment
    const { rows: bookings } = await tablesDB.listRows(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      [Query.equal('apartment_id', apartmentId)],
    );
    // Loop over bookingsa and check for overlaps
    for (const booking of bookings) {
      const bookingCheckIn = toUTCDateTime(booking.check_in);
      const bookingCheckOut = toUTCDateTime(booking.check_out);

      if (
        dateRangesOverlap(
          checkInDate,
          checkOutDate,
          bookingCheckIn,
          bookingCheckOut,
        )
      ) {
        return false; // Overlap found, do not book
      }
    }

    // No overlap found, continue to book
    return true;
  } catch (error) {
    console.log('Failed to check availability', error);
    return {
      error: 'Failed to check availability',
    };
  }
}

export default checkApartmentAvailability;
