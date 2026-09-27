"use client"
import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
const supabaseUrl = "https://tvgbluiespttqwptpwlj.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2Z2JsdWllc3B0dHF3cHRwd2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwNzA4MDcsImV4cCI6MjEwNTY0NjgwN30.Pmbgxx45ziJCtjrtt2eEzjDAbiVqzq4lqv0Qjn7iqoc"
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Admin(){
  const [jobs,setJobs]=useState<any[]>([])
  const [filter,setFilter]=useState("all")
  const load = async () => {
    const {data} = await supabase.from("jobs").select("*").order("id",{ascending:false})
    if(data) setJobs(data)
  }
  useEffect(()=>{ load() },[])

  const pending = jobs.filter(j=>j.payment_requested && !j.is_unlocked)
  const paid = jobs.filter(j=>j.is_unlocked)

  const verify = async (id:number) => {
    await supabase.from("jobs").update({is_unlocked:true, payment_requested:false}).eq("id", id)
    load()
  }
  const reject = async (id:number) => {
    await supabase.from("jobs").update({is_unlocked:false, payment_requested:false}).eq("id", id)
    alert("Rejected! Fundi will need to pay again")
    load()
  }
  const del = async (id:number) => {
    if(confirm("Delete this job forever?")){
      await supabase.from("jobs").delete().eq("id", id)
      load()
    }
  }

  const list = filter==="pending" ? pending : filter==="paid" ? paid : jobs

  return (
    <div className="min-h-screen bg-[#f2f4f7] p-4">
      <div className="font-bold text-xl">🔑 Admin - 0116982197</div>
      <div className="text-green-600 font-bold text-sm">M-Pesa SEND MONEY - Check SMS</div>
      
      <div className="grid grid-cols-4 gap-2 mt-4">
        <div className="bg-white rounded-2xl p-3 font-bold text-sm">Total<br/>Jobs:{jobs.length}<br/>Land:0</div>
        <div className="bg-orange-500 text-white rounded-2xl p-3 font-bold">Pending<br/>{pending.length}</div>
        <div className="bg-green-500 text-white rounded-2xl p-3 font-bold">Paid:{paid.length}</div>
        <div className="bg-black text-white rounded-2xl p-3">Ksh {paid.length*100}</div>
      </div>

      <div className="flex gap-2 mt-4 overflow-auto">
        <button onClick={()=>setFilter("pending")} className={`px-4 py-2 rounded-full font-bold ${filter==="pending"?"bg-orange-500 text-white":"bg-orange-100"}`}>⏳ Pending {pending.length}</button>
        <button onClick={()=>setFilter("paid")} className={`px-4 py-2 rounded-full font-bold ${filter==="paid"?"bg-green-500 text-white":"bg-white"}`}>✅ Paid {paid.length}</button>
        <button onClick={()=>setFilter("all")} className={`px-4 py-2 rounded-full font-bold ${filter==="all"?"bg-black text-white":"bg-black text-white"}`}>All {jobs.length}</button>
        <button onClick={load} className="px-4 py-2 rounded-full bg-blue-500 text-white">🔄 Refresh</button>
      </div>

      <div className="mt-6 space-y-3">
        {list.map(j=>(
          <div key={j.id} className="bg-white rounded-2xl p-4 border-2 border-black">
            <div className="flex justify-between">
              <div><b>{j.name}</b> - {j.category}<br/><span className="text-sm">{j.phone}</span><br/>
              {j.payment_requested && !j.is_unlocked && <span className="bg-yellow-200 text-xs px-2 py-1 rounded">⏳ I HAVE PAID</span>}
              {j.is_unlocked && <span className="bg-green-200 text-xs px-2 py-1 rounded">✅ Paid & Unlocked</span>}
              {!j.payment_requested && !j.is_unlocked && <span className="bg-gray-200 text-xs px-2 py-1 rounded">🔒 Locked</span>}
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button onClick={()=>verify(j.id)} className="bg-green-600 text-white px-4 py-2 rounded-full font-bold flex-1">✅ VERIFY</button>
              <button onClick={()=>reject(j.id)} className="bg-orange-500 text-white px-4 py-2 rounded-full font-bold flex-1">❌ REJECT</button>
              <button onClick={()=>del(j.id)} className="bg-red-600 text-white px-4 py-2 rounded-full font-bold flex-1">🗑️ DELETE</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
