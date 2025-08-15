import { authMiddleware } from '@clerk/nextjs'; 

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

export default authMiddleware({
    publicRoutes,
})

export const config = {
  matcher: ['/((?!_next/image|_next/static|favicon.ico).*)'],
};