import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get("user-information");

  if (cookie) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/signin", request.url));
}

export const config = {
  matcher: ["/((?!signin|api|images|_next/static|_next/image|favicon.ico).*)"],
};
