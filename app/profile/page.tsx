"use client"
import { useRouter } from "next/navigation"
export default function Profile(){
  const r=useRouter()
  return <div className="p-6"><h1 className="font-bold text-xl">👤 Profile</h1><div className="mt-4 bg-white p-4 rounded-2xl"><p className="font-bold">Emmanuel</p><p className="text-xs">Mwea, Kenya</p><p className="text-sm mt-2">M-PESA: 0116982197</p></div><button onClick={()=>r.push("/")} className="mt-6 bg-[#0f2a54] text-white px-4 py-2 rounded-full">← Home</button></div>
}
