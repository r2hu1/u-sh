import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth, req) => {
	if (isProtectedRoute(req)) await auth.protect;
});

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
