"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const cats = [
    { n: "Cleaning", i: "🧹", c: "bg-green-500" },
    { n: "Delivery", i: "🚚", c: "bg-orange-500" },
    { n: "Repairs", i: "🔧", c: "bg-red-500" },
    { n: "Plumbing", i: "💧", c: "bg-blue-500" },
    { n: "Construction", i: "👷", c: "bg-purple-600" },
    { n: "Outside Catering", i: "👨‍🍳", c: "bg-yellow-500" },
    { n: "Tutoring", i: "📚", c: "bg-teal-600" },
    { n: "Online Jobs", i: "💻", c: "bg-indigo-600" },
    { n: "Other", i: "•••", c: "bg-gray-400" },
    { n: "Electrical Services", i: "⚡", c: "bg-pink-500" },
  ]

  const [search, setSearch] = useState("")
  const [unlocked, setUnlocked] = useState<number[]>([])
  const [workers, setWorkers] = useState<any[]>([])
  const mpesa = "0116982197"

  useEffect(() => {
    const w = JSON.parse(localStorage.getItem("workers") || "[]")
    if (w.length === 0) {
      // Demo fundis so buttons show something
      const demo = [
        { name: "Kamau", skill: "Plumbing", loc: "Mwea", phone: "0700000001" },
        { name: "Njogu", skill: "Electrical Services", loc: "Ngurubani", phone: "0700000002" },
        { name: "Wafula", skill: "Cleaning", loc: "Mwea", phone: "0700000003" },
      ]
      localStorage.setItem("workers", JSON.stringify(demo))
      setWorkers(demo)
    } else setWorkers(w)
    setUnlocked(JSON.parse(localStorage.getItem("unlocked_fundis") || "[]"))
  }, [])

  const unlock = async (idx: number) => {
    const raw = prompt(`Pay KES 50 to ${mpesa}\nEnter your M-PESA number (07...)`)
    if (!raw) return
    const phone = raw.startsWith("0")? `254${raw.slice(1)}` : raw
    try {
      alert(`⏳ Sending STK to ${phone}...`)
      const res = await fetch("/api/mpesa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, amount: 1 })
      })
      const data = await res.json()
      if (data.ResponseCode === "0") {
        alert("✅ STK Sent! Enter PIN")
        setTimeout(() => {
          const nu = [...unlocked, idx]
          setUnlocked(nu)
          localStorage.setItem("unlocked_fundis", JSON.stringify(nu))
        }, 12000)
        return
      }
    } catch {}
    if (!confirm(`STK not ready - Use Send Money\nSend KES 50 to ${mpesa}\nOK after pay`)) return
    const nu = [...unlocked, idx]
    setUnlocked(nu)
    localStorage.setItem("unlocked_fundis", JSON.stringify(nu))
  }

  const filtered = workers.filter((w: any) =>
    w.skill.toLowerCase().includes(search.toLowerCase()) ||
    w.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#f5f7fa] pb-24">
      {/* HEADER */}
      <div className="bg-[#0f2a54] p-4 pb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-400 p-2 rounded-xl">🏠🔧</div>
            <h1 className="font-black text-white text-2xl">Task<span className="text-yellow-300">Mate</span></h1>
          </div>
          <div className="flex gap-2">
            <button onClick={()=>router.push("/earnings")} className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold">💰 KES {unlocked.length * 50}</button>
            <button onClick={()=>alert("🔔 No new notifications")} className="bg-white/20 w-8 h-8 rounded-full">🔔</button>
          </div>
        </div>
        <p className="text-white/60 text-sm mt-4">Good morning,</p>
        <p className="text-white font-bold text-xl">Emmanuel</p>
        <p className="text-white/60 text-sm">Find the right help. Get it done.</p>

        <div className="mt-4 bg-white rounded-full p-3 flex items-center gap-2">
          <span>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search for a service or job..." className="flex-1 outline-none text-sm" />
          <button onClick={()=>setSearch("")} className="text-xs bg-gray-100 px-2 py-1 rounded-full">✕</button>
        </div>
      </div>

      {/* BANNER */}
      <div className="mx-4 -mt-2 bg-gradient-to-r from-[#0f2a54] to-[#3b82f6] rounded-2xl p-5 text-white">
        <h2 className="font-bold text-lg">Trusted Services<br/>Across Kenya</h2>
        <p className="text-xs text-white/70 mt-1">Skilled workers • Reliable clients • Secure payments</p>
        <button onClick={()=>router.push("/post")} className="mt-3 bg-white text-[#0f2a54] px-4 py-2 rounded-full text-sm font-bold">+ Post a Job</button>
      </div>

      {/* CATEGORIES */}
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold">Popular Categories</h3>
          <button onClick={()=>{setSearch(""); window.scrollTo(0,400)}} className="text-blue-600 text-sm font-bold">See All ›</button>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-3">
          {cats.map((c, i) => (
            <button key={i} onClick={()=>setSearch(c.n === "Other"? "" : c.n)} className="bg-white border rounded-2xl p-4 text-center active:scale-95 transition">
              <div className={`${c.c} w-12 h-12 mx-auto rounded-xl flex items-center justify-center text-xl text-white`}>{c.i}</div>
              <p className="font-bold text-xs mt-2">{c.n}</p>
            </button>
          ))}
        </div>

        {/* FUNDIS LIST - SHOWS WHEN CATEGORY CLICKED */}
        <div className="mt-6">
          <h3 className="font-bold text-sm mb-2">{search? `Results for "${search}"` : "Available Fundis"}</h3>
          <div className="space-y-3">
            {filtered.map((w: any, i: number) => (
              <div key={i} className="bg-white rounded-2xl p-4 border flex justify-between items-center">
                <div>
                  <p className="font-bold text-sm">{w.name}</p>
                  <p className="text-xs text-gray-500">{w.skill} • {w.loc}</p>
                </div>
                {unlocked.includes(i)? (
                  <a href={`tel:${w.phone}`} className="bg-green-600 text-white px-4 py-2 rounded-full text-xs font-bold">📞 Call</a>
                ) : (
                  <button onClick={()=>unlock(i)} className="bg-[#0f2a54] text-white px-4 py-2 rounded-full text-xs font-bold">Unlock 50</button>
                )}
              </div>
            ))}
            {filtered.length===0 && <p className="text-center text-xs text-gray-400 mt-4">Tap a category above to find fundis 👆</p>}
          </div>
        </div>
      </div>

      {/* BOTTOM NAV - ALL FUNCTIONING */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center p-2 py-3">
        <button onClick={()=>window.scrollTo(0,0)} className="text-center"><p>🏠</p><p className="text-[10px] font-bold">Home</p></button>
        <button onClick={()=>router.push("/jobs")} className="text-center text-gray-400"><p>💼</p><p className="text-[10px]">Jobs</p></button>
        <button onClick={()=>router.push("/post")} className="bg-[#0f2a54] w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl -mt-4 shadow-lg">+</button>
        <button onClick={()=>router.push("/messages")} className="text-center text-gray-400"><p>💬</p><p className="text-[10px]">Messages</p></button>
        <button onClick={()=>router.push("/profile")} className="text-center text-gray-400"><p>👤</p><p className="text-[10px]">Profile</p></button>
      </div>
    </div>
  )
}
