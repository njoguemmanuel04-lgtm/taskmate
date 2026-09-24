"use client";
import {useEffect,useState} from "react";
export default function Jobs(){
const [jobs,setJobs]=useState<any[]>([]);
useEffect(()=>{
const s=JSON.parse(localStorage.getItem("taskmate_jobs")||"[]");
setJobs(s);
},[]);
return(
<div style={{padding:16,background:"#eef2f7",minHeight:"100vh"}}>
<div style={{display:"flex",alignItems:"center",gap:10}}><button onClick={()=>location.href='/'}>←</button><h1 style={{fontWeight:"bold",fontSize:20}}>Available Jobs - Kirinyaga</h1></div>
{jobs.length===0&&<div style={{background:"white",padding:20,borderRadius:16,marginTop:16,textAlign:"center"}}><p>No jobs yet - Be first to post!</p><button onClick={()=>location.href='/post-job'} style={{background:"#0a1931",color:"white",padding:"10px 20px",borderRadius:20,marginTop:10}}>Post Job</button></div>}
{jobs.map((j:any,i:number)=>(
<div key={i} style={{background:"white",borderRadius:16,padding:16,marginTop:12}}>
<h2 style={{fontWeight:"bold"}}>{j.title} - {j.location}</h2>
<p style={{color:"gray",fontSize:13}}>KES {j.price} • {j.time} • {j.phone}</p>
<button onClick={()=>window.open(`https://wa.me/254${j.phone.slice(1)}?text=Hi, naitaji ${j.title} ${j.location}`)} style={{background:"#0a1931",color:"white",padding:"8px 16px",borderRadius:20,marginTop:8}}>Apply via WhatsApp</button>
</div>
))}
</div>
)
}
