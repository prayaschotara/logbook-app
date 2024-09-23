import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = cookies().get("token")?.value;
  let user = null;

  // Bypass middleware for login and logout paths
  if (pathname === "/login" || pathname === "/api/logout") {
    return NextResponse.next();
  }

  if (!token) {
    // Redirect to login if no token is found and trying to access protected routes
    if (pathname.startsWith("/admin") || pathname.startsWith("/superadmin")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } else {
    try {
      const decodedToken = jwtDecode(token);
      user = decodedToken;
      const isExpired = decodedToken.exp * 1000 < Date.now();
      if (isExpired) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      if (user.role === "admin" && !pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/admin", req.url));
      } else if (
        user.role === "superadmin" &&
        !pathname.startsWith("/superadmin")
      ) {
        return NextResponse.redirect(new URL("/superadmin", req.url));
      }
    } catch (error) {
      console.log(error, "error");
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/superadmin",
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
