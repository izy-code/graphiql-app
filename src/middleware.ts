import { type NextRequest, type NextResponse } from 'next/server';
import { createI18nMiddleware } from 'next-international/middleware';

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'ru'],
  defaultLocale: 'en',
});

export default function middleware(request: NextRequest): NextResponse<unknown> {
  return I18nMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|static|_next|_vercel|.*\\..*).*)'],
};
