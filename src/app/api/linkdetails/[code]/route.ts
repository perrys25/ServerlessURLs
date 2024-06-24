import {auth} from "@/auth";
import {NextRequest} from "next/server";
import {getRequestContext} from "@cloudflare/next-on-pages";

export const runtime = 'edge'

export async function GET(req: NextRequest, {params}: { params: { code: string } }) {
    console.log('GET /api/linkdetails/[code]')
    const session = await auth()
    if (!session || !session.user) {
        return new Response(null, {status: 401})
    }
    console.log("Found User " + session.user.id)
    const context = getRequestContext();
    const URLS_KV = context.env.URLS_KV;
    const url = await URLS_KV.get(params.code);
    if (!url) {
        return new Response(null, {status: 404})
    }
    console.log(`Redirects to ${url}`)
    const query = `
        SELECT
            timestamp, blob1 AS change, blob2 AS code, blob3 AS referer
        FROM link_tracking
        WHERE code = '${params.code}'`
    const API = `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_API_ID}/analytics_engine/sql`;
    const response = await fetch(API, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.CF_API_TOKEN}`,
        },
        body: query
    })
    const text = await response.text();
    console.log(text)
    console.log(`Fetched ${response.status}`)
    const result: { rows: number } = JSON.parse(text);
    const numClicks = result.rows;
    console.log(`Found ${numClicks} clicks`)
    return new Response(JSON.stringify({url, clicks: numClicks}), {status: 200})
}