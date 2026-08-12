'use server';

import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import checkAuth from './checkAuth';

async function deleteApartment(apartmentId) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('appwrite-session');
  if (!sessionCookie) {
    redirect('/login');
  }

  try {
    // Get user's ID
    const { isAdmin } = await checkAuth();

    if (!isAdmin) {
      return {
        error: 'You are not authorized to delete this apartment',
      };
    }
    const { tablesDB, storage } = await createSessionClient(
      sessionCookie.value,
    );
    // Get the apartment
    const apartment = await tablesDB.getRow(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_APARTMENTS,
      apartmentId,
    );

    // Delete the image from storage
    if (apartment.image) {
      try {
        await storage.deleteFile(
          process.env.NEXT_PUBLIC_APPWRITE_APARTMENTS_STORAGE_BUCKET,
          apartment.image,
        );
      } catch (err) {
        console.log('Failed to delete apartment image', err);
      }
    }

    // Delete apartment
    await tablesDB.deleteRow(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_APARTMENTS,
      apartmentId,
    );

    revalidatePath('/admin/apartments', 'layout');
    revalidatePath('/apartments', 'layout');

    return {
      success: true,
    };
  } catch (error) {
    console.log('Failed to delete apartment', error);
    return {
      error: 'Failed to delete apartment',
    };
  }
}

export default deleteApartment;
