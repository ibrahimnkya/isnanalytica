import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    // Public routes that don't require authentication
    const publicRoutes = [
        '/login',
        '/register',
        '/forgot-password',
        '/reset-password',
        '/onboarding',
        '/',
    ];

    const isPublicRoute = publicRoutes.includes(pathname);

    // Check if the path is under the (authenticated) route group
    // These routes always require authentication
    const isAuthenticatedRoute = 
        pathname.startsWith('/dashboards') ||
        pathname.startsWith('/charts') ||
        pathname.startsWith('/data-sources') ||
        pathname.startsWith('/datasets') ||
        pathname.startsWith('/explore') ||
        pathname.startsWith('/settings');

    if (!token && (isAuthenticatedRoute || !isPublicRoute)) {
        // Redirect to login if trying to access a protected route without a token
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    if (token && isPublicRoute && pathname !== '/') {
        // Redirect to dashboard if trying to access login/register with a token
        const dashboardUrl = new URL('/dashboards', request.url);
        return NextResponse.redirect(dashboardUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public assets (images, etc.)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.ico$).*)',
    ],
};
