import { NextRequest } from "next/server";
import getAnalytics from "@/actions/getAnalytics";

export const runtime = "edge";

export async function GET(
  req: NextRequest,
  { params }: { params: { code: string } },
) {
  const analytics = await getAnalytics(params.code);
  if (analytics === null) {
    return new Response(null, { status: 401 });
  }
  if (analytics === undefined) {
    return new Response(null, { status: 500 });
  }
  const { url, clicks } = analytics;
  return new Response(JSON.stringify({ url, clicks }), { status: 200 });
}
