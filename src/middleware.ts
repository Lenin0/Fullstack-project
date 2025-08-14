import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { Images } from "lucide-react";
import { NextRequest } from "next/server";
import Login from "./app/login/page";

export default withAuth(
  async function middleware(request: NextRequest) {
    // console.log(request)
  },
  {
    isReturnToCurrentPage: true,
  }
);

export const config = {
  matcher: [
    // Match all request paths except or the ones starting with:
    // * - api (Api routes)
    // * - _next/static (stacitc files)
    // * - auth
    // * - favicon.icon (favicon file)
    // * - robots.tsx
    // * - Images
    // * - Login
    // * - Homepage (represent with $ affter beginning /)
    ''
  ],
};
