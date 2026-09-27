"use client"
import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
const supabaseUrl = "https://tvgbluiespttqwptpwlj.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2Z2JsdWllc3B0dHF3cHRwd2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwNzA4MDcsImV4cCI6MjEwNTY0NjgwN30.Pmbgxx45ziJCtjrtt2eEzjDAbiVqzq4lqv0Qjn7iqoc"
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Admin(){
  const [jobs,setJobs]=useState<any[]>([])
  const [cars,setCars]=useState<any[]>([])
  const [filter,setFilter]=useState("all")

  const load = async () => {
    const {data:j} = await supabase.from("jobs").select("*").order("id",{ascending:false})
    const {data:c} = await supabase.from("cars").select("*").order("id",{ascending:false})
    if(j) setJobs(j)
    if(c) setCars(c)
  }
  useEffect(()=>{ load() },[])

  const verify = async (table:string,id:number,amount:number) => {
    await supabase.from(table).update({is_unlocked:true}).eq("id",id)
    alert(`✅ VERIFIED ${amount} KSH! Unlocked!`)
    load()
  }
  const reject = async (table:string,id:number) => {
    await supabase.from(table).update({payment_requested:false,is_unlocked:false}).eq("id",id)
    alert("❌ REJECTED! Must pay again")
    load()
  }
  const del = async (table:string,id:number) => {
    if(!confirm("Delete forever?")) return
    await supabase.from(table).delete().eq("id",id)
    load()
  }

  const all = [...jobs.map(j=>({...j,t:"jobs",amt:100})), ...cars.map(c=>({...c,t:"cars",title:c.name,amt:300}))]
  const pending = all.filter((a:any)=>a.payment_requested && !a.is_unlocked)
  const paid = all.filter((a:any)=>a.is_unlocked)
  const show = filter==="pending"? pending : filter==="paid"? paid : all
  const ksh = jobs.filter(j=>j.is_unlocked).length*100 + cars.filter(c=>c.is_unlocked).length*300

  return (
    <div className="min-h-screen bg-[#eef1f5] p-3">
      <div className="font-bold text-[20px]">🔑 Admin - 0116982197</div>
      <div className="text-green-600 font-bold text-[14px]">M-Pesa SEND MONEY - Check SMS</div>

      <div className="grid grid-cols-4 gap-2 mt-3">
        <div className="bg-white rounded-2xl p-3 border"><div className="text-[13px] font-bold">Total<br/>Jobs:{jobs.length}<br/>Cars:{cars.length}</div></div>
        <div className="bg-[#ff7a00] rounded-2xl p-3 text-white font-bold">Pending<br/>{pending.length}</div>
        <div className="bg-[#00d84c] rounded-2xl p-3 text-white font-bold">Paid:{paid.length}</div>
        <div className="bg-black rounded-2xl p-3 text-white font-bold">Ksh {ksh}</div>
      </div>

      <div className="flex gap-2 mt-4">
        <button onClick={()=>setFilter("pending")} className={`px-4 py-2 rounded-full font-bold ${filter==="pending"?"bg-[#ff7a00] text-white":"bg-white border"}`}>⏳ Pending {pending.length}</button>
        <button onClick={()=>setFilter("paid")} className={`px-4 py-2 rounded-full font-bold ${filter==="paid"?"bg-green-500 text-white":"bg-white border"}`}>✅ Paid {paid.length}</button>
        <button onClick={()=>setFilter("all")} className="px-4 py-2 rounded-full font-bold bg-black text-white">All {all.length}</button>
        <button onClick={load} className="px-4 py-2 rounded-full font-bold bg-[#4a90e2] text-white">🔄 Refresh</button>
      </div>

      <div className="mt-4 space-y-3">
        {show.map((item:any)=>(
          <div key={item.t+item.id} className="bg-white rounded-2xl p-3 border">
            <div className="font-bold">{item.title} - {item.location} {item.t==="cars"?`🚗 ${item.price}`:""} - {item.amt}KSH</div>
            <div className="text-sm">{item.phone} - {item.is_unlocked?"✅ UNLOCKED":item.payment_requested?"⏳ WAITING FOR YOU":"🔒 Locked"}</div>
            <div className="flex gap-2 mt-3">
              <button onClick={()=>verify(item.t,item.id,item.amt)} className="flex-1 bg-green-600 text-white py-3 rounded-full font-bold">✅ VERIFY</button>
              <button onClick={()=>reject(item.t,item.id)} className="flex-1 bg-orange-500 text-white py-3 rounded-full font-bold">❌ REJECT</button>
              <button onClick={()=>del(item.t,item.id)} className="flex-1 bg-red-600 text-white py-3 rounded-full font-bold">🗑️ DELETE</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
