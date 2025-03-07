"use client"

import { useState } from "react"
import Link from "next/link";

export const Navigation = () => {
  const [isProfileVisible, setIsProfileVisible] = useState<boolean>(false);

  const onProfileClick = () => {
    setIsProfileVisible(true);
  }
  
  return (
      <nav className="bg-white shadow pt-4 px-4">
          <div className="flex items-center justify-between  ">
            <div>
              <div className="flex items-center space-x-4">
                <Link href="/">
                  <span className="text-lg font-bold text-gray-700">NAMEALIVE</span>
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  className="w-8 h-8 rounded-full bg-pink-500 text-white"
                  onClick={onProfileClick}
                >
                    A
                  </button>
                { isProfileVisible && (
                    <Profile className="absolute top-[102%] right-0" />
                ) }
              </div>
            </div>
          </div>

          <MenuNavigation />
      </nav>
    
  )
}

const Profile = ({ className }: { className?: string }) => (
  <div
    className={`${className} w-80 bg-white shadow-lg rounded-lg`}
  >
      <div className="px-4">
          <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-pink-500 flex items-center justify-center rounded-full text-white text-2xl font-medium">
                    A
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Admin</h2>
                    <p className="text-gray-500 text-sm">admin@gmail.com</p>
                </div>
            </div>
      </div>
        
      <div className="px-4 py-2.5 mt-4 flex justify-end bg-gray200">
          <form action={"/api/logout"} method="POST">
            <button
              type="submit"
              className="text-xs border border-gray-300 py-2 px-4 rounded text-gray-700 hover:bg-gray-100"
            >
              Sign out
            </button>
          </form>
      </div>
    </div>
)

const menus = [
  {
    "url": "/p",
    "name": "Match"
  },
  {
    "url": "/p/match-cast",
    "name": "Match Cast"
  }
]

const MenuNavigation = () => (
  <div className="flex mt-2">
      {
        menus.map((menu) => (
          <Link key={menu.url} href={menu.url} className="text-sm pb-4 px-2 text-gray100">
            { menu.name }
          </Link>
        ))
      }
  </div>
)