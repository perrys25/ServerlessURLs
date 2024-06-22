import type {NextRequest} from 'next/server'
import {getRequestContext} from '@cloudflare/next-on-pages'
import generateCode from "@/app/api/shorten/generateCode";
import isUrlHttp from 'is-url-http';

export const runtime = 'edge'

export async function POST(req: NextRequest) {
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
    if (!isUrlHttp(url)) {
        return new Response(null, {status: 400})
    }
    const code = generateCode(getRequestContext().env.URLS_KV);
    await getRequestContext().env.URLS_KV.put(await code, url);

    return new Response(JSON.stringify({code}), {status: 200})
}
