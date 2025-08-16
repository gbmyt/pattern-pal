import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

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
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', ...publicRoutes]);

export default clerkMiddleware(async (auth: any, req: NextRequest) => {
  const { protect } = await auth();
  if (!isPublicRoute(req)) {
    await protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};