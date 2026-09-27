"use client"
import { useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://tvgbluiespttqwptpwlj.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2Z2JsdWllc3B0dHF3cHRwd2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwNzA4MDcsImV4cCI6MjEwNTY0NjgwN30.Pmbgxx45ziJCtjrtt2eEzjDAbiVqzq4lqv0Qjn7iqoc"
const supabase = createClient(supabaseUrl, supabaseKey)

const jobCats = ["Plumbing","Cleaning","Painting","Electrical","Delivery","Construction - Mjengo","Carpentry - Fundi","Masonry","Welding","Gardening / Shamba","Cooking / Chef","Outside Catering","Baby Sitting / Nanny","House Help / Maid","Laundry","Moving / Movers","Garbage Collection","Car Wash","Mechanic","Barber / Salon","Tutor / Teacher","Security / Watchman","Photography","DJ / Sound","Tent & Chairs","Bodaboda","Errands"]

export default function PostJob(){
  const [loading,setLoading]=useState(false)
  const handle = async (e:any)=>{
    e.preventDefault()
    setLoading(true)
    const f=e.target
    const clientName = f.clientName.value.trim()
    const category = f.category.value
    const phone = f.phone.value.trim()
    
    const {error}=await supabase.from("jobs").insert([{
      name: clientName, 
      category: category, 
      phone: phone, 
      location: "-" // No location needed
    }])
    if(error){ alert("ERROR: "+error.message); setLoading(false); return }
    alert(`✅ SAVED! Client=${clientName}`)
    window.location.href="/jobs"
  }
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Post a Job - NO Location ✅</h1>
      <form onSubmit={handle} className="bg-white p-6 rounded-2xl shadow max-w-md mx-auto space-y-4">
        <div><label className="font-bold">Client Name</label><input name="clientName" required placeholder="e.g. Ann" className="w-full p-3 rounded-xl border mt-1" /></div>
        <div><label className="font-bold">Job Type</label><select name="category" className="w-full p-3 rounded-xl border mt-1 font-bold">{jobCats.map(c=><option key={c}>{c}</option>)}</select></div>
        <div><label className="font-bold">Phone Number</label><input name="phone" required placeholder="0116982197" className="w-full p-3 rounded-xl border mt-1" /></div>
        <button className="w-full bg-black text-white p-4 rounded-xl font-bold">{loading?"Saving...":"Post to CLOUD"}</button>
      </form>
    </div>
  )
}
