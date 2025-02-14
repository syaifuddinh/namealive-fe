"use client"

import { Breadcrumb } from "@/components/atoms/breadcrumb"
import { Field } from "@/components/atoms/field"
import { BroadcastButton } from "@/components/atoms/button/broadcast"
import { UnpublishButton } from "@/components/atoms/button/unpublish"
import { MatchDetailHook } from "@/hooks/match/MatchDetailHook"
import { BreadcrumbParams } from "@/types/ui"

const breadcrumbContent: BreadcrumbParams[] = [
  {
    "url": "/p/match-cast",
    "content": "MATCH CAST"
  },
  {
    "url": "#",
    "content": "SINGAPORE VS THAILAND"
  }
]

const dummyChannel = "channeldummy"

export default function MatchCastDetailApp() {
  const ctrl = MatchDetailHook("1", dummyChannel)
  
  return (
    <div className="pt-8">
        <div className="flex justify-between items-center">
          <Breadcrumb contents={breadcrumbContent} />

          { ctrl.status === "idle" && (
            <BroadcastButton
              disabled={ctrl.isLiveLoading}
              onClick={ctrl.start}
              />
            ) }
          { ctrl.status === "ongoing" && (
            <UnpublishButton
            onClick={ctrl.stop}
            disabled={ctrl.isLiveLoading}
            />
          ) }
        </div>
        
          
        <div className="py-4 flex flex-col gap-3 bg-white mt-4 text-sm text-gray-600">
          <Field key="match" label="Match name">
            SIngapore vs Thailand
          </Field>
          <Field key="kickoff" label="Kick-off">
          Today, 19:00
          </Field>
        </div>
    </div>
  )
}



