"use client"
import { useState, useEffect } from "react"

export default function Jobs(){
  const [jobs,setJobs]=useState<any>([])
  const [loading,setLoading]=useState(true)
  const [unlocked, setUnlocked] = useState<any>({})

  useEffect(()=>{
    fetch('/api/jobs')
      .then(r=>r.json())
      .then(d=>{setJobs(d); setLoading(false)})
    // Load Paystack script
    const s = document.createElement("script")
    s.src = "https://js.paystack.co/v1/inline.js"
    document.body.appendChild(s)
  },[])

  function maskPhone(phone:string){
    if(!phone) return ""
    return phone.slice(0,4) + "***" + phone.slice(-3)
  }

  function payToUnlock(job:any){
    // @ts-ignore
    const handler = window.PaystackPop.setup({
      key: 'pk_test_xxxxxxxx', // Replace with your pk_live_ when approved!
      email: 'buyer@taskmate.co.ke',
      amount: 100 * 100, // KES 100
      currency: 'KES',
      ref: 'TASK-'+Date.now(),
      callback: function(){
        alert("Payment success! Number unlocked!")
        setUnlocked((prev:any)=>({...prev, [job.id]:true}))
      },
      onClose: function(){
        alert("Pay to see number - Till 1754910 also works!")
      }
    })
    handler.openIframe()
  }

  if(loading) return <div style={{padding:20}}>Loading...</div>

  return(
    <div style={{padding:16,maxWidth:500,margin:"0 auto"}}>
      <h1 style={{fontWeight:"bold",fontSize:20}}>🔒 Taskmate - Locked Contacts</h1>
      {jobs.map((j:any)=>(
        <div key={j.id} style={{border:'1px solid #ddd',padding:12,marginTop:12,borderRadius:8,background: unlocked[j.id] ? '#e8f5e9' : '#fff3e0'}}>
          <b>{j.title}</b><br/>
          📍 {j.location} - KES {j.price}<br/>
          📞 {unlocked[j.id] ? j.phone : maskPhone(j.phone)} {unlocked[j.id] ? '✅' : '🔒'} <br/>
          {!unlocked[j.id] && (
            <button 
              onClick={()=>payToUnlock(j)}
              style={{background:'black',color:'white',padding:'8px 14px',border:'none',borderRadius:6,marginTop:8,width:'100%',fontWeight:'bold'}}
            >
              🔒 Unlock Contact - KES 100
            </button>
          )}
          {unlocked[j.id] && <a href={`tel:${j.phone}`} style={{display:'block',background:'#00c853',color:'white',padding:'8px',textAlign:'center',borderRadius:6,marginTop:8,textDecoration:'none'}}>📞 Call Now</a>}
        </div>
      ))}
    </div>
  )
}
