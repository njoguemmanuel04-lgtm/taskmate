"use client"
import { useState, useEffect } from "react"
import Link from "next/link"

const cats = [
  { n: "Cleaning", i: "🧹", c: "bg-green-500" },
  { n: "Delivery", i: "🚚", c: "bg-orange-500" },
  { n: "Repairs", i: "🔧", c: "bg-red-500" },
  { n: "Plumbing", i: "💧", c: "bg-blue-500" },
  { n: "Construction", i: "👷", c: "bg-purple-600" },
  { n: "Catering", i: "👨‍🍳", c: "bg-yellow-500" },
  { n: "Tutoring", i: "📚", c: "bg-teal-600" },
  { n: "Online", i: "💻", c: "bg-indigo-600" },
]

export default function Home() {
  const [workers, setWorkers] = useState<any[]>([])
  const [unlocked, setUnlocked] = useState<number[]>([])
  const [search, setSearch] = useState("")
  const mpesa = "0116982197"

  useEffect(() => {
    setWorkers(JSON.parse(localStorage.getItem("real_fundis") || "[]"))
    setUnlocked(JSON.parse(localStorage.getItem("unlocked_fundis") || "[]"))
  }, [])

  const unlock = (idx: number) => {
    if (!confirm(`SEND MONEY\n\nKES 50 to ${mpesa}\nVia M-PESA Send Money\n\nTap OK after paying`)) return
    const u = [...unlocked, idx]
    setUnlocked(u)
    localStorage.setItem("unlocked_fundis", JSON.stringify(u))
  }

  const list = workers.filter(w =>
   !search || w.skill?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#f0f4f8] pb-20">
      {/* HEADER */}
      <div className="bg-[#0f2a54] text-white p-4">
        <div className="flex justify-between">
          <p className="font-black text-xl">Task<span className="text-yellow-400">Mate</span></p>
          <Link href="/earnings">👤</Link>
        </div>
        <p className="text-xs mt-3 opacity-70">Good morning,</p>
        <p className="font-bold">Emmanuel</p>
        <div className="bg-white rounded-2xl flex gap-2 p-3 mt-3">
          <span>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search service..." className="flex-1 text-black text-sm outline-none" />
        </div>
      </div>

      {/* BANNER */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] rounded-2xl p-4 text-white">
          <p className="font-bold">Trusted Services<br/>Across Kenya</p>
          <Link href="/post-task" className="inline-block mt-3 bg-white text-blue-800 text-xs px-4 py-2 rounded-full font-bold">+ Post a Job</Link>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="p-4">
        <p className="font-bold mb-3">Popular Categories</p>
        <div className="grid grid-cols-4 gap-3">
          {cats.map((cat) => (
            <button key={cat.n} onClick={() => setSearch(cat.n)}
              className="bg-white rounded-2xl p-3 border flex flex-col items-center active:scale-95">
              <div className={`${cat.c} w-12 h-12 rounded-xl flex items-center justify-center text-xl`}>{cat.i}</div>
              <p className="text-[10px] font-bold mt-2">{cat.n}</p>
            </button>
          ))}
        </div>
        {search && <button onClick={() => setSearch("")} className="mt-3 text-xs text-blue-600 underline">Clear: {search} ✕</button>}
      </div>

      {/* WORKERS */}
      <div className="p-4">
        <div className="flex justify-between mb-3">
          <p className="font-bold">Workers ({list.length})</p>
          <Link href="/join" className="text-xs bg-[#0f2a54] text-white px-3 py-1 rounded-full">+ Add</Link>
        </div>

        {list.length === 0? (
          <div className="bg-white rounded-2xl p-6 text-center border">
            <p className="font-bold">No {search || "workers"} yet</p>
            <Link href="/join" className="inline-block mt-3 bg-[#0f2a54] text-white px-6 py-2 rounded-full text-sm">Join as Fundi</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {list.map((w, i) => {
              const idx = workers.indexOf(w)
              const ok = unlocked.includes(idx)
              return (
                <div key={i} className="bg-white rounded-2xl p-3 flex gap-3 border">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">👨‍🔧</div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{w.name}</p>
                    <p className="text-xs text-gray-500">{w.skill}</p>
                  </div>
                  {ok? (
                    <a href={`tel:${w.phone}`} className="bg-green-600 text-white text-xs px-4 py-2 rounded-full self-center">Call</a>
                  ) : (
                    <button onClick={() => unlock(idx)} className="bg-[#0f2a54] text-white text-xs px-4 py-2 rounded-full self-center">Hire Now</button>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* NAV */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-3">
        <Link href="/" className="flex flex-col items-center"><span>🏠</span><span className="text-[10px] font-bold">Home</span></Link>
        <Link href="/jobs" className="flex flex-col items-center opacity-50"><span>💼</span><span className="text-[10px]">Jobs</span></Link>
        <Link href="/join" className="bg-[#0f2a54] w-12 h-12 rounded-full flex items-center justify-center text-white -mt-2">+</Link>
        <Link href="/connections" className="flex flex-col items-center opacity-50"><span>💬</span><span className="text-[10px]">Chat</span></Link>
        <Link href="/earnings" className="flex flex-col items-center opacity-50"><span>👤</span><span className="text-[10px]">Profile</span></Link>
      </div>
    </div>
  )
}
