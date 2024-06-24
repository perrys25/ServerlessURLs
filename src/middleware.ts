import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
import {getRequestContext} from '@cloudflare/next-on-pages'
import authConfig from "./auth.config"
import NextAuth from "next-auth";
import {codeLength} from "@/app/api/shorten/generateCode";

const { auth } = NextAuth(authConfig)


export const middleware = auth(async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    console.log(`[middleware] Path: ${path}`)
    if (path === "/") {
        return NextResponse.next()
    }
    const code = request.nextUrl.pathname.split('/').pop();
    if (!code) {
        return NextResponse.next()
    }
    if (code.length !== codeLength || !/^[a-z0-9]+$/.test(code)) {
        return NextResponse.next()
    }
    const context = getRequestContext();
    const URLS_KV = context.env.URLS_KV;
    const url = await URLS_KV.get(code);
    if (!url) {
        return NextResponse.next()
    }
    const LINK_TRACKING = context.env.LINK_TRACKING;
    LINK_TRACKING.writeDataPoint({
        blobs: ["redirect", code, request.headers.get("Referer") ?? ""],
        indexes: [code]
    })
    return NextResponse.redirect(new URL(url), {status: 307})
})