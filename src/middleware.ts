/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Función auxiliar para crear la clave secreta
const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT Secret key is not set');
  }
  return new TextEncoder().encode(secret);
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token_dashboard_nomada')?.value;
  const { pathname } = request.nextUrl;

  // Rutas privadas que requieren token
  if (pathname.startsWith('/clients') || pathname.startsWith('/companies')) {
    if (!token) {
      console.log('No token found, redirecting to login');
      return NextResponse.redirect(new URL('/', request.url));
    }

    try {
      await jwtVerify(token, getJwtSecretKey());
      return NextResponse.next();
    } catch (err) {
      console.error('Token verification failed:', err);
      const response = NextResponse.redirect(new URL('/', request.url));
      response.cookies.delete('token_dashboard_nomada');
      return response;
    }
  }

  // Ruta pública (/) - Si tiene token válido, redirigir a /clients
  if (pathname === '/') {
    if (token) {
      try {
        await jwtVerify(token, getJwtSecretKey());
        return NextResponse.redirect(new URL('/clients', request.url));
      } catch (err) {
        const response = NextResponse.next();
        response.cookies.delete('token_dashboard_nomada');
        return response;
      }
    }
    return NextResponse.next();
  }

  // Rutas de API
  if (pathname.startsWith('/api/') && !pathname.includes('/api/auth/')) {
    const authHeader = request.headers.get('Authorization')?.split(' ')[1];

    if (!authHeader) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    try {
      await jwtVerify(authHeader, getJwtSecretKey());
      return NextResponse.next();
    } catch (err) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/clients/:path*',
    '/companies/:path*',
    '/api/:path*',
  ]
};