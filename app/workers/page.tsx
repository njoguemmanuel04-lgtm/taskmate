"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function Workers() {
  const [workers, setWorkers] = useState<any[]>([]);
  const [form, setForm] = useState({name:"", skill:"", location:"Mwea", phone:"", rate:""});
  useEffect(()=>{fetchWorkers()},[]);
  async function fetchWorkers(){
    const {data} = await supabase.from("workers").select("*").order("created_at",{ascending:false});
    setWorkers(data||[]);
  }
  async function addWorker(){
    if(!form.name||!form.skill||!form.phone) return alert("Fill all!");
    await supabase.from("workers").insert([{...form, rate: Number(form.rate)}]);
    setForm({name:"", skill:"", location:"Mwea", phone:"", rate:""});
    fetchWorkers();
  }
  return (
    <div style={{minHeight:"100vh",background:"black",color:"white",padding:16}}>
      <h1 style={{fontSize:24,fontWeight:"bold",marginBottom:12}}>👷 Workers - {workers.length}</h1>
      <div style={{background:"#18181b",padding:16,borderRadius:12,marginBottom:20,border:"1px solid #27272a"}}>
        <h3 style={{fontWeight:"bold",marginBottom:8}}>Add Worker</h3>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={{width:"100%",padding:10,marginBottom:8,borderRadius:8,background:"black",border:"1px solid #444",color:"white"}} />
        <input placeholder="Skill (Electric, Cooking)" value={form.skill} onChange={e=>setForm({...form,skill:e.target.value})} style={{width:"100%",padding:10,marginBottom:8,borderRadius:8,background:"black",border:"1px solid #444",color:"white"}} />
        <input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} style={{width:"100%",padding:10,marginBottom:8,borderRadius:8,background:"black",border:"1px solid #444",color:"white"}} />
        <input placeholder="Rate KES/day" type="number" value={form.rate} onChange={e=>setForm({...form,rate:e.target.value})} style={{width:"100%",padding:10,marginBottom:8,borderRadius:8,background:"black",border:"1px solid #444",color:"white"}} />
        <button onClick={addWorker} style={{width:"100%",background:"#22c55e",padding:12,borderRadius:8,fontWeight:"bold"}}>Add Worker</button>
      </div>
      {workers.map((w:any)=>(
        <div key={w.id} style={{background:"#18181b",padding:16,borderRadius:12,marginBottom:12,border:"1px solid #27272a"}}>
          <h3 style={{fontWeight:"bold"}}>{w.name} 👷</h3>
          <p style={{color:"#aaa",fontSize:14}}>🛠️ {w.skill} | 📍 {w.location} | 💰 KES {w.rate}/day</p>
          <p style={{color:"#22c55e",fontSize:14}}>📞 {w.phone}</p>
        </div>
      ))}
    </div>
  );
}
