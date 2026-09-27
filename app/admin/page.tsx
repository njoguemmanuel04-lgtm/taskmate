"use client"
import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
const supabaseUrl = "https://tvgbluiespttqwptpwlj.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2Z2JsdWllc3B0dHF3cHRwd2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwNzA4MDcsImV4cCI6MjEwNTY0NjgwN30.Pmbgxx45ziJCtjrtt2eEzjDAbiVqzq4lqv0Qjn7iqoc"
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Admin(){
  const [jobs,setJobs]=useState<any[]>([])
  const load = async () => {
    const {data} = await supabase.from("jobs").select("*").order("id",{ascending:false})
    if(data) setJobs(data)
  }
  useEffect(()=>{ load() },[])

  const unlock = async (id:number) => {
    await supabase.from("jobs").update({is_unlocked:true, payment_requested:false}).eq("id", id)
    alert("✅ Verified! Number unlocked for fundi!")
    load()
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl font-bold mb-4">🔐 ADMIN - Verify Payments</h1>
      {jobs.filter(j=>j.payment_requested).length===0 && <div className="text-gray-400">No pending payments - All good!</div>}
      <div className="space-y-3">
        {jobs.filter(j=>j.payment_requested && !j.is_unlocked).map(j=>(
          <div key={j.id} className="bg-white text-black p-4 rounded-2xl flex justify-between items-center">
            <div>
              <b>{j.category}</b> - {j.name}<br/>
              <span className="text-sm">{j.phone}</span><br/>
              <span className="bg-yellow-200 px-2 py-1 rounded text-xs">⏳ I HAVE PAID - Verify?</span>
            </div>
            <button onClick={()=>unlock(j.id)} className="bg-green-600 text-white px-6 py-3 rounded-full font-bold">VERIFY & UNLOCK</button>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <h2 className="font-bold">All Jobs</h2>
        {jobs.map(j=>(
          <div key={j.id} className="text-sm bg-gray-900 p-2 mt-2 rounded">{j.name} - {j.category} - {j.is_unlocked ? "✅ Unlocked" : j.payment_requested ? "⏳ Waiting" : "🔒 Locked"}</div>
        ))}
      </div>
    </div>
  )
}
