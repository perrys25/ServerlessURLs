import {auth} from "@/auth";
import {NextRequest} from "next/server";
import SQL from '@nearform/sql'
import {getRequestContext} from "@cloudflare/next-on-pages";

export const runtime = 'edge'

export async function GET(req: NextRequest, {params}: { params: { code: string } }) {
    const session = await auth()
    if (!session) {
        return new Response(null, {status: 401})
    }
    const context = getRequestContext();
    const URLS_KV = context.env.URLS_KV;
    const url = await URLS_KV.get(params.code);
    if (!url) {
        return new Response(null, {status: 404})
    }
    const query = SQL`
        SELECT
            timestamp, blob1 AS change, blob2 AS code, blob3 AS referer
        FROM link_tracking
        WHERE code = ${params.code}`.sql
    const API = `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_API_ID}/analytics_engine/sql`;
    const response = await fetch(API, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.CF_API_TOKEN}`,
        },
        body: query
    })
    if (response.status !== 200) {
        return new Response(null, {status: 500})
    }
    const result: { data: any[] } = await response.json();
    const numClicks = result.data.length;
    return new Response(JSON.stringify({url, clicks: numClicks}), {status: 200})
}