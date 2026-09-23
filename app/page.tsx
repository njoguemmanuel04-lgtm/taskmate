"use client"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function Home() {
  const cats = [
    { n: "Cleaning", i: "🧹", c: "bg-green-500" },
    { n: "Delivery", i: "🚚", c: "bg-orange-500" },
    { n: "Repairs", i: "🔧", c: "bg-red-500" },
    { n: "Plumbing", i: "💧", c: "bg-blue-500" },
    { n: "Construction", i: "👷", c: "bg-purple-500" },
    { n: "Catering", i: "👨‍🍳", c: "bg-yellow-500" },
    { n: "Tutoring", i: "📚", c: "bg-teal-600" },
    { n: "Online", i: "💻", c: "bg-indigo-600" },
  ]

  const [workers, setWorkers] = useState<any[]>([])
  const [unlocked, setUnlocked] = useState<number[]>([])
  const [search, setSearch] = useState("")
  const mpesa = "0116982197"

  useEffect(() => {
    setWorkers(JSON.parse(localStorage.getItem("workers") || "[]"))
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

    if (!confirm(`STK not ready - Use Send Money\nSend KES 50 to ${mpesa}\nM-PESA -> Send Money\nOK after pay`)) return
    const nu = [...unlocked, idx]
    setUnlocked(nu)
    localStorage.setItem("unlocked_fundis", JSON.stringify(nu))
  }

  const list = workers.length? workers : [
    { name: "Kamau", skill: "Plumbing", loc: "Mwea" },
    { name: "Njogu", skill: "Repairs", loc: "Ngurubani" },
  ]

  const filtered = list.filter((w: any) =>
    (w.skill || "").toLowerCase().includes(search.toLowerCase()) ||
    (w.name || "").toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#f0f4f8] p-4 pb-20">
      <div className="flex justify-between">
        <h1 className="font-black text-xl">🔧 TaskMate</h1>
        <Link href="/earnings" className="bg-[#0f2a54] text-white px-3 py-1 rounded-full text-xs">💰 KES {unlocked.length * 50}</Link>
      </div>

      <input value={search} onChange={e => setSearch(e.target.value)}
        placeholder="Search skill..."
        className="w-full mt-4 p-3 rounded-full border bg-white" />

      <div className="grid grid-cols-4 gap-2 mt-4">
        {cats.map((c, i) => (
          <div key={i} className={`${c.c} text-white p-3 rounded-2xl text-center`}>
            <p>{c.i}</p><p className="text-[10px] font-bold">{c.n}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        {filtered.map((w: any, i: number) => (
          <div key={i} className="bg-white rounded-2xl p-4 border flex justify-between items-center">
            <div>
              <p className="font-bold text-sm">{w.name}</p>
              <p className="text-xs text-gray-500">{w.skill} • {w.loc}</p>
            </div>
            {unlocked.includes(i)? (
              <a href={`tel:${w.phone || mpesa}`} className="bg-green-600 text-white px-4 py-2 rounded-full text-xs font-bold">Call</a>
            ) : (
              <button onClick={() => unlock(i)} className="bg-[#0f2a54] text-white px-4 py-2 rounded-full text-xs font-bold">Unlock 50</button>
            )}
          </div>
        ))}
      </div>

      <p className="text-center text-[10px] text-gray-400 mt-8">Send Money to {mpesa} • STK Push Ready</p>
    </div>
  )
}
