import { type Locale, locales } from "./locales";
import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";

const nextIntlMiddleware = createMiddleware({
  locales,
  defaultLocale: "vi" satisfies Locale,
  localePrefix: "as-needed",
});

export default function (req: NextRequest): NextResponse {
  let locale = req.cookies.get("NEXT_LOCALE")?.value || "vi";

  // Check and set the locale if it's not one of the valid locales
  if (!locales.includes(locale as Locale)) {
    locale = "vi";
  }

  // Apply the middleware
  const response = nextIntlMiddleware(req);

  // Set or update the NEXT_LOCALE cookie explicitly in the response
  response.cookies.set("NEXT_LOCALE", locale, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // one year for example
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
