import { authMiddleware } from "@clerk/nextjs"
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_COOKIE } from "./const/app.const";

// Update once auth flow is complete TODO
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
];

// REDIRECT TO LOGIN IF NO AUTH TOKEN
export function middleware(req: NextRequest) {
  const token = req.cookies.get(AUTH_COOKIE);

  if (!token && !publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  return NextResponse.next();
}

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
    // TODO: Edit public routes once auth is fixed
    publicRoutes,
})

export const config = {
    runtime: "nodejs",
    matcher: [
        "/((?!.+\\.[\\w]+$|_next).*)", "/", 
        "/(api|trpc)(.*)"
    ],
}