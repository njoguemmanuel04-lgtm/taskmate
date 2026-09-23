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

  if (loading) return <div style={{padding:40,color:"white",background:"black",minHeight:"100vh"}}>Loading Admin...</div>;

  return (
    <div style={{minHeight:"100vh",background:"black",color:"white",padding:16}}>
      <h1 style={{fontSize:24,fontWeight:"bold"}}>TaskMate Admin 🔧</h1>
      <p style={{color:"#888",marginBottom:20}}>Total Jobs: {jobs.length} | Total: KES {jobs.reduce((s,j)=>s+(j.budget||0),0)}</p>
      <div>
        {jobs.map((job) => (
          <div key={job.id} style={{background:"#18181b",padding:16,borderRadius:12,marginBottom:12,border:"1px solid #27272a",display:"flex",justifyContent:"space-between"}}>
            <div>
              <h3 style={{fontWeight:"bold"}}>{job.title}</h3>
              <p style={{fontSize:14,color:"#aaa"}}>📍 {job.location} | 💰 KES {job.budget}</p>
            </div>
            <button onClick={()=> deleteJob(job.id)} style={{background:"#dc2626",padding:"4px 12px",borderRadius:8,height:32}}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
