import PLATFORM from "@/contents/platform.json"
import Link from "next/link"

export const Footer = ({ 
  head,
  width = "120px"
}: { 
  head?: React.ReactNode 
  width?: string;
}) => (
  <div
      className={`relative bg-dark text-light text-[10px] flex flex-col items-end justify-end pr-4 pb-[45px] h-full`} 
      style={{"width": width}}
  >
      { head && <>{ head }</> }
      
      <div className="flex flex-col gap-1 capitalize text-right">
        { PLATFORM.contacts.map(item => (
          <Link
            key={item.id}
            href={item.slug + item.value}
            target="_blank"
            className="underline"
          >
            { item.title }
          </Link>
        )) }
      </div>
     
      <div className="mt-9">
        { PLATFORM.companyName } ⓒ { (new Date().getFullYear()) }
      </div>
    </div>
)