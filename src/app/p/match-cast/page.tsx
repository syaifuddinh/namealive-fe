import Link from "next/link"

export default async function MatchDetailApp() {
  
  return (
    <div>
        
        <div className="py-4 bg-white mt-4">
          <p className="text-sm text-gray-600">
          Broadcasting matches
          </p>
        </div>

        <table className="w-full mt-4 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Match name</th>
              <th className="border p-2">Kick-off </th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td className="border p-2">
                  <Link href={`/p/match-cast/1`} className="text-blue-600 underline">
                    Singapore vs Thailand
                  </Link>
                </td>
                <td className="border p-2">
                  Today, 19:00
                </td>
              </tr>
          </tbody>
        </table>
    </div>
  )
}



