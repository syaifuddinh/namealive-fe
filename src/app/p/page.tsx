import { MatchRepo } from "@/repositories/MatchRepo"
import { MatchListResp } from "@/types/match";
import Link from "next/link";

export default async function Home() {
  let matchList: MatchListResp[] = []
  
  try {
    const match = new MatchRepo()
    const response = await match.get();
    matchList = response.data as MatchListResp[];  
  } catch {}
  
  return (
    <>
      <div>
        
        <div className="py-4 bg-white mt-4">
          <p className="text-sm text-gray-600">
          Manage incoming matches
          </p>
        </div>

        <table className="w-full mt-4 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Match name</th>
              <th className="border p-2">Client name</th>
              <th className="border p-2">Public Live URL</th>
            </tr>
          </thead>
          <tbody>
            { matchList.map(item => (
              <tr key={item.id}>
                <td className="border p-2">
                  <Link href={`/p/match/${item.id}`} className="text-blue-600 underline">
                    { item.name }
                  </Link>
                </td>
                <td className="border p-2">
                  { item.client_name }
                </td>
                <td className="border p-2">
                  <a href={ item.public_url } rel="noreferrer" target="_blank" className="text-blue-600 underline">
                  { item.public_url }
                  </a>
                </td>
              </tr>
            )) }
          </tbody>
        </table>
    </div>
    </>
  )
}