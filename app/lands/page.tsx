"use client"
import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
const supabase = createClient("https://tvgbluiespttqwptpwlj.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2Z2JsdWllc3B0dHF3cHRwd2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwNzA4MDcsImV4cCI6MjEwNTY0NjgwN30.Pmbgxx45ziJCtjrtt2eEzjDAbiVqzq4lqv0Qjn7iqoc")

export default function Lands(){
  const [lands,setLands]=useState<any[]>([])
  const [file,setFile]=useState<File|null>(null)
  const [title,setTitle]=useState(""),[price,setPrice]=useState(""),[location,setLocation]=useState(""),[phone,setPhone]=useState("")
  const [loading,setLoading]=useState(false)
  const load = async()=>{const {data}=await supabase.from("lands").select("*").order("id",{ascending:false}); if(data)setLands(data)}
  useEffect(()=>{load()},[])

  const pay = async (l:any) => {
    // SAME AS CARS PAYMENT
    const ok = confirm(`🔒 Unlock Owner Number?\n\nTitle: ${l.title}\nPrice: ${l.price}\n\nSend 500 KES to:\nMPESA: 0116982197\n\nClick OK after sending`)
    if(!ok) return
    const ok2 = confirm(`Did you SEND 500 to 0116982197?\nAdmin will verify and unlock!`)
    if(!ok2) return
    await supabase.from("lands").update({payment_requested:true}).eq("id",l.id)
    alert("✅ Payment request sent! Waiting Admin to verify 500 and unlock number.")
    load()
  }

  const post = async()=>{
    if(!file) return alert("Pick image")
    if(!title||!price||!phone) return alert("Fill all")
    setLoading(true)
    const fn=Date.now()+"_"+file.name
    const {error:upErr}=await supabase.storage.from("lands").upload(fn,file)
    if(upErr){alert(upErr.message); setLoading(false); return}
    const {data}=supabase.storage.from("lands").getPublicUrl(fn)
    const {error}=await supabase.from("lands").insert([{title,price,location,phone,image_url:data.publicUrl,is_unlocked:false,payment_requested:false}])
    if(error) alert(error.message)
    else alert("✅ Land Posted! Buyer will pay 500 to see your number!")
    setTitle("");setPrice("");setLocation("");setPhone("");setFile(null); load(); setLoading(false)
  }

  return(
    <div className="min-h-screen bg-[#f5f5f0] p-3 pb-20">
      <h1 className="font-black text-2xl">🏞️ Lands Kirinyaga</h1>
      <p className="text-sm font-bold bg-black text-white p-2 rounded-xl mt-2 text-center">Buyer Pays 500 to See Owner • Mpesa 0116982197</p>

      <div className="bg-white border-2 border-black rounded-2xl p-4 mt-4 space-y-2 shadow-[4px_4px_0px_0px_black]">
        <div className="font-black">+ Post Land (FREE)</div>
        <input type="file" onChange={e=>setFile(e.target.files?.[0]||null)} className="w-full border-2 border-black p-3 rounded-xl" />
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title e.g 1 Acre Mwea" className="w-full border-2 border-black p-3 rounded-xl" />
        <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price e.g 2M" className="w-full border-2 border-black p-3 rounded-xl" />
        <input value={location} onChange={e=>setLocation(e.target.value)} placeholder="Location e.g Mwea" className="w-full border-2 border-black p-3 rounded-xl" />
        <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Owner Phone - Will be LOCKED (500)" className="w-full border-2 border-black p-3 rounded-xl bg-yellow-50 font-bold" />
        <button onClick={post} className="w-full bg-black text-white py-4 rounded-2xl font-black text-lg">{loading?"Posting...":"POST LAND"}</button>
      </div>

      <div className="mt-6 font-black text-lg">Available ({lands.length})</div>
      <div className="grid gap-4 mt-3">
        {lands.map(l=>(
          <div key={l.id} className="bg-white border-2 border-black rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_black]">
            <img src={l.image_url} className="w-full h-64 object-cover" />
            <div className="p-3">
              <div className="font-black text-lg">{l.title}</div>
              <div className="font-bold text-green-700">{l.price} • {l.location}</div>

              {!l.is_unlocked? (
                l.payment_requested? (
                  <div className="mt-3 bg-yellow-100 border-2 border-black rounded-xl p-3 text-center font-black">⏳ PAYMENT 500 PENDING VERIFICATION</div>
                ) : (
                  <>
                    <div className="mt-3 font-black">📞 Owner: 07XXXXXX 🔒</div>
                    <button onClick={()=>pay(l)} className="mt-2 w-full bg-[#22c55e] border-2 border-black py-4 rounded-full font-black shadow-[3px_3px_0px_0px_black]">🔓 PAY 500 TO UNLOCK NUMBER</button>
                    <div className="text-xs text-center mt-1 font-bold">Same as Cars - Send to 0116982197</div>
                  </>
                )
              ) : (
                <>
                  <div className="mt-3 bg-green-100 border-2 border-black rounded-xl p-3 text-center">
                    <div className="font-black text-green-800">✅ UNLOCKED</div>
                    <div className="font-black text-xl">📞 {l.phone}</div>
                  </div>
                  <a href={`tel:${l.phone}`} className="mt-2 block w-full bg-black text-white text-center py-4 rounded-full font-black">📞 CALL OWNER NOW</a>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
