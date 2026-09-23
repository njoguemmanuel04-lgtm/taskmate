"use client"
import { useRouter } from "next/navigation"
export default function Messages(){
  const r=useRouter()
  return <div className="p-6"><h1 className="font-bold text-xl">💬 Messages</h1><p className="mt-4 bg-white p-4 rounded-xl">No messages yet. Unlock a fundi!</p><button onClick={()=>r.push("/")} className="mt-6 bg-[#0f2a54] text-white px-4 py-2 rounded-full">← Home</button></div>
}
