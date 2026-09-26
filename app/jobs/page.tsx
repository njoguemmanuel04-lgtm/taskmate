"use client"
import { useState, useEffect } from "react"

export default function Jobs(){
  const [jobs,setJobs]=useState<any>([])
  const [loading,setLoading]=useState(true)
  const [unlocked, setUnlocked] = useState<any>({})
  const [showMpesa, setShowMpesa] = useState<any>(null)
  const [mpesaCode, setMpesaCode] = useState("")

  useEffect(()=>{
    fetch('/api/jobs')
      .then(r=>r.json())
      .then(d=>{setJobs(d); setLoading(false)})
  },[])

  function maskPhone(phone:string){
    if(!phone) return ""
    return phone.slice(0,4) + "***" + phone.slice(-3)
  }

  function verifyMpesa(job:any){
    if(mpesaCode.length < 8){
      alert("Enter valid M-Pesa code")
      return
    }
    setUnlocked((prev:any)=>({...prev, [job.id]:true}))
    setShowMpesa(null)
    setMpesaCode("")
    alert("✅ Paid! Number unlocked!")
  }

  if(loading) return <div style={{padding:20}}>Loading...</div>

  return(
    <div style={{padding:16,maxWidth:500,margin:"0 auto"}}>
      <h1 style={{fontWeight:"bold",fontSize:20}}>🔒 Taskmate</h1>
      {jobs.map((j:any)=>(
        <div key={j.id} style={{border:'1px solid #ddd',padding:12,marginTop:12,borderRadius:8,background: unlocked[j.id] ? '#e8f5e9' : '#fff3e0'}}>
          <b>{j.title}</b><br/>
          📍 {j.location} - KES {j.price}<br/>
          📞 {unlocked[j.id] ? j.phone : maskPhone(j.phone)} 🔒 <br/>
          
          {!unlocked[j.id] && showMpesa!==j.id && (
            <button onClick={()=>setShowMpesa(j.id)} style={{background:'black',color:'white',padding:'10px',border:'none',borderRadius:6,marginTop:8,width:'100%',fontWeight:'bold'}}>
              🔒 Unlock - KES 100
            </button>
          )}

          {showMpesa===j.id && (
            <div style={{background:'white',padding:10,borderRadius:8,marginTop:8,border:'2px solid #00c853'}}>
              <b>📱 SEND MONEY</b><br/>
              To: <b style={{fontSize:18}}>0116982197</b><br/>
              Amount: <b>KES 100</b><br/>
              <small>M-Pesa → Send Money → Enter Number → Enter 100</small><br/>
              <input 
                placeholder="M-Pesa Code"
                value={mpesaCode}
                onChange={(e)=>setMpesaCode(e.target.value.toUpperCase())}
                style={{width:'100%',padding:10,marginTop:8,border:'1px solid #ccc',borderRadius:6}}
              />
              <button onClick={()=>verifyMpesa(j)} style={{background:'#00c853',color:'white',padding:'10px',width:'100%',marginTop:6,border:'none',borderRadius:6,fontWeight:'bold'}}>✅ Verify & Unlock</button>
              <button onClick={()=>setShowMpesa(null)} style={{background:'#eee',padding:'6px',width:'100%',marginTop:4,border:'none',borderRadius:4}}>Cancel</button>
            </div>
          )}

          {unlocked[j.id] && <a href={`tel:${j.phone}`} style={{display:'block',background:'#00c853',color:'white',padding:'10px',textAlign:'center',borderRadius:6,marginTop:8,textDecoration:'none',fontWeight:'bold'}}>📞 Call {j.phone}</a>}
        </div>
      ))}
    </div>
  )
}
