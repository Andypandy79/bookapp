'use server';

import { createAdminClient, createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';

async function createSession(previousState, formData) {
  const cookieStore = await cookies();
  const token = cookieStore.get('appwrite-token');
  const code = formData.get('code');
  if (!code) {
    return {
      error: 'Please enter your code',
      field: code,
    };
  }

  if (code.length < 6 || code.length > 6) {
    return {
      error: 'Code must be six numbers',
      field: code,
    };
  }

  if (!token?.value) {
    return {
      error: 'Something went wrong',
      field: code,
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

    // Get user
    const { account: userAccount } = await createSessionClient(session.secret);
    const user = await userAccount.get();
    const isAdmin = user?.labels?.includes('admin') || false;

    return {
      success: true,
      isAdmin,
    };
  } catch (error) {
    console.log('Authentication Error: ', error);
    return {
      error: 'Invalid Credentials',
      field: code,
    };
  }
}

export default createSession;
