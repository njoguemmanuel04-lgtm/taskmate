"use client"
import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
const supabaseUrl = "https://tvgbluiespttqwptpwlj.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2Z2JsdWllc3B0dHF3cHRwd2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwNzA4MDcsImV4cCI6MjEwNTY0NjgwN30.Pmbgxx45ziJCtjrtt2eEzjDAbiVqzq4lqv0Qjn7iqoc"
const supabase = createClient(supabaseUrl, supabaseKey)
export default function Jobs(){
  const [jobs,setJobs]=useState<any[]>([])
  useEffect(()=>{ supabase.from("jobs").select("*").order("id",{ascending:false}).then(({data})=>{ if(data) setJobs(data) }) },[])
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-[#0a1931] text-white p-4 font-bold text-xl">Jobs - Cloud</div>
      <div className="p-4 space-y-4">
        {jobs.map(j=>(
          <div key={j.id} className="bg-white rounded-3xl border-2 border-black p-4">
            <div className="flex justify-between"><b className="text-lg">{j.category}</b><span className="bg-black text-white px-3 py-1 rounded-full text-sm">💰100</span></div>
            <div className="mt-1">Client: <b className="text-lg">{j.name}</b></div>
            <div className="text-sm text-gray-500">{j.phone}</div>
            <div className="mt-3 bg-orange-50 border-2 border-dashed border-orange-500 rounded-2xl p-3 flex justify-between items-center"><div><b>🔒 Locked</b><div className="text-xs">Pay 100 to 0116982197</div></div><button className="bg-[#0a1931] text-white px-6 py-2 rounded-full font-bold">PAY</button></div>
          </div>
        ))}
      </div>
    </div>
  )
}
