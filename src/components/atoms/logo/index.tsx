import Image from "next/image"
import Link from "next/link"

export const Logo = () => (
  <Link
    href="/"
    title="Buka halaman utama"
    className="h-[40px] md:h-[100px] w-[150px] md:w-[200px] overflow-hidden block relative"
  >
    <Image
      src="/images/logo.png"
      width={200}
      height={100}
      loading="eager"
      alt="company logo"
      className="absolute left-0 -top-[3rem] w-[150px] md:w-[200px] h-auto"
    />
  </Link>
) 