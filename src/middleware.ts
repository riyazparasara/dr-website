import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const isAdmin = token?.role === "ADMIN";
        const isAdminPage = req.nextUrl.pathname.startsWith("/admin");

        // If they are on an admin page (other than login) and not an admin, redirect
        if (isAdminPage && req.nextUrl.pathname !== "/admin/login" && !isAdmin) {
            return NextResponse.redirect(new URL("/", req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                // Allow the login page without a token
                if (req.nextUrl.pathname === "/admin/login") {
                    return true;
                }
                // Require token for everything else in the matcher
                return !!token;
            },
        },
    }
);

export const config = {
    matcher: ["/admin/:path*"],
};
