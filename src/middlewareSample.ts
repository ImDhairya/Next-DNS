import {clerkMiddleware, createRouteMatcher} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in/", "/sign-up/", "/"]);

const isPrivateRoute = createRouteMatcher(["/add-data", "/get-data"]);

export default clerkMiddleware((auth, req) => {
  const currentUrl = new URL(req.url);
  const {userId} = auth();

  // if (currentUrl.pathname === "/sign-in" || "/sign-up") {
  //   return NextResponse.next();
  // }

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
