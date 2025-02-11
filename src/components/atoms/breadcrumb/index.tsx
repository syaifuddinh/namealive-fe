import React from "react"
import { BreadcrumbParams } from "@/types/ui"

export const Breadcrumb = ({ contents }: { contents: BreadcrumbParams[] }) => (
  <h1 className="font-bold text-[1.5rem] flex gap-3 items-center">
    {  
      contents.map((item, index) => (
        <React.Fragment key={item.url}>
          <a
            href={item.url}
          >
            { item.content }
          </a>
          { index < contents.length - 1 && (
              <span key={"slash-" + index}>/</span>
          )}
          
        </React.Fragment>
      ))
    }
  </h1>
)