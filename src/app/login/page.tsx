import { LoginPage } from "@/components/pages/login";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginApp() {
  const stored = await cookies();
  const token = stored.get("token")?.value
  if(token) redirect("/")
  
  
  return <LoginPage />
}