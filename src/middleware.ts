import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
import {getRequestContext} from '@cloudflare/next-on-pages'
import authConfig from "./auth.config"
import NextAuth from "next-auth";
import {codeLength} from "@/app/api/shorten/generateCode";

const { auth } = NextAuth(authConfig)


export const middleware = auth(async function middleware(request: NextRequest) {
    console.log("[middleware.ts] Parsed by middleware")
    const URLS_KV = getRequestContext().env.URLS_KV;
    const path = request.nextUrl.pathname;
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
    const url = await URLS_KV.get(code);
    if (!url) {
        return NextResponse.next()
    }
    return NextResponse.redirect(new URL(url), {status: 301})
})