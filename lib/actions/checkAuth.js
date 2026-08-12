'use server';
import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';

async function checkAuth() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('appwrite-session');
  if (!sessionCookie) {
    return {
      isAuthenticated: false,
      isAdmin: false,
    };
  }

  try {
    const { account } = await createSessionClient(sessionCookie.value);
    const user = await account.get();
    const isAdmin = user?.labels?.includes('admin') || false;

    return {
      isAuthenticated: true,
      isAdmin: isAdmin,
      user: {
        id: user.$id,
        email: user.email,
        // labels: user.labels,
      },
    };
  } catch (error) {
    return {
      isAuthenticated: false,
    };
  }
}

export default checkAuth;
