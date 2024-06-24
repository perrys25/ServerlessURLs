import {auth} from "@/auth";
import {getRequestContext} from "@cloudflare/next-on-pages";

export default async function getAnalytics(code: string) {
    const session = await auth()
    if (!session?.user?.id) {
        return undefined
    }
    const context = getRequestContext();
    const URLS_KV = context.env.URLS_KV;
    const {value: url, metadata}: KVNamespaceGetWithMetadataResult<string, {
        author: string | undefined
    }> = await URLS_KV.getWithMetadata(code, {
        cacheTtl: 60 * 60 * 24 * 7 // 1 week
    });
    if (!url || !metadata || metadata.author !== session.user.id) {
        return undefined
    }
    const query = `
        SELECT SUM(_sample_interval)
        FROM link_tracking
        WHERE blob2 = '${code}'`
    const API = `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_API_ID}/analytics_engine/sql`;
    const response = await fetch(API, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.CF_API_TOKEN}`,
        },
        body: query
    })
    let result: { rows: number };
    console.log(response)
    try {
        result = await response.json();
    } catch (error) {
        return undefined
    }
    const numClicks = result.rows;
    return {url, clicks: numClicks}
}