'use server';

import { createAdminClient, createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';
import { isSafeRedirect } from '../utils';

async function createSession(previousState, formData) {
  const cookieStore = await cookies();
  const token = cookieStore.get('appwrite-token');
  const code = formData.get('code');
  // const callbackUrl = formData.get('callbackUrl') || '/';
  const rawCallbackUrl = formData.get('callbackUrl');

  const callbackUrl =
    typeof rawCallbackUrl === 'string' && isSafeRedirect(rawCallbackUrl)
      ? rawCallbackUrl
      : null;

  if (!code) {
    return {
      error: 'Please enter your code',
      field: code,
      callbackUrl,
    };
  }

  if (code.length < 6 || code.length > 6) {
    return {
      error: 'Code must be six numbers',
      field: code,
      callbackUrl,
    };
  }

  if (!token?.value) {
    return {
      error: 'Something went wrong',
      field: code,
      callbackUrl,
    };
  }

  // Get account instance
  const { account } = await createAdminClient();

  try {
    //  Generate session
    const session = await account.createSession(token.value, code);

    // Create cookie

    cookieStore.set('appwrite-session', session.secret, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(session.expire),
      path: '/',
    });

    cookieStore.delete('appwrite-token');

    // Get user
    const { account: userAccount } = await createSessionClient(session.secret);
    const user = await userAccount.get();
    const isAdmin = user?.labels?.includes('admin') || false;

    return {
      success: true,
      isAdmin,
      callbackUrl,
    };
  } catch (error) {
    console.log('Authentication Error: ', error);
    return {
      error: 'Invalid Credentials',
      field: code,
      callbackUrl,
    };
  }
}

export default createSession;
