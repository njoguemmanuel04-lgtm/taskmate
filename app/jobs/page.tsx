"use client";
import {useEffect,useState} from "react";
export default function Jobs(){
const [jobs,setJobs]=useState<any[]>([]);
const [paid,setPaid]=useState<{[key:number]:boolean}>({});
const [showPay,setShowPay]=useState<number|null>(null);
useEffect(()=>{setJobs(JSON.parse(localStorage.getItem("taskmate_jobs")||"[]"))},[]);
return(
<div style={{padding:16,background:"#eef2f7",minHeight:"100vh"}}>
<div style={{display:"flex",alignItems:"center",gap:10}}><button onClick={()=>location.href='/'}>←</button><h1 style={{fontWeight:"bold",fontSize:20}}>Available Jobs - Kirinyaga</h1></div>
{jobs.map((j:any,i:number)=>(
<div key={i} style={{background:"white",borderRadius:16,padding:16,marginTop:12}}>
<h2 style={{fontWeight:"bold"}}>{j.title} - {j.location}</h2>
<p style={{color:"gray",fontSize:13}}>KES {j.price} • {j.time} • Client: {paid[i]?j.phone:"07XX XXX"}</p>
{showPay===i? (
<div style={{background:"#d1f5d9",padding:14,borderRadius:12,marginTop:10,border:"2px solid #00a651"}}>
<p style={{fontWeight:"bold"}}>💰 SEND MONEY KES 50</p>
<p style={{fontSize:14,marginTop:6}}>To: <b>0116982197</b></p>
<p style={{fontSize:13}}>Name: Emmanuel Njogu</p>
<div style={{background:"white",padding:8,borderRadius:8,marginTop:8}}>
<p style={{fontSize:11}}>1. M-Pesa → Send Money</p>
<p style={{fontSize:11}}>2. Number: 0116982197</p>
<p style={{fontSize:11}}>3. Amount: 50</p>
</div>
<div style={{display:"flex",gap:8,marginTop:10}}>
<button onClick={()=>{const np={...paid,[i]:true};setPaid(np);setShowPay(null);window.open(`https://wa.me/254${j.phone.slice(1)}?text=Hi, I paid 50 for ${j.title} ${j.location}`)}} style={{background:"#00a651",color:"white",padding:"10px 14px",borderRadius:20,fontWeight:"bold"}}>✅ I Sent 50</button>
<button onClick={()=>setShowPay(null)} style={{background:"#eee",padding:"10px 14px",borderRadius:20}}>Cancel</button>
</div>
</div>
) : (
<button onClick={()=>setShowPay(i)} style={{background:paid[i]?"#00a651":"#0a1931",color:"white",padding:"12px 16px",borderRadius:20,marginTop:8,fontWeight:"bold",width:"100%"}}>{paid[i]?"✅ Chat Client on WhatsApp":`💰 Send KES 50 to 0116982197 to Apply`}</button>
)}
</div>
))}
<div style={{marginTop:20,textAlign:"center",background:"white",padding:10,borderRadius:12}}>
<p style={{fontSize:11}}>Send Money to <b>0116982197</b> • Emmanuel • TaskMate Kirinyaga</p>
</div>
</div>
)
}
