"use client"
import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
const supabaseUrl = "https://tvgbluiespttqwptpwlj.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2Z2JsdWllc3B0dHF3cHRwd2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwNzA4MDcsImV4cCI6MjEwNTY0NjgwN30.Pmbgxx45ziJCtjrtt2eEzjDAbiVqzq4lqv0Qjn7iqoc"
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Cars(){
  const [cars,setCars]=useState<any[]>([])
  const [file,setFile]=useState<File|null>(null)
  const [name,setName]=useState("Audi")
  const [price,setPrice]=useState("3m")
  const [location,setLocation]=useState("Muran'a")
  const [phone,setPhone]=useState("0116982197")
  const [loading,setLoading]=useState(false)

  const load = async () => {
    const {data} = await supabase.from("cars").select("*").order("id",{ascending:false})
    if(data) setCars(data)
  }
  useEffect(()=>{ load() },[])

  const post = async () => {
    if(!file){ alert("Choose picture first!"); return; }
    setLoading(true)
    try{
      const fileName = Date.now()+"_"+file.name
      const {error:upErr} = await supabase.storage.from("cars").upload(fileName, file)
      if(upErr) throw upErr
      const {data:urlData} = supabase.storage.from("cars").getPublicUrl(fileName)
      const {error} = await supabase.from("cars").insert([{name, price, location, phone, image_url:urlData.publicUrl}])
      if(error) throw error
      alert("✅ Car Posted! Picture saved forever in cloud!")
      setFile(null); load()
    }catch(e:any){ alert("Failed to fetch - Error: "+e.message) }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="text-center font-bold text-xl">🚗 Cars - CLOUD SAVED</div>
      <div className="text-center text-green-600 text-sm font-bold">Pictures saved forever in cloud ✅</div>
      <div className="border-2 border-black rounded-2xl p-4 mt-4 space-y-3">
        <input type="file" onChange={e=>setFile(e.target.files?.[0]||null)} className="w-full border-2 border-black rounded-lg p-3" />
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Audi" className="w-full border-2 border-black rounded-lg p-3" />
        <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="3m" className="w-full border-2 border-black rounded-lg p-3" />
        <input value={location} onChange={e=>setLocation(e.target.value)} placeholder="Muran'a" className="w-full border-2 border-black rounded-lg p-3" />
        <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="0116982197" className="w-full border-2 border-black rounded-lg p-3 bg-blue-50" />
        <button onClick={post} disabled={loading} className="w-full bg-[#0a1931] text-white py-4 rounded-2xl font-bold">{loading?"Uploading...":"Post to Cloud - FREE"}</button>
      </div>
      <div className="mt-6 font-bold">Available Cars ({cars.length})</div>
      <div className="grid grid-cols-1 gap-3 mt-3">
        {cars.map(c=>(
          <div key={c.id} className="border-2 border-black rounded-2xl overflow-hidden">
            <img src={c.image_url} className="w-full h-48 object-cover" />
            <div className="p-3"><b>{c.name}</b> - {c.price}<br/>{c.location} - {c.phone}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
