import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// I could have used localStorage for user info persistance, but this is much better, because:
// it works on the edge before the request is processed, improving security and scalability
export async function middleware(request: NextRequest) {
  // Reading 'user-information' cookie in the request
  const cookie = request.cookies.get("user-information");

  // If there is a signed in user, then will continue
  if (cookie) {
    return NextResponse.next();
  }

  // Redirect not signed in user into sign in page
  return NextResponse.redirect(new URL("/signin", request.url));
}

export const config = {
  matcher: ["/((?!signin|api|images|_next/static|_next/image|favicon.ico).*)"],
};
