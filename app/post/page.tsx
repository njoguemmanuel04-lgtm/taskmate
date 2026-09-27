"use client"
import { useState } from "react"
import { createClient } from "@supabase/supabase-js"

// YOUR REAL CLOUD KEYS - FROM SUPABASE DASHBOARD
const supabaseUrl = "https://YOUR_PROJECT.supabase.co"
const supabaseKey = "YOUR_ANON_KEY"
const supabase = createClient(supabaseUrl, supabaseKey)

const jobCats = ["Plumbing","Cleaning","Painting","Electrical","Delivery","Construction - Mjengo","Carpentry - Fundi","Masonry","Welding","Gardening / Shamba","Cooking / Chef","Outside Catering","Baby Sitting / Nanny","House Help / Maid","Laundry","Moving / Movers","Garbage Collection","Car Wash","Mechanic","Barber / Salon","Tutor / Teacher","Security / Watchman","Photography","DJ / Sound","Tent & Chairs","Bodaboda","Errands"]

export default function PostJob(){
  const [loading,setLoading] = useState(false)
  
  const handle = async (e:any) => {
    e.preventDefault()
    setLoading(true)
    const f = e.target
    const { error } = await supabase.from("jobs").insert([{
      name: f.name.value,
      category: f.category.value,
      phone: f.phone.value,
      location: f.location.value,
      description: f.desc.value
    }])
    if(error){ alert("CLOUD ERROR: "+error.message); setLoading(false); return }
    alert("✅ SAVED TO CLOUD SUCCESS!")
    window.location.href="/jobs"
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Post a Job - CLOUD ☁️✅</h1>
      <form onSubmit={handle} className="bg-white p-6 rounded-2xl shadow max-w-md mx-auto space-y-4">
        <input name="name" required placeholder="Name" className="w-full p-3 rounded-xl border" />
        <select name="category" className="w-full p-3 rounded-xl border font-bold">{jobCats.map(c=><option key={c}>{c}</option>)}</select>
        <input name="phone" required placeholder="0116982197" className="w-full p-3 rounded-xl border" />
        <input name="location" required placeholder="Kirinyaga" className="w-full p-3 rounded-xl border" />
        <textarea name="desc" placeholder="Describe" className="w-full p-3 rounded-xl border" />
        <button className="w-full bg-black text-white p-4 rounded-xl font-bold">{loading?"Saving to CLOUD...":"Post to CLOUD"}</button>
      </form>
    </div>
  )
}
