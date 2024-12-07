import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('authToken');

  if (!authToken && request.nextUrl.pathname.startsWith('/api/auth/entity')) {
    console.log('Middleware: No auth token found for /api/auth/entity request');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.next();
}