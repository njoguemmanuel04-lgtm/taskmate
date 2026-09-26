"use client"
import { useState, useEffect } from "react"

export default function Jobs(){
  const [jobs,setJobs]=useState<any>([])
  const [loading,setLoading]=useState(true)
  const [unlocked, setUnlocked] = useState<any>({})
  const [showMpesa, setShowMpesa] = useState<string | null>(null)
  const [payerPhone, setPayerPhone] = useState("")

  useEffect(()=>{
    fetch('/api/jobs')
      .then(r=>r.json())
      .then(d=>{setJobs(d); setLoading(false)})
  },[])

  function maskPhone(phone:string){
    if(!phone) return ""
    return phone.slice(0,4) + "***" + phone.slice(-3)
  }

  // NEW - SEND MONEY 0116982197 - MANUAL ADMIN UNLOCK
  async function iHavePaid(job:any){
    if(!payerPhone || payerPhone.length < 10){
      alert("Enter your M-Pesa phone that sent money to 0116982197, e.g 07XX...")
      return
    }

    // Create pending payment
    await fetch(`/api/jobs?id=${job.id}`, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ 
        pending: true, 
        payerPhone: payerPhone,
        pendingTime: new Date().toISOString(),
        paid: false
      })
    })

    alert(`✅ Request sent!\n\nYou: ${payerPhone}\nSent: 100 to 0116982197\n\nAdmin will check M-Pesa SMS and unlock in 2 mins. Keep your M-Pesa message!\n\nIf you sent 50, you will be REJECTED - send 50 more!`)
    setShowMpesa(null)
    setPayerPhone("")
  }

  if(loading) return <div style={{padding:20}}>Loading jobs...</div>

  return (
    <div style={{padding:20}}>
      <h2>Available Jobs - Unlock with 100 to 0116982197</h2>
      {jobs.map((job:any)=>(
        <div key={job.id} style={{border:'1px solid #ddd', padding:15, margin:'10px 0', borderRadius:10, background:'white'}}>
          <h3>{job.title}</h3>
          <p>💰 Pay: {job.pay}</p>
          
          {/* PHONE - Locked or Unlocked */}
          {job.paid ? (
            <div style={{background:'#e8f5e9', padding:10, borderRadius:8}}>
              <b>📱 Phone: {job.phone}</b> <span style={{color:'green'}}>✅ Unlocked</span>
            </div>
          ) : job.pending ? (
            <div style={{background:'#fff3e0', padding:10, borderRadius:8}}>
              <b>⏳ Pending Verification</b><br/>
              Payer: {job.payerPhone}<br/>
              Admin checking SMS to 0116982197...<br/>
              <small>If you sent 100, you will be unlocked soon. If 50, rejected.</small>
            </div>
          ) : (
            <div>
              <div style={{background:'#ffebee', padding:10, borderRadius:8, marginBottom:10}}>
                <b>📱 Phone: {maskPhone(job.phone)}</b> 🔒 Locked<br/>
                <small>Send 100 via SEND MONEY to unlock</small>
              </div>

              {showMpesa===job.id ? (
                <div style={{background:'#f5f5f5', padding:15, borderRadius:10}}>
                  <p><b>Send KES 100 via SEND MONEY to:</b></p>
                  <h2 style={{color:'green', textAlign:'center'}}>0116982197</h2>
                  <p style={{textAlign:'center'}}>Name will show on M-Pesa</p>
                  
                  <input 
                    placeholder="Your M-Pesa phone that sent (07XX...)" 
                    value={payerPhone}
                    onChange={e=>setPayerPhone(e.target.value)}
                    style={{width:'100%', padding:12, borderRadius:8, border:'1px solid #ccc', margin:'10px 0'}}
                  />

                  <button onClick={()=>iHavePaid(job)} style={{background:'green', color:'white', padding:'12px', width:'100%', border:'none', borderRadius:8, fontWeight:'bold'}}>
                    I HAVE PAID 100 TO 0116982197
                  </button>
                  <button onClick={()=>setShowMpesa(null)} style={{background:'gray', color:'white', padding:'8px', width:'100%', border:'none', borderRadius:8, marginTop:5}}>
                    Cancel
                  </button>
                </div>
              ) : (
                <button onClick={()=>setShowMpesa(job.id)} style={{background:'black', color:'white', padding:'12px 20px', border:'none', borderRadius:8, fontWeight:'bold', width:'100%'}}>
                  🔓 Unlock Number - KES 100
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
