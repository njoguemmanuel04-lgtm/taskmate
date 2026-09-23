"use client"
import { useRouter } from "next/navigation"
import { useEffect,useState } from "react"
export default function Earn(){
  const r=useRouter()
  const [c,setC]=useState(0)
  useEffect(()=>{setC(JSON.parse(localStorage.getItem("unlocked_fundis")||"[]").length)},[])
  return <div className="p-6"><h1 className="font-bold text-xl">💰 Earnings</h1><div className="mt-4 bg-[#0f2a54] text-white p-6 rounded-2xl text-center"><p className="text-3xl font-black">KES {c*50}</p><p className="text-xs">{c} unlocks × 50 • 0116982197</p></div><button onClick={()=>r.push("/")} className="mt-6 w-full border p-3 rounded-full">← Home</button></div>
}
