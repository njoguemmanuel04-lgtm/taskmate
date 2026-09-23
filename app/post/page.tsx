"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
export default function Post(){
  const r=useRouter()
  const [name,setName]=useState("")
  const [skill,setSkill]=useState("Plumbing")
  const [phone,setPhone]=useState("")
  return (
    <div className="p-4 min-h-screen bg-[#f5f7fa]">
      <h1 className="font-black text-xl">+ Post a Job</h1>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your Name" className="w-full mt-4 p-3 rounded-xl border"/>
      <select value={skill} onChange={e=>setSkill(e.target.value)} className="w-full mt-3 p-3 rounded-xl border">
        <option>Plumbing</option><option>Cleaning</option><option>Electrical Services</option><option>Delivery</option><option>Repairs</option>
      </select>
      <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone 07..." className="w-full mt-3 p-3 rounded-xl border"/>
      <button onClick={()=>{
        const w=JSON.parse(localStorage.getItem("workers")||"[]")
        w.push({name,skill,loc:"Mwea",phone})
        localStorage.setItem("workers",JSON.stringify(w))
        alert("✅ Job Posted!")
        r.push("/")
      }} className="w-full mt-6 bg-[#0f2a54] text-white p-3 rounded-full font-bold">Post Now</button>
      <button onClick={()=>r.push("/")} className="w-full mt-3 text-sm">← Back Home</button>
    </div>
  )
}
