import { auth } from "@/auth";
import { NextResponse } from "next/server";

const isProtectedRoute = new Set(["/workspace", "/dashboard"]);
export default auth((req) => {
  const { pathname } = req.nextUrl;
  // if user is no protected route and is not authenticated, redirect to login
  if (isProtectedRoute.has(pathname) && !req.auth) {
    const newUrl = new URL("/api/auth/signin", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|$).*)"],
};
