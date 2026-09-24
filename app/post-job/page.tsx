"use client";
import {useState} from "react";
export default function PostJob(){
const [t,setT]=useState(""),[l,setL]=useState("Mwea"),[p,setP]=useState(""),[ph,setPh]=useState("");
function post(){
if(!t||!p)return alert("Fill title & price");
const job={title:t,location:l,price:p,phone:ph||"0116982197",name:"Client",time:"Just now",id:Date.now()};
const old=JSON.parse(localStorage.getItem("taskmate_jobs")||"[]");
localStorage.setItem("taskmate_jobs",JSON.stringify([job,...old]));
alert("Job Posted! Admin will see it now!");
location.href="/jobs";
}
return(
<div style={{padding:20,minHeight:"100vh",background:"#f5f7fa"}}>
<h1 style={{fontWeight:"bold"}}>Post Job - Kirinyaga</h1>
<input placeholder="Job Title e.g Plumbing" value={t} onChange={e=>setT(e.target.value)} style={{width:"100%",padding:12,marginTop:12,borderRadius:12,border:"1px solid #ccc"}}/>
<select value={l} onChange={e=>setL(e.target.value)} style={{width:"100%",padding:12,marginTop:8,borderRadius:12}}><option>Mwea</option><option>Ngurubani</option><option>Kerugoya</option><option>Kutus</option><option>Kagio</option></select>
<input placeholder="Price KES" type="number" value={p} onChange={e=>setP(e.target.value)} style={{width:"100%",padding:12,marginTop:8,borderRadius:12,border:"1px solid #ccc"}}/>
<input placeholder="Your Phone 011..." value={ph} onChange={e=>setPh(e.target.value)} style={{width:"100%",padding:12,marginTop:8,borderRadius:12,border:"1px solid #ccc"}}/>
<button onClick={post} style={{width:"100%",background:"#0a1931",color:"white",padding:14,borderRadius:20,marginTop:12,fontWeight:"bold"}}>Post Job</button>
</div>
)
}
