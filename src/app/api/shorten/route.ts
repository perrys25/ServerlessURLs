import type {NextRequest} from 'next/server'
import {getRequestContext} from '@cloudflare/next-on-pages'
import generateCode from "@/app/api/shorten/generateCode";
import isUrlHttp from 'is-url-http';
import {auth} from "@/auth";

export const runtime = 'edge'

export async function POST(req: NextRequest) {
    const session = await auth()

    console.log('POST /api/shorten')
    if (req.method !== 'POST') {
        return new Response(null, {status: 405})
    }
    if (!req.body) {
        return new Response(null, {status: 400})
    }
    const body: any = await req.json();
    if (!body || !body.url) {
        return new Response(null, {status: 400})
    }
    const url = body.url;
    if (typeof url !== "string" || !isUrlHttp(url)) {
        return new Response(null, {status: 400})
    }

    const context = getRequestContext();

    const URLS_KV = context.env.URLS_KV;
    const code = await generateCode(URLS_KV);
    await URLS_KV.put(code, url);
    console.log(`Shortened ${url} to ${code}`)

    const host = new URL(req.nextUrl).host;

    const LINK_TRACKING = context.env.LINK_TRACKING;

    LINK_TRACKING.writeDataPoint({
        blobs: ["create", code, url, session?.user?.id ?? "", req.ip ?? ""],
        indexes: [session?.user?.id ?? ""]
    })
    return new Response(JSON.stringify({code, url: `${host}/${code}`}), {status: 200})
}
