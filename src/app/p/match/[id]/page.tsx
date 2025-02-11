import { notFound } from "next/navigation";
import { MatchRepo } from "@/repositories/MatchRepo";

import { MatchDetailResp } from "@/types/match";
import { MatchDetailPage } from "@/components/pages/match/detail";

export default async function MatchDetailApp({ params }: { params: Promise<{ id: string }> }) {
  let matchDetail: MatchDetailResp|null = null
  const id = (await params).id;

  try {
    const match = new MatchRepo()
    const response = await match.show(id);
    matchDetail = response.data as MatchDetailResp;
  } catch {
    notFound()
  }
  
  
  return (
    <MatchDetailPage
      matchId={matchDetail.id}
      name={matchDetail.name}
      clientName={matchDetail.client_name}
      publicUrl={matchDetail.public_url}
      image={matchDetail.image}
      channel={matchDetail.channel_id}
    />
  )
}



