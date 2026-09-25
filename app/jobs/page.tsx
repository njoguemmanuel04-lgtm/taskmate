"use client"
import { useState, useEffect } from "react"

export default function Jobs(){
  const [jobs,setJobs]=useState<any[]>([])
  const [loading,setLoading]=useState(true)
  
  useEffect(()=>{
    fetch('/api/jobs')
      .then(r=>r.json())
      .then(d=>{setJobs(d); setLoading(false)})
  },[])
  
  if(loading) return <div style={{padding:20}}>Loading CLOUD jobs... ☁️</div>
  
  return(
    <div style={{padding:16,maxWidth:500,margin:'0 auto'}}>
      <h1 style={{fontWeight:"bold",fontSize:20}}>Jobs Kirinyaga - CLOUD ☁️ ({jobs.length})</h1>
      <a href="/post-job" style={{color:'blue'}}>Post new job →</a>
      {jobs.length===0 && <p>No jobs yet. Be first to post!</p>}
      {jobs.map((j:any)=>(
        <div key={j.id} style={{border:'1px solid #ddd',padding:12,margin:'10px 0',borderRadius:8}}>
          <b>{j.title}</b><br/>
          📍 {j.location} - KES {j.price}<br/>
          📞 {j.phone}
        </div>
      ))}
    </div>
  )
}
