// Next.js Edge API Routes: https://nextjs.org/docs/api-routes/edge-api-routes
import { SOAL } from "@/lib/soal";
import type { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req: NextRequest): Promise<Response> {
  if (req.method == 'GET') {
    const para = `<p><span class="font-bold">Snackwave keffiyeh tilde</span> taiyaki sriracha franzen sartorial. Jawn pinterest fanny pack, hot chicken portland DSA organic banjo whatever unicorn. Affogato pinterest swag ennui wayfarers fixie vegan viral fingerstache tote bag knausgaard readymade hot chicken. Marfa enamel pin bodega boys etsy flexitarian, big mood put a bird on it cardigan thundercats tilde mlkshk lo-fi. Cardigan paleo ugh pabst next level farm-to-table umami retro cold-pressed same. Bitters viral YOLO pok pok selvage, sartorial normcore scenester schlitz biodiesel health goth. Iceland pour-over neutra letterpress mlkshk, aesthetic succulents blackbird spyplane taxidermy cornhole af chia humblebrag.</p>`
    return new Response(JSON.stringify({ para }), {
      headers: {
        "Content-Type": "application/json",
      }
    })
  } else if (req.method == 'POST') {
    const post = await req.json()
    const seq = post.seq
    console.log('SEQ', seq)
    if (seq == 5) {
      return new Response(JSON.stringify({ para: `<h2>SELESAI</h2>` }), {
        headers: {
          "Content-Type": "application/json",
        }
      })
    }
    const found = SOAL.filter(s => s.seq == seq + 1)
    // console.log(found)
    if (found.length > 0) {
      return new Response(JSON.stringify(found[0]), {
        headers: {
          "Content-Type": "application/json",
        }
      })
    }
    return new Response(JSON.stringify({ info: 'NOT FOUND'}), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      }
    })
  }
  return new Response('Not Allowed', {
    status: 403,
  })
}