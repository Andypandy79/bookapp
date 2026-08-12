// import { NextResponse } from 'next/server';
// import checkAuth from '@/lib/actions/checkAuth';

// export default async function proxy(request) {
//   // 1. Destructure 'role' alongside 'isAuthenticated' from your auth check
//   const { isAuthenticated, isAdmin } = await checkAuth();
//   // const isAdmin = user.labels.includes('admin') || false;
//   // 2. Protect against unauthenticated users
//   if (!isAuthenticated) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   // 3. Protect specific admin URLs
//   const nextUrl = request.nextUrl.pathname;

//   if (nextUrl.startsWith('/admin') && !isAdmin) {
//     // Redirect non-admins to a "Not Authorized" page or the homepage
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   // 4. Add your protected admin routes to the matcher
//   matcher: ['/admin/:path*'],
// };

// proxy.js
import { NextResponse } from 'next/server';
import checkAuth from '@/lib/actions/checkAuth';

export async function proxy(request) {
  const { isAuthenticated, isAdmin } = await checkAuth();
  const { pathname } = request.nextUrl;

  // Protected routes
  if (pathname.startsWith('/bookings')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Admin routes
  if (pathname.startsWith('/admin')) {
    if (!isAuthenticated || !isAdmin) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/bookings/:path*', '/admin/:path*'],
};
