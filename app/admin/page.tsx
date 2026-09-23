"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminDashboard() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);
  const [newBudget, setNewBudget] = useState("");

  useEffect(() => { fetchJobs(); }, []);

  async function fetchJobs() {
    const { data } = await supabase.from("jobs").select("*").order("created_at", { ascending: false });
    setJobs(data || []);
    setLoading(false);
  }

  async function deleteJob(id: string) {
    if (!confirm("Delete this job?")) return;
    await supabase.from("jobs").delete().eq("id", id);
    fetchJobs();
  }

  async function updateBudget() {
    if (!editing) return;
    await supabase.from("jobs").update({ budget: Number(newBudget) }).eq("id", editing.id);
    setEditing(null);
    setNewBudget("");
    fetchJobs();
  }

  if (loading) return <div style={{padding:40,color:"white",background:"black",minHeight:"100vh"}}>Loading...</div>;

  return (
    <div style={{minHeight:"100vh",background:"black",color:"white",padding:16}}>
      <h1 style={{fontSize:24,fontWeight:"bold"}}>TaskMate Admin 🔧 V2</h1>
      <p style={{color:"#888",marginBottom:20}}>Jobs: {jobs.length} | Total KES {jobs.reduce((s,j)=>s+(j.budget||0),0)}</p>

      {editing && (
        <div style={{background:"#27272a",padding:16,borderRadius:12,marginBottom:16,border:"1px solid #22c55e"}}>
          <h3 style={{fontWeight:"bold",marginBottom:8}}>Edit {editing.title}</h3>
          <input value={newBudget} onChange={e=>setNewBudget(e.target.value)} type="number" placeholder="New price" style={{width:"100%",padding:10,borderRadius:8,background:"black",border:"1px solid #444",color:"white",marginBottom:10}} />
          <div style={{display:"flex",gap:8}}>
            <button onClick={updateBudget} style={{background:"#22c55e",padding:"8px 16px",borderRadius:8,flex:1}}>Save</button>
            <button onClick={()=>setEditing(null)} style={{background:"#444",padding:"8px 16px",borderRadius:8,flex:1}}>Cancel</button>
          </div>
        </div>
      )}

      <div>
        {jobs.map((job) => (
          <div key={job.id} style={{background:"#18181b",padding:16,borderRadius:12,marginBottom:12,border:"1px solid #27272a"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <h3 style={{fontWeight:"bold"}}>{job.title}</h3>
                <p style={{fontSize:14,color:"#aaa"}}>📍 {job.location} | 💰 KES {job.budget}</p>
              </div>
              <div style={{display:"flex",gap:6}}>
                <button onClick={()=>{setEditing(job); setNewBudget(job.budget)}} style={{background:"#2563eb",padding:"6px 12px",borderRadius:8,fontSize:14}}>Edit</button>
                <button onClick={()=>deleteJob(job.id)} style={{background:"#dc2626",padding:"6px 12px",borderRadius:8,fontSize:14}}>Del</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
