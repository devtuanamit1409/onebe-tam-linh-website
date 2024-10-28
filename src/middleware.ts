import { type Locale, locales } from "./locales";
import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import axios from "axios";

// Tạo middleware của next-intl
const nextIntlMiddleware = createMiddleware({
  locales,
  defaultLocale: "vi" satisfies Locale,
  localePrefix: "as-needed",
});

async function fetchPostBySlug(slugCurrent: string) {
  const { data } = await axios.get(
    `${process.env.URL_API}/api/bai-viets?filters[slug_current][$eq]=${slugCurrent}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.DEV_TOKEN}`,
      },
    }
  );

  return data.data; // Trả về dữ liệu bài viết
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextRequest): Promise<NextResponse> {
  // Xử lý locale dựa trên cookie
  let locale = req.cookies.get("NEXT_LOCALE")?.value || "vi";
  if (!locales.includes(locale as Locale)) {
    locale = "vi";
  }
  req.cookies.set("NEXT_LOCALE", locale);

  const currentPath = req.nextUrl.pathname;
  const slugCurrent = currentPath.substring(1);

  const posts = await fetchPostBySlug(slugCurrent);
  const matchedPost = posts.find(
    (post: any) => post.attributes?.slug_current === slugCurrent
  );

  // Nếu tìm thấy slug_current, thực hiện redirect sang slug mới
  if (matchedPost) {
    const newUrl = req.nextUrl.clone();
    newUrl.pathname = `/${matchedPost.attributes?.slug}`;
    console.log("Redirecting to:", newUrl.toString()); // In ra URL để kiểm tra
    return NextResponse.redirect(newUrl);
  }

  // Nếu không có redirect, tiếp tục xử lý next-intl middleware
  const response = nextIntlMiddleware(req);
  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
