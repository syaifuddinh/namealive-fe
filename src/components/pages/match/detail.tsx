"use client"

import { Breadcrumb } from "@/components/atoms/breadcrumb";
import { BreadcrumbParams } from "@/types/ui";
import { BroadcastButton } from "@/components/atoms/button/broadcast";
import { MatchDetailHook } from "@/hooks/match/MatchDetailHook";
import { UnpublishButton } from "@/components/atoms/button/unpublish";

const breadcrumbContent: BreadcrumbParams[] = [
  {
    "url": "/p",
    "content": "MATCH"
  },
  {
    "url": "#",
    "content": ""
  }
]

export const MatchDetailPage = ({ 
    matchId,
    name,
    clientName,
    publicUrl,
    image,
    channel
 }: {
    matchId: string;
    name: string;
    clientName: string;
    publicUrl: string;
    image: string;
    channel: string;
 }) => {
    breadcrumbContent[1].content = name
    const match = MatchDetailHook(matchId, channel, image)
    
    return (
        <>
          <div className="pt-8">
            <div className="flex justify-between items-center">
              <Breadcrumb contents={breadcrumbContent} />
                { match.status == "ongoing" && (
                    <UnpublishButton 
                      disabled={match.isLiveLoading}
                      onClick={match.stop} 
                    />
                ) }

                { match.status == "idle" && (
                    <BroadcastButton
                      disabled={match.isLiveLoading}
                      onClick={match.start}
                    />
                ) }
            </div>
            
              
            <div className="py-4 flex flex-col gap-3 bg-white mt-4 text-sm text-gray-600">
              <Field label="Match name">
                { name }
              </Field>
              <Field label="Client Name">
              { clientName }
              </Field>
              <Field label="Public Live URL">
                <a href={publicUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                  { publicUrl }
                </a>
              </Field>
              <Field label="Brand logo">
                <img
                  src={image}
                  className="w-[9rem] h-auto"
                  alt="brand logo"
                  width={100}
                  height={100}
                />
              </Field>
            </div>
        </div>
        </>
      )
}

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="flex">
      <p className="font-medium w-[9rem]">
        { label }
      </p>
  
      <p className="">
        { children }
      </p>
  </div>
)