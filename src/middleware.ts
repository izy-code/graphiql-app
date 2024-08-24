import { type NextRequest, NextResponse } from 'next/server';

import { isAuthenticated } from './utils/utils';

const protectedRoutes = ['/rest', '/graphiql', '/history'];
const unprotectedRoutes = ['/login', '/register'];

export default function middleware(req: NextRequest): NextResponse<unknown> {
  if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteUrl = new URL('/', req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
  if (isAuthenticated && unprotectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteUrl = new URL('/', req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
  return NextResponse.next();
}
