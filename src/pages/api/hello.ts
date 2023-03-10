// Next.js Edge API Routes: https://nextjs.org/docs/api-routes/edge-api-routes
import type { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(
  req: NextRequest
): Promise<Response> {
  const url = 'https://dbs.arms.workers.dev/countries/ps/rand/10'
  const rs = await fetch(url)
  if (!rs.ok) {
    return new Response(JSON.stringify({
      info: 'NOT OK'
    }), {
      status: 500,
      headers: {
      "Content-Type": "application/json",
    },
    })
  }
  const json = await rs.json()
  return new Response(JSON.stringify(json), {
    headers: {
      "Content-Type": "application/json",
    }
  })
}