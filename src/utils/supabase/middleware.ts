import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // 1. Auth Update
  let supabaseResponse = NextResponse.next({ request });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
        },
      },
    }
  );
  await supabase.auth.getUser();

  // 2. Subdomain Multi-tenant Rewrites
  const url = request.nextUrl;
  const hostname = request.headers.get("host") || "";

  // Set your main production domain and dev domain here
  const MAIN_DOMAIN = "makemyinvites.vercel.app";
  
  // If the hostname is NOT the main domain and NOT localhost:3000, it's a subdomain
  if (
    hostname !== MAIN_DOMAIN &&
    hostname !== "www.makemyinvites.vercel.app" &&
    !hostname.includes("localhost:")
  ) {
    // Extract the subdomain (e.g., "siva" from "siva.makemyinvites.vercel.app")
    const subdomain = hostname.split(".")[0];
    
    // We rewrite the URL to /publish/[subdomain]
    return NextResponse.rewrite(new URL(`/invites/${subdomain}`, request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
