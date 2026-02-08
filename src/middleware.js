import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  try {
    const cookiesStore = await cookies(); // await required
    const token = cookiesStore.get('token')?.value;

    if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
      if (token) {
        return NextResponse.redirect(new URL('/profile', request.url));
      }
      return NextResponse.next();
    }

    const protectedRoutes = ['/profile', '/dashboard', '/blogposts'];
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
      if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
  } catch (error) {
    console.log('catch error middleware: ', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/signup', '/profile/:path*', '/dashboard/:path*', '/blogposts/:path*'],
};
