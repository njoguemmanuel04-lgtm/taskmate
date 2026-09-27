"use client"
import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
const supabase = createClient("https://tvgbluiespttqwptpwlj.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2Z2JsdWllc3B0dHF3cHRwd2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwNzA4MDcsImV4cCI6MjEwNTY0NjgwN30.Pmbgxx45ziJCtjrtt2eEzjDAbiVqzq4lqv0Qjn7iqoc")

export default function Admin(){
  const [all,setAll]=useState<any[]>([]); const [filter,setFilter]=useState("all")
  const load=async()=>{
    const {data:jobs}=await supabase.from("jobs").select("*").order("id",{ascending:false})
    const {data:cars}=await supabase.from("cars").select("*").order("id",{ascending:false})
    const {data:lands}=await supabase.from("lands").select("*").order("id",{ascending:false})
    let merged:any[]=[]
    if(jobs) merged=[...merged,...jobs.map((j:any)=>({...j,type:"Job",amount:100,price:"100KSH"}))]
    if(cars) merged=[...merged,...cars.map((c:any)=>({...c,type:"Car",amount:300,price:c.price||"300KSH",displayTitle:c.title||c.make||"Car"}))]
    if(lands) merged=[...merged,...lands.map((l:any)=>({...l,type:"Land",amount:500,price:l.price||"500KSH",displayTitle:l.title}))]
    // sort newest first
    merged.sort((a,b)=>b.id-a.id)
    setAll(merged)
  }
  useEffect(()=>{load()},[])

  const pending=all.filter(a=>a.payment_requested && !a.is_unlocked)
  const paid=all.filter(a=>a.is_unlocked)
  const totalKsh = paid.reduce((s,a)=>s+a.amount,0)
  const totalJobs = all.filter(a=>a.type==="Job").length
  const totalCars = all.filter(a=>a.type==="Car").length
  const totalLands = all.filter(a=>a.type==="Land").length

  let shown=all
  if(filter==="pending") shown=pending
  if(filter==="paid") shown=paid

  const verify=async(item:any)=>{
    const table = item.type==="Job"?"jobs":item.type==="Car"?"cars":"lands"
    await supabase.from(table).update({is_unlocked:true,payment_requested:false}).eq("id",item.id)
    alert(`✅ Verified ${item.amount}KSH!`); load()
  }
  const reject=async(item:any)=>{
    const table = item.type==="Job"?"jobs":item.type==="Car"?"cars":"lands"
    await supabase.from(table).update({payment_requested:false,is_unlocked:false}).eq("id",item.id)
    alert("❌ Rejected"); load()
  }
  const del=async(item:any)=>{
    if(!confirm("Delete?")) return
    const table = item.type==="Job"?"jobs":item.type==="Car"?"cars":"lands"
    await supabase.from(table).delete().eq("id",item.id)
    load()
  }

  return(
    <div className="min-h-screen bg-[#f0f2f5] p-3">
      <div className="font-bold text-xl">🔑 Admin - 0116982197</div>
      <div className="text-green-600 font-bold text-sm">M-Pesa SEND MONEY - Check SMS</div>

      <div className="grid grid-cols-4 gap-2 mt-3">
        <div className="bg-white border-2 border-black rounded-2xl p-2 text-sm font-bold">Total<br/>Jobs:{totalJobs}<br/>Cars:{totalCars}<br/>Lands:{totalLands}</div>
        <div className="bg-orange-500 text-white rounded-2xl p-2 font-black">Pending<br/>{pending.length}</div>
        <div className="bg-green-500 text-white rounded-2xl p-2 font-black">Paid:{paid.length}</div>
        <div className="bg-black text-white rounded-2xl p-2 font-black">Ksh {totalKsh}</div>
      </div>

      <div className="grid grid-cols-4 gap-2 mt-4">
        <button onClick={()=>setFilter("pending")} className={`border-2 border-black rounded-full p-2 font-bold ${filter==="pending"?"bg-black text-white":"bg-white"}`}>⏳<br/>Pending {pending.length}</button>
        <button onClick={()=>setFilter("paid")} className={`border-2 border-black rounded-full p-2 font-bold ${filter==="paid"?"bg-black text-white":"bg-white"}`}>✅ Paid<br/>{paid.length}</button>
        <button onClick={()=>setFilter("all")} className={`border-2 border-black rounded-full p-2 font-bold ${filter==="all"?"bg-black text-white":"bg-white"}`}>All<br/>{all.length}</button>
        <button onClick={load} className="bg-blue-400 border-2 border-black rounded-full p-2 font-bold">🔄<br/>Refresh</button>
      </div>

      <div className="mt-4 space-y-3 pb-20">
        {shown.map(item=>(
          <div key={`${item.type}-${item.id}`} className="bg-white border-2 border-black rounded-2xl p-3">
            <div className="font-bold">
              {item.displayTitle||item.title} {item.type==="Car"?"🚗":item.type==="Land"?"🏞️":"🔧"} {item.price} - {item.amount}KSH {item.type==="Land"?<span className="bg-green-200 px-2 rounded-full text-xs">LAND 500</span>:item.type==="Car"?<span className="bg-yellow-200 px-2 rounded-full text-xs">CAR 300</span>:<span className="bg-blue-200 px-2 rounded-full text-xs">JOB 100</span>}
            </div>
            <div className="text-sm">{item.phone||item.phone_number} - {item.is_unlocked?"✅ Paid":item.payment_requested?"⏳ Pending":"🔒 Locked"}</div>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <button onClick={()=>verify(item)} className="bg-green-600 text-white py-2 rounded-full font-black">✅ VERIFY</button>
              <button onClick={()=>reject(item)} className="bg-orange-500 text-white py-2 rounded-full font-black">❌ REJECT</button>
              <button onClick={()=>del(item)} className="bg-red-600 text-white py-2 rounded-full font-black">🗑️ DELETE</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
