"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ADMIN_PASSWORD = "Mwea2026"; // YOUR PASSWORD - Change this!

export default function AdminDashboard() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);
  const [newBudget, setNewBudget] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [passInput, setPassInput] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("taskmate_admin");
    if (saved === ADMIN_PASSWORD) setIsAuth(true);
    if (localStorage.getItem("taskmate_admin") === ADMIN_PASSWORD) fetchJobs();
    else setLoading(false);
  }, []);

  async function fetchJobs() {
    setLoading(true);
    const { data } = await supabase.from("jobs").select("*").order("created_at", { ascending: false });
    setJobs(data || []);
    setLoading(false);
  }

  function login() {
    if (passInput === ADMIN_PASSWORD) {
      localStorage.setItem("taskmate_admin", ADMIN_PASSWORD);
      setIsAuth(true);
      fetchJobs();
    } else {
      alert("Wrong password!");
    }
  }

  function logout() {
    localStorage.removeItem("taskmate_admin");
    setIsAuth(false);
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

  if (!isAuth) {
    return (
      <div style={{minHeight:"100vh",background:"black",color:"white",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
        <div style={{background:"#18181b",padding:24,borderRadius:16,width:"100%",maxWidth:350,border:"1px solid #27272a"}}>
          <h1 style={{fontSize:20,fontWeight:"bold",marginBottom:12}}>🔒 TaskMate Admin Login</h1>
          <input value={passInput} onChange={e=>setPassInput(e.target.value)} type="password" placeholder="Enter password" style={{width:"100%",padding:12,borderRadius:8,background:"black",border:"1px solid #444",color:"white",marginBottom:12}} />
          <button onClick={login} style={{width:"100%",background:"#22c55e",padding:12,borderRadius:8,fontWeight:"bold"}}>Login</button>
          <p style={{fontSize:12,color:"#666",marginTop:10}}>Default: Mwea2026</p>
        </div>
      </div>
    );
  }

  if (loading) return <div style={{padding:40,color:"white",background:"black",minHeight:"100vh"}}>Loading...</div>;

  return (
    <div style={{minHeight:"100vh",background:"black",color:"white",padding:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div>
          <h1 style={{fontSize:24,fontWeight:"bold"}}>TaskMate Admin 🔧 V3</h1>
          <p style={{color:"#888"}}>Jobs: {jobs.length} | Total KES {jobs.reduce((s,j)=>s+(j.budget||0),0)}</p>
        </div>
        <button onClick={logout} style={{background:"#333",padding:"6px 12px",borderRadius:8,fontSize:12}}>Logout</button>
      </div>

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
