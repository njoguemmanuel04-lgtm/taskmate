"use client";
import {useEffect,useState} from "react";
export default function Admin(){
const [jobs,setJobs]=useState<any[]>([]);
const [paidCount,setPaidCount]=useState(0);
useEffect(()=>{
const j=JSON.parse(localStorage.getItem("taskmate_jobs")||"[]");
setJobs(j);
// COUNT HOW MANY PAID 50
const paid=JSON.parse(localStorage.getItem("taskmate_paid")||"{}");
setPaidCount(Object.keys(paid).length);
// Also check new payments log
const logs=JSON.parse(localStorage.getItem("taskmate_payments")||"[]");
if(logs.length>Object.keys(paid).length)setPaidCount(logs.length);
},[]);
function del(id:number){
const n=jobs.filter((x:any)=>x.id!==id);
localStorage.setItem("taskmate_jobs",JSON.stringify(n));
setJobs(n);
}
return(
<div style={{padding:16,background:"#f0f2f5",minHeight:"100vh"}}>
<h1 style={{fontWeight:"bold",fontSize:22}}>👑 Admin - Emmanuel</h1>
<p style={{fontSize:12,color:"gray"}}>0116982197 • Send Money</p>

<div style={{display:"flex",gap:10,marginTop:14}}>
<div style={{background:"#0a1931",color:"white",padding:14,borderRadius:16,flex:1,textAlign:"center"}}>
<h1 style={{fontSize:24,fontWeight:"bold"}}>{jobs.length}</h1>
<p style={{fontSize:11}}>Total Jobs</p>
</div>
<div style={{background:"#00a651",color:"white",padding:14,borderRadius:16,flex:1,textAlign:"center"}}>
<h1 style={{fontSize:24,fontWeight:"bold"}}>{paidCount}</h1>
<p style={{fontSize:11}}>Paid KES 50</p>
</div>
<div style={{background:"#ff9800",color:"white",padding:14,borderRadius:16,flex:1,textAlign:"center"}}>
<h1 style={{fontSize:24,fontWeight:"bold"}}>KES {paidCount*50}</h1>
<p style={{fontSize:11}}>Earnings</p>
</div>
</div>

<div style={{background:"white",padding:12,borderRadius:12,marginTop:14,border:"2px solid #00a651"}}>
<p style={{fontWeight:"bold",fontSize:13}}>💰 M-Pesa Send Money</p>
<p style={{fontSize:12,marginTop:4}}>Number: <b>0116982197</b></p>
<p style={{fontSize:12}}>Name: Emmanuel Njogu</p>
<p style={{fontSize:11,color:"gray",marginTop:4}}>Fundis send 50 here to unlock client</p>
</div>

<h2 style={{marginTop:16,fontWeight:"bold"}}>All Jobs ({jobs.length})</h2>
{jobs.length===0&&<p style={{marginTop:12,color:"gray",background:"white",padding:16,borderRadius:12,textAlign:"center"}}>No jobs yet. Post at /post-job</p>}
{jobs.map((j:any)=>(
<div key={j.id} style={{background:"white",borderRadius:16,padding:12,marginTop:10}}>
<div style={{display:"flex",justifyContent:"space-between"}}>
<div>
<p style={{fontWeight:"bold",fontSize:14}}>{j.title} - {j.location}</p>
<p style={{fontSize:11,color:"gray"}}>KES {j.price} • {j.phone} • {j.time}</p>
</div>
<button onClick={()=>del(j.id)} style={{background:"#ffdddd",color:"red",padding:"6px 12px",borderRadius:20,fontSize:11,height:30}}>Delete</button>
</div>
<div style={{marginTop:8,display:"flex",gap:6}}>
<button onClick={()=>window.open(`https://wa.me/254${j.phone.slice(1)}`)} style={{background:"#e8f5e9",color:"#00a651",padding:"6px 10px",borderRadius:12,fontSize:11}}>WhatsApp Client</button>
<button onClick={()=>window.open(`https://wa.me/254${j.phone.slice(1)}?text=TaskMate: Job yako ${j.title} iko live!`)} style={{background:"#e3f2fd",color:"#0a1931",padding:"6px 10px",borderRadius:12,fontSize:11}}>Notify Client</button>
</div>
</div>
))}

<div style={{display:"flex",gap:8,marginTop:20}}>
<button onClick={()=>location.href='/jobs'} style={{flex:1,background:"#0a1931",color:"white",padding:12,borderRadius:20}}>View Jobs</button>
<button onClick={()=>location.href='/'} style={{flex:1,border:"1px solid #333",padding:12,borderRadius:20}}>Home</button>
</div>

<p style={{textAlign:"center",fontSize:10,color:"gray",marginTop:16}}>TaskMate Kirinyaga • taskmate-ebon.vercel.app</p>
</div>
)
}
