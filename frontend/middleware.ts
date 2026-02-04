import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Public routes that don't require authentication
const publicRoutes = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/onboarding',
    '/',
];

// Check if the pathname matches a public route
function isPublicRoute(pathname: string): boolean {
    return publicRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`));
}

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    // Allow static files and API routes
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.') // Static files like favicon.ico, images, etc.
    ) {
        return NextResponse.next();
    }

    const isPublic = isPublicRoute(pathname);

    // If no token and trying to access a protected route, redirect to login
    if (!token && !isPublic) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // If has token and trying to access auth pages (except home), redirect to dashboard
    if (token && isPublic && pathname !== '/') {
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
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
