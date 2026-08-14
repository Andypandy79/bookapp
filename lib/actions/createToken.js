'use server';

import { createAdminClient } from '@/config/appwrite';
import { ID } from 'node-appwrite';
import { cookies } from 'next/headers';
import { isSafeRedirect, validateEmail } from '../utils';

async function createToken(previousState, formData) {
  const email = formData.get('email');
  // const callbackUrl = formData.get('callbackUrl') || '';
  const rawCallbackUrl = formData.get('callbackUrl');

  const callbackUrl =
    typeof rawCallbackUrl === 'string' && isSafeRedirect(rawCallbackUrl)
      ? rawCallbackUrl
      : null;

  if (!email) {
    return {
      error: 'Please enter your email',
      field: email,
      callbackUrl,
    };
  }

  if (!validateEmail(email)) {
    return {
      error: 'Please enter a valid email address.',
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
      callbackUrl,
    };
  } catch (error) {
    console.log('Authentication Error: ', error);
    return {
      error: 'Please enter your email',
      field: email,
      callbackUrl,
    };
  }
}

export default createToken;
