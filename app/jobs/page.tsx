"use client"
import { useState, useEffect } from "react"

export default function Jobs(){
  const [jobs,setJobs]=useState<any>([])
  const [loading,setLoading]=useState(true)
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

  // SEND MONEY 0116982197 - MANUAL UNLOCK
  async function iHavePaid(job:any){
    if(!payerPhone || payerPhone.length < 10){
      alert("Enter your M-Pesa phone that sent 100 to 0116982197, e.g 07XX...")
      return
    }

    await fetch(`/api/jobs?id=${job.id}`, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ 
        pending: true, 
        payerPhone: payerPhone,
        pendingTime: new Date().toLocaleString(),
        paid: false
      })
    })

    alert(`✅ Sent!\nPayer: ${payerPhone}\nTo: 0116982197 - KES 100\n\nAdmin will check M-Pesa SMS and unlock. If you sent 50, you will be rejected!`)
    setShowMpesa(null)
    setPayerPhone("")
    
    // Refresh jobs
    fetch('/api/jobs').then(r=>r.json()).then(setJobs)
  }

  if(loading) return <div style={{padding:20}}>Loading...</div>

  return (
    <div style={{padding:15, background:'#f5f5f5', minHeight:'100vh', fontFamily:'Arial'}}>
      <h2>Jobs - Unlock with KES 100 to 0116982197</h2>
      
      {jobs.map((job:any)=>(
        <div key={job.id} style={{border:'1px solid #ddd', padding:15, margin:'12px 0', borderRadius:12, background:'white'}}>
          <h3 style={{margin:'0 0 5px 0'}}>{job.title || 'Job '+job.id}</h3>
          <p style={{margin:'5px 0'}}>💰 {job.pay || 'KES 300'}</p>
          <p style={{margin:'5px 0', fontSize:13, color:'#666'}}>{job.description || ''}</p>
          
          {job.paid ? (
            <div style={{background:'#e8f5e9', padding:12, borderRadius:8, border:'1px solid green'}}>
              <b>📱 {job.phone}</b> <span style={{color:'green', fontWeight:'bold'}}>✅ UNLOCKED - Paid 100</span>
              <br/><a href={`tel:${job.phone}`} style={{background:'green', color:'white', padding:'8px 15px', borderRadius:8, textDecoration:'none', display:'inline-block', marginTop:8}}>📞 Call Now</a>
            </div>
          ) : job.pending ? (
            <div style={{background:'#fff3e0', padding:12, borderRadius:8, border:'1px solid orange'}}>
              <b>⏳ Pending Verification</b><br/>
              Your phone: {job.payerPhone}<br/>
              Sent 100 to 0116982197<br/>
              <small>Admin checking M-Pesa SMS. Wait 2 mins then refresh.</small><br/>
              <button onClick={()=>window.location.reload()} style={{marginTop:8, padding:'8px 15px', borderRadius:8, border:'1px solid orange', background:'white'}}>🔄 Refresh Status</button>
            </div>
          ) : (
            <>
              <div style={{background:'#ffebee', padding:12, borderRadius:8, marginBottom:10, border:'1px solid #ff5252'}}>
                <b>📱 {maskPhone(job.phone)} 🔒</b><br/>
                <small>Unlock with KES 100 via SEND MONEY</small>
              </div>

              {showMpesa===job.id ? (
                <div style={{background:'#f5f5f5', padding:15, borderRadius:10, border:'2px dashed green'}}>
                  <p style={{textAlign:'center', fontWeight:'bold'}}>Send KES 100 via SEND MONEY to:</p>
                  <h1 style={{color:'green', textAlign:'center', margin:'10px 0'}}>0116982197</h1>
                  
                  <input 
                    placeholder="Your M-Pesa phone 07XX..." 
                    value={payerPhone}
                    onChange={e=>setPayerPhone(e.target.value)}
                    style={{width:'100%', padding:12, borderRadius:8, border:'1px solid #ccc', margin:'10px 0', boxSizing:'border-box'}}
                  />

                  <button onClick={()=>iHavePaid(job)} style={{background:'green', color:'white', padding:'14px', width:'100%', border:'none', borderRadius:8, fontWeight:'bold', fontSize:16}}>
                    I HAVE PAID 100 TO 0116982197
                  </button>
                  <button onClick={()=>{setShowMpesa(null); setPayerPhone("")}} style={{background:'white', color:'black', padding:'10px', width:'100%', border:'1px solid #ccc', borderRadius:8, marginTop:8}}>
                    Cancel
                  </button>
                </div>
              ) : (
                <button onClick={()=>setShowMpesa(job.id)} style={{background:'black', color:'white', padding:'14px 20px', border:'none', borderRadius:10, fontWeight:'bold', width:'100%', fontSize:16}}>
                  🔓 Unlock Number - KES 100
                </button>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  )
}
