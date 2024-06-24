import {auth} from "@/auth";
import {NextRequest} from "next/server";
import {getRequestContext} from "@cloudflare/next-on-pages";

export const runtime = 'edge'

export async function GET(req: NextRequest, {params}: { params: { code: string } }) {

    // return new Response(JSON.stringify({url, clicks: numClicks}), {status: 200})
}