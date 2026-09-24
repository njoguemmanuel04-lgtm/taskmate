"use client";
import {useEffect,useState} from "react";
export default function Admin(){
const [jobs,setJobs]=useState<any[]>([]);
useEffect(()=>{setJobs(JSON.parse(localStorage.getItem("taskmate_jobs")||"[]"))},[]);
function del(id:number){const n=jobs.filter((j:any)=>j.id!==id);localStorage.setItem("taskmate_jobs",JSON.stringify(n));setJobs(n);}
return(
<div style={{padding:16,background:"#f0f2f5",minHeight:"100vh"}}>
<h1 style={{fontWeight:"bold",fontSize:22}}>👑 Admin Panel - {jobs.length} Jobs</h1>
<div style={{display:"flex",gap:12,marginTop:12}}>
<div style={{background:"#0a1931",color:"white",padding:16,borderRadius:16,flex:1,textAlign:"center"}}><h1>{jobs.length}</h1><p>Total Jobs</p></div>
<div style={{background:"#00a651",color:"white",padding:16,borderRadius:16,flex:1,textAlign:"center"}}><h1>KES {jobs.length*50}</h1><p>Earnings • 0116982197</p></div>
</div>
<h2 style={{marginTop:16,fontWeight:"bold"}}>All Jobs / Fundis</h2>
{jobs.length===0&&<p style={{marginTop:12,color:"gray"}}>No jobs yet - post one!</p>}
{jobs.map((j:any)=>(
<div key={j.id} style={{background:"white",border:"1px solid #ccc",borderRadius:16,padding:12,marginTop:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div><p style={{fontWeight:"bold"}}>{j.title} - {j.location}</p><p style={{fontSize:12,color:"gray"}}>KES {j.price} • {j.phone} • {j.time}</p></div>
<button onClick={()=>del(j.id)} style={{background:"#ffdddd",color:"red",padding:"6px 12px",borderRadius:20}}>Delete</button>
</div>
))}
<button onClick={()=>location.href='/'} style={{width:"100%",border:"1px solid #333",padding:12,borderRadius:20,marginTop:20}}>← Back Home</button>
</div>
)
}
