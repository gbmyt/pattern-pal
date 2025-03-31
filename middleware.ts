import { authMiddleware } from "@clerk/nextjs"

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
    publicRoutes: [
        "/",
        "/api/patterns",
        "/patterns",
        "/api/auth",
        "/api/callback",
        "/callback",
        "/faq",
        "/templates",
    ],
})

export const config = {
    runtime: "nodejs",
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
