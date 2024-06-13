import { type Locale, locales } from "./locales";
import createMiddleware from "next-intl/middleware";
import { type NextRequest, type NextResponse } from "next/server";

const nextIntlMiddleware = createMiddleware({
  locales,
  defaultLocale: "vi" satisfies Locale,
  localePrefix: "as-needed",
});

export default function (req: NextRequest): NextResponse {
  let locale = req.cookies.get("NEXT_LOCALE")?.value || "vi";
  if (!locales.includes(locale as Locale)) {
    locale = "vi";
  }
  req.cookies.set("NEXT_LOCALE", locale);
  const response = nextIntlMiddleware(req);
  return response;
}

export const config = {
  // match only internationalized pathnames
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
