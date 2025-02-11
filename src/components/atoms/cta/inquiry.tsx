import HOME from "@/contents/home.json"
import Link from "next/link"
import { PlusIcon } from "../icons/PlusIcon"
import { getEmail } from "@/utils/platform"

export const InquiryCTA = ({ className }: { className?: string }) => (
  <Link
    href={"mailto:" + getEmail() }
    className={`bg-dark text-white w-[258px] h-[52px] text-[20px] flex items-center justify-center font-normal ${className}`}
    title="Hubungi kami"
    target="_blank"
  >
      <PlusIcon className="text-primary h-[18.5px] w-[18.5px]" />
      <div className="ml-2.5 font-medium">
        { HOME.cta }
      </div>
  </Link>
)