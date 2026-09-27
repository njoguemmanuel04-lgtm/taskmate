"use client"
import { useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://tvgbluiespttqwptpwlj.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2Z2JsdWllc3B0dHF3cHRwd2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwNzA4MDcsImV4cCI6MjAwNTY0NjgwN30.Pmbgxx45ziJCtjrtt2eEzjDAbiVqzq4lqv0Qjn7iqoc"
const supabase = createClient(supabaseUrl, supabaseKey)

const jobCats = ["Plumbing","Cleaning","Painting","Electrical","Delivery","Construction - Mjengo","Carpentry - Fundi","Masonry","Welding","Gardening / Shamba","Cooking / Chef","Outside Catering","Baby Sitting / Nanny","House Help / Maid","Laundry","Moving / Movers","Garbage Collection","Car Wash","Mechanic","Barber / Salon","Tutor / Teacher","Security / Watchman","Photography","DJ / Sound","Tent & Chairs","Bodaboda","Errands"]

export default function PostJob(){
  const [loading,setLoading]=useState(false)
  const handle = async (e:any)=>{
    e.preventDefault()
    setLoading(true)
    const f=e.target
    const {data, error}=await supabase.from("jobs").insert([{
      name:f.name.value, category:f.category.value, phone:f.phone.value, location:f.location.value
    }]).select()
    if(error){ alert("CLOUD ERROR: "+error.message); setLoading(false); return }
    alert("✅ SAVED TO CLOUD!")
    window.location.href="/jobs"
  }
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Post a Job - CLOUD ☁️✅</h1>
      <form onSubmit={handle} className="bg-white p-6 rounded-2xl shadow max-w-md mx-auto space-y-4">
        <input name="name" required placeholder="Ann" className="w-full p-3 rounded-xl border" />
        <select name="category" className="w-full p-3 rounded-xl border font-bold">{jobCats.map(c=><option key={c}>{c}</option>)}</select>
        <input name="phone" required placeholder="0116982197" className="w-full p-3 rounded-xl border" />
        <input name="location" required placeholder="Keno" className="w-full p-3 rounded-xl border" />
        <button className="w-full bg-black text-white p-4 rounded-xl font-bold">{loading?"Saving...":"Post to CLOUD"}</button>
      </form>
    </div>
  )
}
