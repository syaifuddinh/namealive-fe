import { NextResponse } from "next/server";
import { NextApiRequest } from "next";
import { protectedapi } from "@/utils/api";

export async function POST(req: NextApiRequest, { params }: {params: Promise<{ id: string }>}) {
  const matchId = (await params).id
  const baseUrl = process.env.BACKEND_MATCH_URL
  const url = baseUrl + "/match/" + matchId + "/token"

  
  try {
    const resp = await protectedapi(url, "POST")
  
    return NextResponse.json({ message: "success", data: resp.data }, { status: 200 });

  } catch {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
