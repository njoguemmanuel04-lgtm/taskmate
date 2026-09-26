'use client'
import { useEffect, useState } from 'react'

export default function Admin(){
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all'|'pending'|'paid'>('pending')

  const load = async ()=>{
    setLoading(true)
    const res = await fetch('/api/jobs')
    const data = await res.json()
    setJobs(data)
    setLoading(false)
  }
  useEffect(()=>{ load() }, [])

  // UNLOCK - When you confirm 100 received to 0116982197
  const unlock = async (id:string, phone:string)=>{
    if(!confirm(`Confirm you received Ksh100 from ${phone} to 0116982197? \n\nCheck M-Pesa SMS first!\n\nIf YES = Unlock\nIf SMS says 50 = Cancel`)) return

    await fetch(`/api/jobs?id=${id}`, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ paid: true, amount: 100, unlockedAt: new Date().toISOString() })
    })
    alert(`✅ Unlocked ${phone} - Ksh100 Confirmed`)
    load()
  }

  const reject = async (id:string)=>{
    if(!confirm('Reject? They sent only 50, not 100?')) return
    await fetch(`/api/jobs?id=${id}`, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ paid: false, pending: false, amount: 50 })
    })
    load()
  }

  const del = async (id:string)=>{
    if(!confirm('Delete this job?')) return
    await fetch(`/api/jobs?id=${id}`, {method: 'DELETE'})
    load()
  }

  const totalJobs = jobs.length
  const paid = jobs.filter((j:any)=>j.paid)
  const pending = jobs.filter((j:any)=>j.pending && !j.paid) // Those who clicked "I Paid"
  const earnings = paid.length * 100 // SEND MONEY 0116982197 = 100

  if(loading) return <div style={{padding:20}}>Loading...</div>

  return (
    <div style={{padding:20, fontFamily:'Arial', background:'#f5f5f5', minHeight:'100vh'}}>
      <h1>🔑 Admin - Taskmate SEND MONEY</h1>
      <h3 style={{color:'green'}}>M-Pesa: 0116982197 (Send Money - Check SMS)</h3>

      <div style={{display:'flex', gap:10, margin:'15px 0'}}>
        <div style={{background:'white', padding:15, borderRadius:10}}>Total Jobs: <b>{totalJobs}</b></div>
        <div style={{background:'orange', color:'white', padding:15, borderRadius:10}}>Pending: <b>{pending.length}</b></div>
        <div style={{background:'green', color:'white', padding:15, borderRadius:10}}>Paid: <b>{paid.length}</b></div>
        <div style={{background:'black', color:'white', padding:15, borderRadius:10}}>Earnings: <b>Ksh {earnings}</b></div>
      </div>

      <div style={{margin:'15px 0', display:'flex', gap:10}}>
        <button onClick={()=>setFilter('pending')} style={{background: filter=='pending'?'orange':'white', padding:'10px 20px', borderRadius:8, border:'1px solid #ccc'}}>⏳ Pending - Verify 100 vs 50</button>
        <button onClick={()=>setFilter('paid')} style={{background: filter=='paid'?'green':'white', color: filter=='paid'?'white':'black', padding:'10px 20px', borderRadius:8, border:'1px solid #ccc'}}>✅ Paid 100</button>
        <button onClick={()=>setFilter('all')} style={{background: filter=='all'?'black':'white', color: filter=='all'?'white':'black', padding:'10px 20px', borderRadius:8, border:'1px solid #ccc'}}>All Jobs</button>
        <button onClick={load} style={{background:'#2196f3', color:'white', padding:'10px 20px', borderRadius:8, border:'none'}}>🔄 Refresh</button>
      </div>

      {filter=='pending' && (
        <div>
          <h2>⏳ Pending - Check M-Pesa SMS to 0116982197</h2>
          {pending.length==0 && <p>No pending. All verified ✅</p>}
          {pending.map((job:any)=>(
            <div key={job.id} style={{background:'white', borderLeft:'5px solid orange', padding:15, margin:'10px 0', borderRadius:10}}>
              <b>📱 Payer Phone:</b> {job.payerPhone || job.phone} <br/>
              <b>📝 Job:</b> {job.title || job.id} <br/>
              <b>⏰ Time:</b> {job.createdAt} <br/>
              <div style={{background:'#fff3e0', padding:10, margin:'10px 0', borderRadius:5}}>
                👉 CHECK SMS: Search M-Pesa SMS for <b>{job.payerPhone}</b><br/>
                Did you get <b>Ksh100.00</b> from {job.payerPhone} to <b>0116982197</b>?<br/>
                If SMS shows 100 → UNLOCK<br/>
                If SMS shows 50 → REJECT
              </div>
              <button onClick={()=>unlock(job.id, job.payerPhone)} style={{background:'green', color:'white', padding:'12px 20px', border:'none', borderRadius:8, marginRight:10, fontWeight:'bold'}}>✅ SMS 100 - UNLOCK</button>
              <button onClick={()=>reject(job.id)} style={{background:'red', color:'white', padding:'12px 20px', border:'none', borderRadius:8, fontWeight:'bold'}}>❌ Only 50 - REJECT</button>
            </div>
          ))}
        </div>
      )}

      {filter!='pending' && jobs.filter(j=> filter=='paid'? j.paid : true).map((job:any)=>(
        <div key={job.id} style={{background:'white', padding:15, margin:'10px 0', borderRadius:10, display:'flex', justifyContent:'space-between'}}>
          <div>
            <b>{job.title || job.id}</b> - {job.payerPhone || job.phone}<br/>
            {job.paid ? <span style={{color:'green'}}>✅ Paid 100 - {job.amount}</span> : <span>Not paid</span>}
          </div>
          <button onClick={()=>del(job.id)} style={{background:'red', color:'white', padding:'5px 15px', border:'none', borderRadius:5}}>Delete</button>
        </div>
      ))}
    </div>
  )
}
