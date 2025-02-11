"use client"

import Error from "next/error";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter()
  
  
  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      router.replace("/")
    } catch  {
      setError("Invalid email or password");
    } 
    setLoading(false);
  };
  
  return (
    <>
      <div className="flex h-screen items-center justify-center bg-gray">
        <div className="flex w-[900px] bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="w-1/2 p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">NAMEALIVE</h1>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Sign In</h2>
            <p className="text-gray-500 mb-6">Sign in to continue to Namea Live Dashboard</p>
            
            <div className="space-y-4">
              <div className="relative flex items-center border border-gray-300 rounded-md">
                <span className="px-3 text-gray-500">📧</span>
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full p-2 border-none focus:ring-0 focus:outline-none"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative flex items-center border border-gray-300 rounded-md">
                <span className="px-3 text-gray-500">🔒</span>
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full p-2 border-none focus:ring-0 focus:outline-none"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => { if(e.code === "Enter") handleLogin() }}
                />
                <button className="px-3 text-gray-500">👁️</button>
              </div>
            </div>
            
            <div className="flex justify-end items-center my-4">
              <a href="#" className="text-blue-500 text-sm hidden">Forgot password?</a>
            </div>

            { error && (
              <div className="text-danger text-sm font-medium pb-2">
                { error }
              </div>
            ) }
            
            <button
              className={`w-full ${loading || (!email || !password) ? "bg-gray cursor-not-allowed" : "bg-teal-500"} text-white py-2 rounded-md flex items-center justify-center`}
              onClick={handleLogin}
            >
              { loading ? "Loading..." : "Login" }
            </button>
          </div>

          <div className="w-1/2">
            <Image 
              src="/images/login/ilustration.webp" 
              alt="Illustration" 
              className="w-full h-full object-cover"
              width={200}
              height={200}
            />
          </div>
        </div>
      </div>
    </>
  )
}