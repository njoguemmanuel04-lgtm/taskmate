'use client'
import { useEffect, useState } from 'react'

export default function Admin(){
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const load = async ()=>{
    setLoading(true)
    const res = await fetch('/api/jobs')
    const data = await res.json()
    setJobs(data)
    setLoading(false)
  }
  useEffect(()=>{ load() }, [])

  const del = async (id:string)=>{
    if(!confirm('Delete this job?')) return
    await fetch(`/api/jobs?id=${id}`, {method:'DELETE'})
    load()
  }

  const totalJobs = jobs.length
  const paid = jobs.filter((j:any)=>j.paid).length // if you have paid field
  const earnings = paid * 50

  if(loading) return <div style={{padding:20}}>Loading Cloud Jobs ☁️...</div>

  return (
    <div style={{padding:20, maxWidth:600, margin:'0 auto', fontFamily:'sans-serif'}}>
      <h1>👑 Admin - Emmanuel</h1>
      <p>0116982197 • Send Money</p>

      <div style={{display:'flex', gap:10, margin:'15px 0'}}>
        <div style={{flex:1, background:'#0f172a', color:'white', padding:15, borderRadius:15, textAlign:'center'}}>
          <h2>{totalJobs}</h2><small>Total Jobs</small>
        </div>
        <div style={{flex:1, background:'#16a34a', color:'white', padding:15, borderRadius:15, textAlign:'center'}}>
          <h2>{paid}</h2><small>Paid KES 50</small>
        </div>
        <div style={{flex:1, background:'#f59e0b', color:'white', padding:15, borderRadius:15, textAlign:'center'}}>
          <h2>KES {earnings || totalJobs*50}</h2><small>Earnings</small>
        </div>
      </div>

      <div style={{border:'2px solid #16a34a', padding:15, borderRadius:12, marginBottom:20}}>
        <b>💰 M-Pesa Send Money</b><br/>
        Number: <b>0116982197</b><br/>Name: Emmanuel Njogu<br/>
        <small>Fundis send 50 here to unlock client</small>
      </div>

      <h3>All Jobs ({totalJobs}) - CLOUD ☁️</h3>
      {jobs.map((job:any)=>(
        <div key={job.id} style={{background:'white', padding:15, borderRadius:15, marginBottom:10, boxShadow:'0 2px 8px #eee'}}>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <b>{job.title || job.job_type} - {job.location}</b>
            <button onClick={()=>del(job.id)} style={{background:'#fee2e2', color:'#dc2626', border:0, padding:'6px 12px', borderRadius:20}}>Delete</button>
          </div>
          <small>KES {job.amount || job.price} • {job.phone || job.client_phone} • {new Date(job.created_at).toLocaleTimeString()}</small>
          <div style={{marginTop:10, display:'flex', gap:8}}>
            <a href={`https://wa.me/${job.phone}?text=Hi ${job.name}, I'm available for your ${job.title} job`} target="_blank" style={{background:'#dcfce7', color:'#16a34a', padding:'8px 12px', borderRadius:20, textDecoration:'none', fontSize:13}}>WhatsApp Client</a>
            <button style={{background:'#e0f2fe', border:0, padding:'8px 12px', borderRadius:20, fontSize:13}}>Notify Client</button>
          </div>
        </div>
      ))}

      <div style={{display:'flex', gap:10, marginTop:20}}>
        <a href="/jobs" style={{flex:1, background:'#0f172a', color:'white', textAlign:'center', padding:12, borderRadius:25, textDecoration:'none'}}>View Jobs</a>
        <a href="/" style={{flex:1, border:'1px solid #0f172a', textAlign:'center', padding:12, borderRadius:25, textDecoration:'none', color:'#0f172a'}}>Home</a>
      </div>
      <p style={{textAlign:'center', marginTop:15, color:'#888', fontSize:12}}>TaskMate Kirinyaga • taskmate-ebon.vercel.app</p>
    </div>
  )
}
