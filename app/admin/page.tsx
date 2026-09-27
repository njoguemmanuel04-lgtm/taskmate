"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function Admin(){
  const [jobs,setJobs]=useState<any[]>([]);
  const [lands,setLands]=useState<any[]>([]);
  const [cars,setCars]=useState<any[]>([]);
  const [tab,setTab]=useState("pending");
  const [code,setCode]=useState<{[k:number]:string}>({});

  const fetchAll=async()=>{
    const j=await supabase.from("taskmate_jobs").select("*").order("created_at",{ascending:false});
    const l=await supabase.from("taskmate_lands").select("*").order("created_at",{ascending:false});
    const c=await supabase.from("taskmate_cars").select("*").order("created_at",{ascending:false});
    if(j.data) setJobs(j.data);
    if(l.data) setLands(l.data);
    if(c.data) setCars(c.data);
  }
  useEffect(()=>{fetchAll()},[]);

  const allPending=[...jobs.filter((x:any)=>x.status==="pending").map((x:any)=>({...x,type:"Job",price:"200"})), ...lands.filter((x:any)=>x.status==="pending").map((x:any)=>({...x,type:"Land",price:"500"})), ...cars.filter((x:any)=>x.status==="pending").map((x:any)=>({...x,type:"Car",price:"500"}))];
  const allPaid=[...jobs.filter((x:any)=>x.status==="unlocked"), ...lands.filter((x:any)=>x.status==="unlocked"), ...cars.filter((x:any)=>x.status==="unlocked")];
  const earnings=allPaid.length*200; // you can change logic

  const unlock=async(item:any)=>{
    const table=item.type==="Job"?"taskmate_jobs":item.type==="Land"?"taskmate_lands":"taskmate_cars";
    await supabase.from(table).update({status:"unlocked"}).eq("id",item.id);
    fetchAll(); alert("✅ Unlocked!");
  }
  const reject=async(item:any)=>{
    const table=item.type==="Job"?"taskmate_jobs":item.type==="Land"?"taskmate_lands":"taskmate_cars";
    await supabase.from(table).update({status:"locked"}).eq("id",item.id);
    fetchAll();
  }
  const del=async(item:any)=>{
    if(!confirm("Delete forever?")) return;
    const table=item.type==="Job"?"taskmate_jobs":item.type==="Land"?"taskmate_lands":"taskmate_cars";
    await supabase.from(table).delete().eq("id",item.id);
    fetchAll();
  }

  return <div className="p-3 bg-gray-100 min-h-screen pb-20 max-w-md mx-auto">
    <h1 className="font-black text-lg">🔑 Admin - Taskmate SEND MONEY</h1>
    <p className="text-green-700 font-bold text-sm">M-Pesa: 0116982197 (Send Money - Check SMS)</p>

    <div className="grid grid-cols-4 gap-2 mt-3">
      <div className="bg-white p-2 rounded-xl text-sm">Total<br/>Jobs: {jobs.length}<br/>Jobs: 0<br/>Land: {lands.length+ cars.length}</div>
      <div className="bg-orange-400 text-white p-2 rounded-xl">Pending: {allPending.length}</div>
      <div className="bg-green-500 text-white p-2 rounded-xl">Paid: {allPaid.length}</div>
      <div className="bg-black text-white p-2 rounded-xl">Earnings:<br/>Ksh {earnings}</div>
    </div>

    <div className="grid grid-cols-4 gap-2 mt-3">
      <button onClick={()=>setTab("pending")} className={`${tab==="pending"?"bg-orange-400 text-white":"bg-white"} p-3 rounded-xl font-bold text-sm`}>⏳ Pending Verify<br/>{allPending.length} vs 50</button>
      <button onClick={()=>setTab("paid")} className={`${tab==="paid"?"bg-green-500 text-white":"bg-white"} p-3 rounded-xl font-bold text-sm`}>✅ Paid<br/>{allPaid.length}</button>
      <button onClick={()=>setTab("all")} className="bg-black text-white p-3 rounded-xl text-sm">All Jobs</button>
      <button onClick={fetchAll} className="bg-blue-500 text-white p-3 rounded-xl text-sm">🔄 Refresh</button>
    </div>

    <h2 className="font-bold mt-4">⏳ Pending - Check M-Pesa SMS to 0116982197</h2>

    {(tab==="pending"?allPending:tab==="paid"?allPaid:[...jobs,...lands,...cars]).map((item:any, i:number)=>(
      <div key={i} className="bg-white border-l-4 border-orange-400 rounded-xl p-3 mt-3 shadow">
        {item.image && <img src={item.image} className="w-full h-48 object-cover rounded-xl"/>}
        <p className="font-bold mt-2">📍 {item.location||item.title||item.make}...{item.size||item.budget||""}</p>
        <p className="text-sm">💰 Code: Owner: {item.phone}</p>
        <div className="bg-yellow-100 p-2 rounded-lg mt-2 text-sm">
          👉 CHECK SMS: Did you get <b>Ksh{item.price||500}.00</b> to <b>0116982197</b>?<br/>Land: {item.location||item.title||item.make}...{item.size||""}
        </div>
        <div className="flex gap-2 mt-3">
          <button onClick={()=>unlock(item)} className="flex-1 bg-green-600 text-white py-3 rounded-xl font-black">✅ UNLOCK {item.type?.toUpperCase()||"LAND"}</button>
          <button onClick={()=>reject(item)} className="flex-1 bg-orange-400 text-white py-3 rounded-xl font-black">❌ REJECT</button>
          <button onClick={()=>del(item)} className="bg-black text-white px-4 rounded-xl">🗑️</button>
        </div>
      </div>
    ))}
  </div>
}
