"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function Admin(){
  const [jobs,setJobs]=useState<any[]>([]);
  const [cars,setCars]=useState<any[]>([]);
  const fetchAll=async()=>{
    const j=await supabase.from("taskmate_jobs").select("*").order("created_at",{ascending:false});
    const c=await supabase.from("taskmate_cars").select("*").order("created_at",{ascending:false});
    if(j.data) setJobs(j.data); if(c.data) setCars(c.data);
  }
  useEffect(()=>{fetchAll()},[]);
  const unlock=async(table:string,id:number)=>{ await supabase.from(table).update({status:"unlocked"}).eq("id",id); fetchAll(); alert("Unlocked!"); }
  const del=async(table:string,id:number)=>{ if(!confirm("Delete?")) return; await supabase.from(table).delete().eq("id",id); fetchAll(); }

  return <div className="p-4 max-w-lg mx-auto pb-20">
    <h1 className="font-black text-xl">👑 ADMIN - M-Pesa 0116982197</h1>
    <h2 className="font-bold mt-6 bg-yellow-100 p-2 rounded">⏳ Pending JOBS (Ksh 200)</h2>
    {jobs.filter((j:any)=>j.status==="pending").length===0 && <p className="text-xs p-2">No pending jobs</p>}
    {jobs.filter((j:any)=>j.status==="pending").map((j:any)=><div key={j.id} className="border p-3 rounded mt-2 bg-white"><p className="font-bold">{j.title}</p><p className="text-xs">{j.budget} - {j.phone}</p><button onClick={()=>unlock("taskmate_jobs",j.id)} className="bg-green-600 text-white px-4 py-2 rounded font-bold mt-2 mr-2">Verify & Unlock</button><button onClick={()=>del("taskmate_jobs",j.id)} className="text-red-600 text-xs">Delete</button></div>)}
    
    <h2 className="font-bold mt-6 bg-green-100 p-2 rounded">⏳ Pending CARS (Ksh 500)</h2>
    {cars.filter((c:any)=>c.status==="pending").length===0 && <p className="text-xs p-2">No pending cars</p>}
    {cars.filter((c:any)=>c.status==="pending").map((c:any)=><div key={c.id} className="border p-3 rounded mt-2 bg-white"><img src={c.image} className="h-24"/><p className="font-bold">{c.make} - {c.price}</p><p className="text-xs">{c.phone}</p><button onClick={()=>unlock("taskmate_cars",c.id)} className="bg-green-600 text-white px-4 py-2 rounded font-bold mt-2 mr-2">Verify & Unlock</button><button onClick={()=>del("taskmate_cars",c.id)} className="text-red-600 text-xs">Delete</button></div>)}
    
    <h2 className="font-bold mt-8">All Jobs ({jobs.length})</h2>
    {jobs.map((j:any)=><div key={j.id} className="flex justify-between text-xs border-b py-1"><span>{j.title} - {j.status}</span><button onClick={()=>del("taskmate_jobs",j.id)} className="text-red-600">X</button></div>)}
    <h2 className="font-bold mt-4">All Cars ({cars.length})</h2>
    {cars.map((c:any)=><div key={c.id} className="flex justify-between text-xs border-b py-1"><span>{c.make} - {c.status}</span><button onClick={()=>del("taskmate_cars",c.id)} className="text-red-600">X</button></div>)}
  </div>
}
