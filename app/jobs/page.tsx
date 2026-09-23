"use client"
import { useRouter } from "next/navigation"
export default function Jobs(){
  const r=useRouter()
  return (
    <div className="p-6 bg-[#f5f7fa] min-h-screen">
      <h1 className="font-black text-xl">💼 Jobs</h1>
      <p className="mt-4 bg-white p-4 rounded-2xl text-sm">Jobs posted will appear here. Go post one!</p>
      <button onClick={()=>r.push("/post")} className="mt-4 w-full bg-[#0f2a54] text-white p-3 rounded-full font-bold">+ Post New Job</button>
      <button onClick={()=>r.push("/")} className="mt-3 w-full border p-3 rounded-full">← Home</button>
    </div>
  )
}
