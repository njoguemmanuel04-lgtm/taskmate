"use client"
import{useState,useEffect}from"react"
export default function Jobs(){
const[jobs,setJobs]=useState<any>([])
useEffect(()=>{fetch('/api/jobs?'+Date.now(),{cache:'no-store'}).then(r=>r.json()).then(setJobs)},[])
function clean(p:any){let s=String(p||"");let t="";for(let c of s){if(c>='0'&&c<='9')t+=c}return t.slice(-10)}
return(<div style={{padding:15}}><h3>Available Jobs</h3>{jobs.map((j:any)=>{const ph=clean(j.phone);const name=j.client_name||"Client";return(<div key={j.id} style={{border:'1px solid #ccc',padding:15,marginBottom:15,borderRadius:12}}><div>{j.title}</div><div>{j.location}</div><div>Client: {name} - {ph}</div><a href={`tel:${ph}`} style={{background:'green',color:'white',padding:10,display:'inline-block',marginTop:10,borderRadius:8,textDecoration:'none'}}>Call - {name} - {ph}</a></div>)})}</div>)}
