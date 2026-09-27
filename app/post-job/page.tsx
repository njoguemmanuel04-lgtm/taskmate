"use client"
import { useState } from "react"

const jobCats = ["Plumbing","Cleaning","Painting","Electrical","Delivery","Construction - Mjengo","Carpentry - Fundi","Masonry","Welding","Gardening / Shamba","Cooking / Chef","Outside Catering","Baby Sitting / Nanny","House Help / Maid","Laundry","Moving / Movers","Garbage Collection","Car Wash","Mechanic","Barber / Salon","Tutor / Teacher","Security / Watchman","Photography","DJ / Sound","Tent & Chairs","Bodaboda","Errands"]

export default function PostJob(){
  const [loading,setLoading] = useState(false)

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    setLoading(true)
    const form = e.target
    const data = {
      name: form.name.value,
      category: form.category.value,
      phone: form.phone.value,
      location: form.location.value,
      desc: form.desc.value,
    }
    // Save to Supabase - replace with your supabase code
    // await supabase.from('jobs').insert([data])

    alert("Job Posted: " + data.category + " in " + data.location)
    setLoading(false)
    window.location.href = "/jobs"
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24">
      <h1 className="text-2xl font-bold text-center mb-6">Post a Job - CLOUD</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow max-w-md mx-auto space-y-4">
        <input name="name" placeholder="Your Name e.g. Mwangi" required className="w-full p-3 rounded-xl border" />

        <select name="category" required className="w-full p-3 rounded-xl border">
          {jobCats.map(c=><option key={c} value={c}>{c}</option>)}
        </select>

        <input name="phone" placeholder="Phone e.g. 0116982197" required className="w-full p-3 rounded-xl border" />
        <input name="location" placeholder="Location e.g. Kirinyaga" required className="w-full p-3 rounded-xl border" />
        <textarea name="desc" placeholder="Describe the job..." className="w-full p-3 rounded-xl border h-24" />

        <button disabled={loading} className="w-full bg-black text-white p-4 rounded-xl font-bold">
          {loading? "Posting..." : "Post Job - Pay 100 to Publish"}
        </button>
      </form>
    </div>
  )
}
