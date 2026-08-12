'use server';
import { createAdminClient } from '@/config/appwrite';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import checkAuth from './checkAuth';
import { ID } from 'node-appwrite';
import { revalidatePath } from 'next/cache';

async function createApartment(previousState, formData) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('appwrite-session');
  if (!sessionCookie) {
    redirect('/login');
  }

  const { isAdmin, user } = await checkAuth();

  if (!isAdmin) {
    redirect('/');
  }

  const userName = formData.get('user_name');
  const name = formData.get('name');
  const city = formData.get('city');
  const bedrooms = formData.get('bedrooms');
  const guests = formData.get('guests');
  const price = formData.get('price');
  const size = formData.get('size');
  const amenities = formData.get('amenities');
  const title = formData.get('title');
  const description = formData.get('description');

  if (!userName) {
    return {
      error: 'Please add your name',
      fields: {
        userName,
        name,
        city,
        bedrooms,
        guests,
        price,
        size,
        amenities,
        title,
        description,
      },
    };
  }

  if (!name) {
    return {
      error: 'Please add apartment name',
      fields: {
        userName,
        name,
        city,
        bedrooms,
        guests,
        price,
        size,
        amenities,
        title,
        description,
      },
    };
  }

  if (!city) {
    return {
      error: 'Please add city',
      fields: {
        userName,
        name,
        city,
        bedrooms,
        guests,
        price,
        size,
        amenities,
        title,
        description,
      },
    };
  }

  if (!bedrooms) {
    return {
      error: 'Please add number of bedrooms',
      fields: {
        userName,
        name,
        city,
        bedrooms,
        guests,
        price,
        size,
        amenities,
        title,
        description,
      },
    };
  }

  if (!guests) {
    return {
      error: 'Please add number of guests',
      fields: {
        userName,
        name,
        city,
        bedrooms,
        guests,
        price,
        size,
        amenities,
        title,
        description,
      },
    };
  }

  if (!price) {
    return {
      error: 'Please add price per night',
      fields: {
        userName,
        name,
        city,
        bedrooms,
        guests,
        price,
        size,
        amenities,
        title,
        description,
      },
    };
  }

  if (!size) {
    return {
      error: 'Please add size in square meters',
      fields: {
        userName,
        name,
        city,
        bedrooms,
        guests,
        price,
        size,
        amenities,
        title,
        description,
      },
    };
  }

  if (!amenities) {
    return {
      error: 'Please add amenities',
      fields: {
        userName,
        name,
        city,
        bedrooms,
        guests,
        price,
        size,
        amenities,
        title,
        description,
      },
    };
  }

  if (!title) {
    return {
      error: 'Please add a title',
      fields: {
        userName,
        name,
        city,
        bedrooms,
        guests,
        price,
        size,
        amenities,
        title,
        description,
      },
    };
  }

  if (!description) {
    return {
      error: 'Please add a description',
      fields: {
        userName,
        name,
        city,
        bedrooms,
        guests,
        price,
        size,
        amenities,
        title,
        description,
      },
    };
  }

  // Get databases instance
  const { tablesDB, storage } = await createAdminClient();

  try {
    // Uploading image
    let imageID;

    const image = formData.get('image');

    if (image && image.size > 0 && image.name !== 'undefined') {
      try {
        // Upload
        const response = await storage.createFile(
          'apartments',
          ID.unique(),
          image,
        );
        imageID = response.$id;
      } catch (error) {
        console.log('Error uploading image', error);
        return {
          error: 'Error uploading image',
        };
      }
    } else {
      console.log('No image file provided or file is invalid');
    }

    // Create apartment
    const newApartment = await tablesDB.createRow(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_APARTMENTS,
      ID.unique(),
      {
        user_id: user.id,
        user_name: userName,
        name,
        city,
        bedrooms,
        guests,
        price,
        size,
        amenities,
        title,
        description,
        image: imageID,
      },
    );

    revalidatePath('/', 'layout');
    revalidatePath('/admin/apartments/add', 'layout');

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    const errorMessage =
      error.response.message || 'An unexpected error has occured';
    return {
      error: errorMessage,
    };
  }
}

export default createApartment;
