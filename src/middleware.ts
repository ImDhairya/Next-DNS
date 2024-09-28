import {clerkMiddleware, createRouteMatcher} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in/",
  "/sign-up/",
  "/",
  "/home",
  "/api/webhooks/clerk",
]);
// const isPublicApiRoute = createRouteMatcher(["/api/videos"]);

export default clerkMiddleware((auth, req) => {
  const {userId} = auth();
  const currentUrl = new URL(req.url);
  const isAccessingDashboard = currentUrl.pathname === "/home";
  const isApiRequest = currentUrl.pathname.startsWith("/api");

  // If user is logged in and accessing a public route but not the dashboard
  // I don't want the user to go around login unless its from dashboard
  if (userId && isPublicRoute(req) && !isAccessingDashboard) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (currentUrl.pathname === "/sign-in" || "/sign-up") {
    return NextResponse.next();
  }

  //not logged in
  if (!userId) {
    // If user is not logged in and trying to access a protected route
    if (!isPublicRoute(req)) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
