"use client"
import { useState } from "react"

export default function Post(){
  const [f,setF]=useState({title:"",location:"Mwea",price:"",phone:""})
  
  async function post(){
    if(!f.title||!f.price||!f.phone) return alert("Fill all!")
    try{
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(f)
      })
      const j = await res.json()
      if(!res.ok) throw new Error(j.error)
      alert("✅ Posted to CLOUD! ☁️")
      location.href="/jobs"
    }catch(e:any){
      alert("Error: "+e.message)
    }
  }
  
  return(
    <div style={{padding:16,maxWidth:400,margin:'0 auto'}}>
      <h1 style={{fontWeight:"bold",fontSize:20}}>Post Job - CLOUD ☁️</h1>
      <input placeholder="Title e.g Plumbing" onChange={e=>setF({...f,title:e.target.value})} style={{width:'100%',padding:12,margin:'8px 0',border:'1px solid #ccc',borderRadius:8}} />
      <input placeholder="Location" defaultValue="Mwea" onChange={e=>setF({...f,location:e.target.value})} style={{width:'100%',padding:12,margin:'8px 0',border:'1px solid #ccc',borderRadius:8}} />
      <input placeholder="Price e.g 2000" onChange={e=>setF({...f,price:e.target.value})} style={{width:'100%',padding:12,margin:'8px 0',border:'1px solid #ccc',borderRadius:8}} />
      <input placeholder="Phone 07..." onChange={e=>setF({...f,phone:e.target.value})} style={{width:'100%',padding:12,margin:'8px 0',border:'1px solid #ccc',borderRadius:8}} />
      <button onClick={post} style={{background:"#000",color:"#fff",width:'100%',padding:14,borderRadius:8,marginTop:10}}>POST TO CLOUD ☁️</button>
      <a href="/jobs" style={{display:'block',marginTop:12}}>View Jobs →</a>
    </div>
  )
}
