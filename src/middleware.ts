import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
import {getRequestContext} from '@cloudflare/next-on-pages'
import authConfig from "./auth.config"
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig)


export default auth(async function middleware(request: NextRequest) {
    const URLS_KV = getRequestContext().env.URLS_KV;
    const path = request.nextUrl.pathname;
    if (path === "/" || path.includes(".") || path.includes("_next") || path.includes("api")) {
        return NextResponse.next()
    }
    const code = request.nextUrl.pathname.split('/').pop();
    if (!code) {
        return NextResponse.next()
    }
    const url = await URLS_KV.get(code);
    if (!url) {
        return NextResponse.next()
    }
    return NextResponse.redirect(new URL(url), {status: 301})
})

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}