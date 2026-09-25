"use client"
import {useEffect,useState} from "react"
import { supabase } from "@/lib/supabase"
export default function Jobs(){
const [jobs,setJobs]=useState<any[]>([])
useEffect(()=>{ (async()=>{ const {data}=await supabase.from("jobs").select("*").order("created_at",{ascending:false}); setJobs(data||[]) })() },[])
async function pay(j:any){
await supabase.from("payments").insert({job_title:j.title,job_price:j.price,client_phone:j.phone})
window.open(`https://wa.me/254${j.phone.slice(1)}?text=Hi fundi TaskMate for ${j.title}`)
setTimeout(()=>window.open(`https://wa.me/254116982197?text=PAID 50 for ${j.title}`),1000)
}
return(<div style={{padding:16,background:"#eef2f7",minHeight:"100vh"}}>
<h1 style={{fontWeight:"bold"}}>Jobs Kirinyaga - CLOUD ☁️</h1>
{jobs.map((j,i)=><div key={i} style={{background:"white",padding:16,borderRadius:12,marginTop:10}}>
<h2 style={{fontWeight:"bold"}}>{j.title} - {j.location}</h2><p>KES {j.price} • {j.phone}</p>
<button onClick={()=>pay(j)} style={{background:"#0a1931",color:"white",padding:12,borderRadius:20,marginTop:8,width:"100%",fontWeight:"bold"}}>💰 Pay 50 to 0116982197 to Apply</button>
</div>)}
</div>)
}
