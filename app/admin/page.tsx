"use client"
import { useState, useEffect } from "react"

export default function Admin(){
  const [jobs,setJobs]=useState<any[]>([])
  const [filter,setFilter]=useState("pending")

  useEffect(()=>{ load() },[])

  async function load(){
    const res = await fetch('/api/jobs')
    const data = await res.json()
    setJobs(data)
  }

  const pendingJobs = jobs.filter(j=>j.pending)
  const paidJobs = jobs.filter(j=>j.paid)
  const totalEarnings = paidJobs.length * 100

  async function unlock(job:any){
    const ok = confirm(`Confirm you received Ksh100 from ${job.payerphone} to 0116982197?\n\nCheck M-Pesa SMS first!\n\nIf YES = Unlock\nIf SMS says 50 = Cancel`)
    if(!ok) return

    await fetch('/api/jobs',{
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ id: job.id, paid: true, pending: false })
    })
    alert(`✅ Unlocked ${job.payerphone} - Ksh100 Confirmed`)
    load()
  }

  async function reject(job:any){
    const ok = confirm(`Reject ${job.payerphone}? Only got 50?`)
    if(!ok) return

    await fetch('/api/jobs',{
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ id: job.id, pending: false, payerphone: null, pay: "50" })
    })
    alert(`❌ Rejected ${job.payerphone} - Only 50`)
    load()
  }

  const displayJobs = filter==="pending" ? pendingJobs : filter==="paid" ? paidJobs : jobs

  return (
    <div style={{padding:15, background:'#f5f5f5', minHeight:'100vh'}}>
      <h2>🔑 Admin - Taskmate SEND MONEY</h2>
      <p style={{color:'green', fontWeight:'bold'}}>M-Pesa: 0116982197 (Send Money - Check SMS)</p>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:10, margin:'15px 0'}}>
        <div style={{background:'white', padding:15, borderRadius:10}}>Total Jobs: <b>{jobs.length}</b></div>
        <div style={{background:'orange', padding:15, borderRadius:10, color:'white'}}>Pending: <b>{pendingJobs.length}</b></div>
        <div style={{background:'#22c55e', padding:15, borderRadius:10, color:'white'}}>Paid: <b>{paidJobs.length}</b></div>
        <div style={{background:'black', padding:15, borderRadius:10, color:'white'}}>Earnings: <b>Ksh {totalEarnings}</b></div>
      </div>

      <div style={{display:'flex', gap:10, marginBottom:15}}>
        <button onClick={()=>setFilter("pending")} style={{flex:1, padding:12, background: filter==="pending"?'orange':'white', borderRadius:8}}>⏳ Pending Verify 100 vs 50</button>
        <button onClick={()=>setFilter("paid")} style={{flex:1, padding:12, background: filter==="paid"?'#22c55e':'white', borderRadius:8}}>✅ Paid 100</button>
        <button onClick={()=>setFilter("all")} style={{flex:1, padding:12, background: filter==="all"?'black':'white', color: filter==="all"?'white':'black', borderRadius:8}}>All Jobs</button>
        <button onClick={load} style={{flex:1, padding:12, background:'#3b82f6', color:'white', borderRadius:8}}>🔄 Refresh</button>
      </div>

      <h3>⏳ Pending - Check M-Pesa SMS to 0116982197</h3>

      {displayJobs.map((job:any)=>(
        <div key={job.id} style={{background:'white', padding:15, marginBottom:12, borderRadius:12, borderLeft:'5px solid orange'}}>
          <div>📱 <b>Payer Phone:</b> {job.payerphone || 'N/A'}</div>
          <div>📝 <b>Job:</b> {job.title}</div>
          <div>⏰ <b>Time:</b> {new Date(job.created_at).toLocaleString()}</div>

          <div style={{background:'#fef3c7', padding:12, marginTop:10, borderRadius:8}}>
            👉 <b>CHECK SMS:</b> Search M-Pesa SMS for<br/>
            Did you get <b>Ksh100.00</b> from <b>{job.payerphone}</b> to <b>0116982197</b>?<br/>
            If SMS shows 100 → UNLOCK<br/>
            If SMS shows 50 → REJECT
          </div>

          {filter!=="paid" && job.pending && (
            <div style={{marginTop:12, display:'flex', flexDirection:'column', gap:8}}>
              <button onClick={()=>unlock(job)} style={{background:'#16a34a', color:'white', padding:12, borderRadius:8, fontWeight:'bold'}}>✅ SMS 100 - UNLOCK</button>
              <button onClick={()=>reject(job)} style={{background:'#dc2626', color:'white', padding:12, borderRadius:8, fontWeight:'bold', width:'fit-content'}}>❌ Only 50 - REJECT</button>
            </div>
          )}
          {job.paid && <div style={{marginTop:10, color:'green', fontWeight:'bold'}}>✅ Unlocked - Paid 100</div>}
        </div>
      ))}
    </div>
  )
}
