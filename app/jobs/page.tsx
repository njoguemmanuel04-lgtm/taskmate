"use client"
import { useState, useEffect } from "react"
export default function Jobs(){
const [jobs,setJobs]=useState<any>([])
const [loading,setLoading]=useState(true)
const [showMpesa,setShowMpesa]=useState<any>(null)
const [payerPhone,setPayerPhone]=useState("")
useEffect(()=>{
fetch('/api/jobs').then(r=>r.json()).then(d=>{
setJobs(d);setLoading(false)
})
},[])
function cleanPhone(p:any){
return String(p||"").slice(-10)
}
function maskPhone(p:any){
let s=cleanPhone(p)
if(!s) return ""
return s.slice(0,4)+"***"+s.slice(-3)
}
async function iHavePaid(job:any){
if(!payerPhone||payerPhone.length<10){
alert("Enter M-Pesa number")
return
}
const res=await fetch('/api/jobs',{
method:'PUT',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({id:job.id,payerphone:payerPhone,pending:true})
})
if(res.ok){
alert("Pending Admin verify 100 to 0116982197")
setShowMpesa(null)
setPayerPhone("")
const d=await fetch('/api/jobs').then(r=>r.json())
setJobs(d)
}
}
if(loading) return <div>Loading...</div>
return(
<div style={{padding:15}}>
<h3>Available Jobs</h3>
{jobs.map((job:any)=>{
const phone=cleanPhone(job.phone)
return(
<div key={job.id} style={{border:'1px solid #ccc',padding:15,marginBottom:15,borderRadius:12}}>
<div>{job.title}</div>
<div>{job.location} - KES {job.budget}</div>
<div>Client: {job.paid?`${job.client_name||'Client'} - ${phone}`:`${maskPhone(phone)} 🔒`}</div>
{job.paid?(
<a href={`tel:${phone}`} style={{background:'green',color:'white',padding:10,display:'inline-block',marginTop:10,borderRadius:8,textDecoration:'none'}}>
Call - {job.client_name||'Client'} - {phone}
</a>
):(
<>
<button onClick={()=>setShowMpesa(job)} style={{background:'orange',padding:10,marginTop:10,borderRadius:8}}>Unlock - KES 100</button>
{job.pending&&<div style={{color:'orange',marginTop:8}}>Pending</div>}
</>
)}
{showMpesa?.id===job.id&&(
<div style={{background:'#fff3cd',padding:15,marginTop:12,borderRadius:10}}>
<div>Send KES 100 to 0116982197</div>
<input value={payerPhone} onChange={e=>setPayerPhone(e.target.value)} placeholder="07xxxxxxxx" style={{width:'100%',padding:10,marginTop:8}}/>
<button onClick={()=>iHavePaid(job)} style={{width:'100%',background:'green',color:'white',padding:12,marginTop:10,borderRadius:8}}>I HAVE PAID 100</button>
</div>
)}
</div>
)})}
</div>
)}
