import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = [
    // main
    "/",
    "/login",
    "/about",
    "/dashboard",

    // account
    "/account",
    "/inbox",
    "/stash",
    "/queue",
    "/library",
    "/favorites",
    // "/projects",
    "/projects/:slug",
    "/settings",
    "/cart",

    // studio
    "/studio",
    "/templates",
    "/editor",
    "/patterns",
    "/patterns/:slug",

    // seller
    "/sell",
    "/shop",
    "/shop/:slug",
    "/shop/manage",

    // community
    "/community",
    "/contributors",

    // miscellaneous
    "/symbols",
    "/faq",

    // API
    "/about",
    "/api/patterns",
    "/api/auth",
    "/api/callback",
    "/callback",
]
const isPublicRoute = createRouteMatcher([
    "/sign-in(.*)",
    "/sign-up(.*)",
    ...publicRoutes,
])

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { pathname } = req.nextUrl;

  // Allow requests to public routes without auth check
  if (publicRoutes.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const authResult = await auth();

  if (!authResult.isAuthenticated) {
    // Redirect to sign-in page if not authenticated
    const url = new URL('/sign-in', req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};