import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import * as jwt from 'jsonwebtoken';

export async function middleware(request: NextRequest) {
  // Verificar si la ruta necesita autenticación
  if (!request.url.includes('/api/auth/')) {
    const token = request.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('user', JSON.stringify(decoded));

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (err) {
      console.error('Token verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};