import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl;

    const sessionCookie = 
        request.cookies.get('better-auth.session_token') || 
        request.cookies.get('__Secure-better-auth.session_token') ||
        request.cookies.get('better_auth.session_token');

    const isProtectedRoute = pathname.startsWith('/products') || pathname.startsWith('/category');

    if (isProtectedRoute && !sessionCookie) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/products/:path*', '/category/:path*'],
};