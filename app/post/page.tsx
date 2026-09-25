"use client"
import { useState } from "react"
export default function Post(){
  const [name,setName]=useState("")
  const [job,setJob]=useState("Plumbing")
  const [phone,setPhone]=useState("")
  const [loading,setLoading]=useState(false)

  async function submit(){
    if(!name||!phone) return alert("Fill name and phone")
    setLoading(true)
    try{
      const res = await fetch('/api/jobs', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ title: job, location: "Kirinyaga", price: "2000", phone: `${name} - ${phone}` })
      })
      if(!res.ok) throw new Error("Failed")
      alert("✅ Job Posted! It will appear on Jobs side now!")
      location.href="/jobs"
    }catch(e){ alert("Error posting") }
    setLoading(false)
  }

  return(
    <div style={{padding:16,maxWidth:400,margin:'0 auto'}}>
      <h1 style={{fontWeight:"bold",fontSize:20}}>Post a Job - CLOUD ☁️</h1>
      <input placeholder="Your Name" value={name} onChange={e=>setName(e.target.value)} style={{width:'100%',padding:12,margin:'8px 0',border:'1px solid #ccc',borderRadius:8}} />
      <select value={job} onChange={e=>setJob(e.target.value)} style={{width:'100%',padding:12,margin:'8px 0',border:'1px solid #ccc',borderRadius:8}}>
        <option>Plumbing</option><option>Cleaning</option><option>Painting</option><option>Electrical</option><option>Delivery</option>
      </select>
      <input placeholder="07..." value={phone} onChange={e=>setPhone(e.target.value)} style={{width:'100%',padding:12,margin:'8px 0',border:'1px solid #ccc',borderRadius:8}} />
      <button onClick={submit} disabled={loading} style={{background:"#0a1931",color:"#fff",width:'100%',padding:14,borderRadius:8,marginTop:10}}>{loading?"Posting...":"Post Now"}</button>
      <a href="/jobs" style={{display:'block',marginTop:12,color:'blue'}}>View Jobs →</a>
    </div>
  )
}
