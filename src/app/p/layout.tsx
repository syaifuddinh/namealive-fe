import type { Metadata } from "next";
import PLATFORM from "@/contents/platform.json"
import { Navigation } from "@/components/atoms/navigation";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: PLATFORM.companyName + " - HOME",
  description: PLATFORM.description,
  openGraph: {
    title: PLATFORM.companyName + " - HOME",
    description: PLATFORM.description
  }
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const stored = await cookies();
  const token = stored.get("token")?.value
  if(!token) redirect("login")

  return (
    <div className="p-6 min-h-screen">
        <Navigation />
        { children }
    </div>
  );
}
