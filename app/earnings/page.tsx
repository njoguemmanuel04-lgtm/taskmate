"use client"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function Earnings() {
  const mpesa = "0116982197"
  const [stats, setStats] = useState({ unlocked: 0, jobs: 0, subs: 0 })
  const [jobAmount, setJobAmount] = useState("2000")

  useEffect(() => {
    const unlocked = JSON.parse(localStorage.getItem("unlocked_fundis") || "[]").length
    const jobs = JSON.parse(localStorage.getItem("jobs_done") || "[]").length
    setStats({ unlocked, jobs, subs: 0 })
  }, [])

  const unlockMoney = stats.unlocked * 50
  const commission = stats.jobs * Number(jobAmount) * 0.1
  const subMoney = stats.subs * 300
  const total = unlockMoney + commission + subMoney

  const markJobDone = () => {
    const done = JSON.parse(localStorage.getItem("jobs_done") || "[]")
    done.push({ amount: jobAmount, date: new Date().toLocaleString() })
    localStorage.setItem("jobs_done", JSON.stringify(done))
    setStats({...stats, jobs: done.length })
    alert(`✅ Job Done! Collect KES ${Number(jobAmount)*0.1} from fundi via Send Money to ${mpesa}`)
  }

  return (
    <div className="min-h-screen bg-[#f0f4f8] p-4 pb-20">
      <Link href="/" className="text-sm">← Home</Link>
      <h1 className="font-black text-2xl mt-2">💰 CEO Dashboard</h1>
      <p className="text-xs text-gray-500">M-PESA Send Money: {mpesa}</p>

      {/* TOTAL */}
      <div className="bg-[#0f2a54] text-white rounded-2xl p-5 mt-4">
        <p className="text-xs opacity-70">Total Earnings</p>
        <p className="text-3xl font-black">KES {total}</p>
        <p className="text-xs mt-1 opacity-60">Unlock + 10% + Subscription</p>
      </div>

      {/* 3 STREAMS */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        <div className="bg-white rounded-xl p-3 border text-center">
          <p className="text-[10px]">Unlock</p>
          <p className="font-black">KES {unlockMoney}</p>
          <p className="text-[10px] text-gray-500">{stats.unlocked} × 50</p>
        </div>
        <div className="bg-green-50 rounded-xl p-3 border border-green-200 text-center">
          <p className="text-[10px]">10% Jobs</p>
          <p className="font-black text-green-700">KES {commission}</p>
          <p className="text-[10px] text-gray-500">{stats.jobs} jobs</p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-3 border border-yellow-200 text-center">
          <p className="text-[10px]">Subs</p>
          <p className="font-black">KES {subMoney}</p>
          <p className="text-[10px] text-gray-500">{stats.subs} × 300</p>
        </div>
      </div>

      {/* 10% COLLECTOR */}
      <div className="bg-white rounded-2xl p-4 mt-4 border">
        <p className="font-bold text-sm">💼 Collect 10% Commission</p>
        <p className="text-xs text-gray-500 mt-1">Fundi was paid how much?</p>
        <input value={jobAmount} onChange={e=>setJobAmount(e.target.value)}
          className="w-full mt-2 p-3 border rounded-xl font-bold text-lg" placeholder="2000" />
        <p className="mt-2 text-sm">You get: <span className="font-black text-green-600">KES {Number(jobAmount)*0.1}</span></p>
        <button onClick={markJobDone} className="w-full mt-3 bg-green-600 text-white p-3 rounded-full font-bold">✅ Mark Job Done & Collect 10%</button>
        <p className="text-[10px] text-center mt-2 text-gray-500">Tell fundi: Send KES {Number(jobAmount)*0.1} to {mpesa} Send Money</p>
      </div>

      {/* SUBSCRIPTION */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-4 mt-4 text-black">
        <p className="font-black text-sm">💎 Subscription - KES 300/month</p>
        <p className="text-xs mt-1">Fundis pay to stay Premium + Top listing</p>
        <div className="bg-black/10 rounded-xl p-2 mt-3 text-xs">
          Message to fundis:<br/>
          <span className="font-bold">"Send KES 300 to {mpesa} (Send Money) monthly for Premium badge"</span>
        </div>
      </div>

      {/* NAV */}
      <div className="flex gap-2 mt-6">
        <Link href="/connections" className="flex-1 bg-white border p-3 rounded-full text-center font-bold text-sm">👥 Connections</Link>
        <Link href="/" className="flex-1 bg-[#0f2a54] text-white p-3 rounded-full text-center font-bold text-sm">🏠 Home</Link>
      </div>
    </div>
  )
}
