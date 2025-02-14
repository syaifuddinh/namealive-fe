"use client"

import { Breadcrumb } from "@/components/atoms/breadcrumb";
import { BreadcrumbParams } from "@/types/ui";
import { Field } from "@/components/atoms/field";

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
    breadcrumbContent[1].content = name.toUpperCase()
    console.log({ matchId, channel })
    
    return (
        <>
          <div className="pt-8">
              <div className="flex justify-between items-center">
                <Breadcrumb contents={breadcrumbContent} />
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