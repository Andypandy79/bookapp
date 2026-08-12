'use server';

import { createAdminClient } from '@/config/appwrite';
import { ID } from 'node-appwrite';
import { cookies } from 'next/headers';

async function createToken(previousState, formData) {
  const email = formData.get('email');

  if (!email) {
    return {
      error: 'Please enter your email',
      field: email,
    };
  }

  //   // Get account instance
  const { account } = await createAdminClient();

  try {
    const token = await account.createEmailToken({
      userId: ID.unique(),
      email,
    });

    // Create cookie
    const cookieStore = await cookies();
    cookieStore.set('appwrite-token', token.userId, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 10, // 10 minutes
      path: '/',
    });

    return {
      success: true,
    };
  } catch (error) {
    console.log('Authentication Error: ', error);
    return {
      error: 'Invalid Credential',
      field: email,
    };
  }
}

export default createToken;
