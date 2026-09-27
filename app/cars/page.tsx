"use client"
import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
const supabaseUrl = "https://tvgbluiespttqwptpwlj.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2Z2JsdWllc3B0dHF3cHRwd2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwNzA4MDcsImV4cCI6MjEwNTY0NjgwN30.Pmbgxx45ziJCtjrtt2eEzjDAbiVqzq4lqv0Qjn7iqoc"
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Cars(){
  const [cars,setCars]=useState<any[]>([])
  const [file,setFile]=useState<File|null>(null)
  const [name,setName]=useState(""), [price,setPrice]=useState(""), [location,setLocation]=useState(""), [phone,setPhone]=useState("")
  const [loading,setLoading]=useState(false)
  const load = async () => { const {data}=await supabase.from("cars").select("*").order("id",{ascending:false}); if(data)setCars(data) }
  useEffect(()=>{load()},[])
  const handlePay = async (c:any) => {
    if(confirm(`💰 SEND 300 TO 0116982197 to unlock ${c.name}`)){
      if(confirm("Did you SEND 300?")){
        await supabase.from("cars").update({payment_requested:true}).eq("id",c.id)
        alert("✅ Waiting for Admin!"); load()
      }
    }
  }
  const post = async () => {
    if(!file) return alert("Pick image"); setLoading(true)
    const fn=Date.now()+"_"+file.name; await supabase.storage.from("cars").upload(fn,file)
    const {data}=supabase.storage.from("cars").getPublicUrl(fn)
    await supabase.from("cars").insert([{name,price,location,phone,image_url:data.publicUrl,is_unlocked:false,payment_requested:false}])
    alert("✅ Posted LOCKED 300!"); setName("");setPrice("");setLocation("");setPhone("");setFile(null); load(); setLoading(false)
  }
  return (
    <div className="min-h-screen bg-white p-4">
      <div className="text-center font-bold">🚗 Cars - Number LOCKED 🔒 300</div>
      <div className="border-2 border-black rounded-2xl p-4 mt-3 space-y-3">
        <input type="file" onChange={e=>setFile(e.target.files?.[0]||null)} className="w-full border-2 border-black rounded-lg p-3" />
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Car GLE" className="w-full border-2 border-black rounded-lg p-3" />
        <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price 3m" className="w-full border-2 border-black rounded-lg p-3" />
        <input value={location} onChange={e=>setLocation(e.target.value)} placeholder="Location Mwea" className="w-full border-2 border-black rounded-lg p-3" />
        <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Owner phone" className="w-full border-2 border-black rounded-lg p-3 bg-blue-50 font-bold" />
        <button onClick={post} className="w-full bg-black text-white py-4 rounded-2xl font-bold">{loading?"Posting...":"Post - FREE (Locked 300)"}</button>
      </div>
      <div className="mt-5 font-bold">Available ({cars.length})</div>
      <div className="grid gap-3 mt-3">
        {cars.map(c=>(
          <div key={c.id} className="border-2 border-black rounded-2xl overflow-hidden">
            <img src={c.image_url} className="w-full h-56 object-cover" />
            <div className="p-3">
              <div className="font-bold">{c.name} - {c.price}</div><div className="text-sm">{c.location}</div>
              {c.is_unlocked ? (<><div className="font-bold text-green-700 mt-2">📞 {c.phone}</div><a href={`tel:${c.phone}`} className="block bg-green-600 text-white text-center py-3 rounded-full font-bold mt-2">📞 CALL NOW</a></>) : c.payment_requested ? (<div className="mt-2 bg-yellow-100 border-2 border-yellow-500 rounded-xl p-3 text-center font-bold text-sm">⏳ Waiting Admin Verify 300</div>) : (<><div className="mt-2 font-bold">📞 07XXXXXX 🔒 Locked</div><button onClick={()=>handlePay(c)} className="mt-2 w-full bg-black text-white py-3 rounded-full font-bold">🔒 PAY 300 TO UNLOCK NUMBER</button></>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
