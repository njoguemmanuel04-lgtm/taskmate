"use client"
import { useState, useEffect } from "react"

export default function Jobs(){
  const [jobs,setJobs]=useState<any>([])
  const [loading,setLoading]=useState(true)
  const [showMpesa, setShowMpesa] = useState<string|null>(null)
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

  // SEND MONEY 0116982197 - MANUAL UNLOCK BY YOU
  async function iHavePaid(job:any){
    if(!payerPhone || payerPhone.length < 10){
      alert("Enter your M-Pesa phone that sent 100")
      return
    }
    const res = await fetch('/api/jobs', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: job.id,
        payerphone: payerPhone, // LOWERCASE - fixes NULL!
        pending: true,
        pay: "100"
      })
    })
    if(res.ok){
      alert("Payment pending! Admin will verify your payment to 0116982197 and unlock for you.")
      setShowMpesa(null)
      setPayerPhone("")
      window.location.reload()
    } else {
      alert("Failed, try again")
    }
  }

  if(loading) return <div>Loading...</div>

  return (
    <div style={{padding:20}}>
      <h1>Available Jobs</h1>
      {jobs.map((job:any)=>(
        <div key={job.id} style={{border:'1px solid #ccc', padding:15, margin:10, borderRadius:8}}>
          <h3>{job.title}</h3>
          <p>{job.location} - KES {job.budget}</p>
          <p>Client: {job.paid ? job.phone : maskPhone(job.phone) + " 🔒"}</p>
          {job.paid ? (
            <a href={`tel:${job.phone}`} style={{background:'green', color:'white', padding:10, borderRadius:5}}>Call {job.phone}</a>
          ) : (
            <>
              {showMpesa===job.id ? (
                <div style={{background:'#f0f0f0', padding:10, marginTop:10}}>
                  <p><b>SEND 100 to 0116982197</b></p>
                  <p>After sending, enter M-Pesa phone:</p>
                  <input value={payerPhone} onChange={e=>setPayerPhone(e.target.value)} placeholder="0725..." style={{padding:8, width:'100%'}} />
                  <button onClick={()=>iHavePaid(job)} style={{background:'green', color:'white', padding:10, width:'100%', marginTop:8}}>I HAVE PAID 100 TO 0116982197</button>
                </div>
              ) : (
                <button onClick={()=>setShowMpesa(job.id)} style={{background:'orange', padding:10}}>Unlock - KES 100</button>
              )}
              {job.pending && <p style={{color:'orange'}}>⏳ Pending verification by admin</p>}
            </>
          )}
        </div>
      ))}
    </div>
  )
}
