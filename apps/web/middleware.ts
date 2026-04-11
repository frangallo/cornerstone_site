import { internationalizationMiddleware } from "@repo/internationalization/proxy";
import type { NextRequest } from "next/server";

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|ingest|favicon.ico|.*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};

export default function middleware(request: NextRequest) {
  return internationalizationMiddleware(request);
}
