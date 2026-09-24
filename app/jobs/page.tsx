"use client";
import {useEffect,useState} from "react";
export default function Jobs(){
const [jobs,setJobs]=useState<any[]>([]);
const [paid,setPaid]=useState<{[key:number]:boolean}>({});
const [showPay,setShowPay]=useState<number|null>(null);
useEffect(()=>{
setJobs(JSON.parse(localStorage.getItem("taskmate_jobs")||"[]"));
setPaid(JSON.parse(localStorage.getItem("taskmate_paid")||"{}"));
},[]);
function confirmPay(i:number,j:any){
// SAVE PAYMENT
const np={...paid,[i]:true};
setPaid(np);
localStorage.setItem("taskmate_paid",JSON.stringify(np));
const logs=JSON.parse(localStorage.getItem("taskmate_payments")||"[]");
logs.push({job:j.title,loc:j.location,price:j.price,client:j.phone,time:new Date().toLocaleString(),amount:50});
localStorage.setItem("taskmate_payments",JSON.stringify(logs));
setShowPay(null);
// 1. OPEN CLIENT WHATSAPP
window.open(`https://wa.me/254${j.phone.slice(1)}?text=Hi, I'm fundi from TaskMate, naeza fanya ${j.title} ${j.location} KES ${j.price}. Nisha lipa 50 bob.`);
// 2. AFTER 1.5 SEC, OPEN YOUR ADMIN WHATSAPP TO NOTIFY YOU
setTimeout(()=>{
window.open(`https://wa.me/254116982197?text=💰 TASKMATE PAYMENT: Fundi paid KES 50%0AJob: ${j.title} - ${j.location}%0APrice: KES ${j.price}%0AClient: ${j.phone}%0ATime: ${new Date().toLocaleString()}%0A%0ACheck /admin`);
},1500);
}
return(
<div style={{padding:16,background:"#eef2f7",minHeight:"100vh"}}>
<div style={{display:"flex",alignItems:"center",gap:10}}><button onClick={()=>location.href='/'}>←</button><h1 style={{fontWeight:"bold",fontSize:20}}>Jobs - Kirinyaga</h1></div>
{jobs.map((j:any,i:number)=>(
<div key={i} style={{background:"white",borderRadius:16,padding:16,marginTop:12,border:paid[i]?"2px solid #00a651":"1px solid #eee"}}>
<h2 style={{fontWeight:"bold"}}>{j.title} - {j.location}</h2>
<p style={{color:"gray",fontSize:12}}>KES {j.price} • {j.time} • {paid[i]?j.phone:"Client: 07XXXXX"}</p>
{showPay===i? (
<div style={{background:"#d1f5d9",padding:14,borderRadius:12,marginTop:10,border:"2px solid #00a651"}}>
<p style={{fontWeight:"bold"}}>💰 SEND MONEY KES 50</p>
<p style={{fontSize:13,marginTop:4}}>To: <b>0116982197</b></p>
<p style={{fontSize:12}}>Name: Emmanuel Njogu</p>
<p style={{fontSize:11,marginTop:6,color:"#333"}}>Steps: M-Pesa → Send Money → 0116982197 → 50</p>
<button onClick={()=>confirmPay(i,j)} style={{background:"#00a651",color:"white",padding:"12px",borderRadius:20,marginTop:10,width:"100%",fontWeight:"bold"}}>✅ I Sent 50 - Contact Client + Notify Admin</button>
<button onClick={()=>setShowPay(null)} style={{background:"#eee",padding:"8px",borderRadius:20,marginTop:6,width:"100%"}}>Cancel</button>
<p style={{fontSize:10,marginTop:6,color:"gray",textAlign:"center"}}>Will open 2 WhatsApps: Client + Admin 0116982197</p>
</div>
) : (
<button onClick={()=>paid[i]?window.open(`https://wa.me/254${j.phone.slice(1)}`):setShowPay(i)} style={{background:paid[i]?"#00a651":"#0a1931",color:"white",padding:"12px 16px",borderRadius:20,marginTop:8,fontWeight:"bold",width:"100%"}}>{paid[i]?"✅ WhatsApp Client Again":`💰 Send 50 to 0116982197 to Apply`}</button>
)}
</div>
))}
</div>
)
}
