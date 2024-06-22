import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/login", "/signup"]; // Add any public paths here

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  if (
    pathname.startsWith("/_next") || // Next.js build files
    pathname.startsWith("/static") || // Custom static files
    pathname.startsWith("/favicon.ico") || // Favicon
    pathname.startsWith("/images") || // Image files
    pathname.startsWith("/api") // API routes
  ) {
    return NextResponse.next();
  }

  const cookieHeader = request.headers.get("cookie") || "";
  console.log(cookieHeader, "-----------cookieHeader");
  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((c) => {
      const [key, ...v] = c.split("=");
      return [key, v.join("=")];
    })
  );

  const token = cookies.token;

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
