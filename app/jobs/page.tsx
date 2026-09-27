"use client"
import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
const supabaseUrl = "https://tvgbluiespttqwptpwlj.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2Z2JsdWllc3B0dHF3cHRwd2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwNzA4MDcsImV4cCI6MjEwNTY0NjgwN30.Pmbgxx45ziJCtjrtt2eEzjDAbiVqzq4lqv0Qjn7iqoc"
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Jobs(){
  const [jobs,setJobs]=useState<any[]>([])
  useEffect(()=>{ load() },[])
  const load = async () => {
    const {data} = await supabase.from("jobs").select("*").order("id",{ascending:false})
    if(data) setJobs(data)
  }
  
  const handlePay = () => {
    alert("💰 SEND 100 TO 0116982197\n\n1. Go to M-Pesa\n2. Send 100 to 0116982197\n3. Wait for ADMIN to verify\n4. Number will unlock!\n\nAfter sending, WhatsApp Admin: 0116982197")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-[#0a1931] text-white p-4 font-bold text-xl">Jobs - Cloud</div>
      <div className="p-4 space-y-4">
        {jobs.map(j=>(
          <div key={j.id} className="bg-white rounded-3xl border-2 border-black p-4">
            <div className="flex justify-between">
              <b className="text-lg">{j.category}</b>
              <span className="bg-black text-white px-3 py-1 rounded-full text-sm">💰100</span>
            </div>
            <div className="mt-1">Client: <b className="text-lg">{j.name}</b></div>
            
            {j.is_unlocked ? (
              <>
                <div className="mt-1 font-bold text-green-700">📞 {j.phone}</div>
                <a href={`tel:${j.phone}`} className="mt-3 block bg-green-600 text-white text-center py-3 rounded-full font-bold">📞 CALL {j.name} NOW</a>
              </>
            ) : (
              <>
                <div className="mt-1 text-gray-600">📞 07xxxxxxxx <span className="bg-red-100 px-2 py-1 rounded text-xs">🔒 Locked</span></div>
                <div className="mt-3 bg-orange-50 border-2 border-dashed border-orange-500 rounded-2xl p-3 flex justify-between items-center">
                  <div><b>🔒 Number Locked</b><div className="text-xs">Pay 100 to 0116982197</div></div>
                  <button onClick={handlePay} className="bg-[#0a1931] text-white px-6 py-2 rounded-full font-bold">PAY</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
