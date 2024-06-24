import {auth} from "@/auth";
import {getRequestContext} from "@cloudflare/next-on-pages";

export default async function getAnalytics(code: string) {
    const session = await auth()
    if (!session || !session.user) {
        return undefined
    }
    const context = getRequestContext();
    const URLS_KV = context.env.URLS_KV;
    const url = await URLS_KV.get(code);
    if (!url) {
        return undefined
    }
    const query = `
        SELECT
            timestamp, blob1 AS change, blob2 AS code, blob3 AS referer
        FROM link_tracking
        WHERE code = '${code}'`
    const API = `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_API_ID}/analytics_engine/sql`;
    const response = await fetch(API, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.CF_API_TOKEN}`,
        },
        body: query
    })
    let result: { rows: number };
    try {
        result = await response.json();
    } catch (error) {
        return undefined
    }
    const numClicks = result.rows;
    return {url, clicks: numClicks}
}