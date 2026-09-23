"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Admin() {
  const router = useRouter()
  const [auth, setAuth] = useState(false)
  const [pass, setPass] = useState("")
  const [jobs, setJobs] = useState<any[]>([])
  const [workers, setWorkers] = useState<any[]>([])
  const ADMIN_PASS = "Mwea2026" // <-- YOUR SECRET PASSWORD
  const mpesa = "0116982197"

  useEffect(() => {
    if (localStorage.getItem("admin_auth") === "yes") setAuth(true)
    setJobs(JSON.parse(localStorage.getItem("workers") || "[]"))
    setWorkers(JSON.parse(localStorage.getItem("workers") || "[]"))
  }, [])

  const login = () => {
    if (pass === ADMIN_PASS) {
      localStorage.setItem("admin_auth", "yes")
      setAuth(true)
    } else alert("❌ Wrong Password!")
  }

  const del = (i: number) => {
    if (!confirm("Delete this job?")) return
    const nw = jobs.filter((_, idx) => idx!== i)
    setJobs(nw)
    localStorage.setItem("workers", JSON.stringify(nw))
  }

  if (!auth) {
    return (
      <div className="min-h-screen bg-[#0f2a54] flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-8 w-full max-w-sm text-center">
          <h1 className="font-black text-xl">🔒 Admin Lock</h1>
          <p className="text-xs text-gray-500 mt-2">Enter password to access TaskMate Admin</p>
          <input
            type="password"
            value={pass}
            onChange={e=>setPass(e.target.value)}
            placeholder="Password"
            className="w-full mt-6 p-3 rounded-xl border text-center"
          />
          <button onClick={login} className="w-full mt-4 bg-[#0f2a54] text-white p-3 rounded-full font-bold">Unlock</button>
          <p className="text-[10px] text-gray-400 mt-4">Hint: Mwea2026 • M-PESA: {mpesa}</p>
          <button onClick={()=>router.push("/")} className="mt-4 text-xs">← Home</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa] p-4">
      <div className="flex justify-between items-center">
        <h1 className="font-black text-xl">👑 Admin Panel</h1>
        <button onClick={()=>{
          localStorage.removeItem("admin_auth")
          setAuth(false)
        }} className="bg-red-500 text-white px-3 py-1 rounded-full text-xs">Logout</button>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="bg-[#0f2a54] text-white p-4 rounded-2xl text-center">
          <p className="text-2xl font-black">{jobs.length}</p>
          <p className="text-xs opacity-70">Total Jobs</p>
        </div>
        <div className="bg-green-600 text-white p-4 rounded-2xl text-center">
          <p className="text-2xl font-black">KES {jobs.length * 50}</p>
          <p className="text-xs opacity-70">Earnings • {mpesa}</p>
        </div>
      </div>

      <h2 className="font-bold mt-6">All Jobs / Fundis</h2>
      <div className="space-y-3 mt-3">
        {jobs.map((j:any,i:number)=>(
          <div key={i} className="bg-white p-4 rounded-2xl border flex justify-between items-center">
            <div>
              <p className="font-bold text-sm">{j.name} - {j.skill}</p>
              <p className="text-xs text-gray-500">{j.loc} • {j.phone}</p>
            </div>
            <button onClick={()=>del(i)} className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">Delete</button>
          </div>
        ))}
        {jobs.length===0 && <p className="text-center text-xs text-gray-400 mt-10">No jobs yet</p>}
      </div>

      <button onClick={()=>router.push("/")} className="w-full mt-8 border p-3 rounded-full">← Back Home</button>
    </div>
  )
}
