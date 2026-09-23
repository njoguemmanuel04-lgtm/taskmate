"use client"
import Link from "next/link"

export default function Home(){
  const categories=[
    {name:"Cleaning", icon:"🧹", bg:"bg-green-500"},
    {name:"Delivery", icon:"🚚", bg:"bg-orange-500"},
    {name:"Repairs", icon:"🔧", bg:"bg-red-500"},
    {name:"Plumbing", icon:"💧", bg:"bg-blue-500"},
    {name:"Construction", icon:"👷", bg:"bg-purple-600"},
    {name:"Outside Catering", icon:"👨‍🍳", bg:"bg-yellow-500"},
  ]

  return(
    <div className="min-h-screen bg-[#f0f3f8] pb-24">
      {/* HEADER - Same as your screenshot */}
      <div className="bg-[#0f2a54] text-white p-5 rounded-b-[30px]">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-400 p-2 rounded-xl text-xl">🏠🔧</div>
            <h1 className="font-black text-xl">Task<span className="text-yellow-400">Mate</span></h1>
          </div>
          <div className="flex gap-2 items-center">
            <Link href="/subscription" className="bg-white/20 px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1">
              💰 KES 50
            </Link>
            <div className="bg-white/20 p-2 rounded-full">🔔</div>
          </div>
        </div>

        <p className="text-white/60 mt-6 text-sm">Good morning,</p>
        <h2 className="font-black text-2xl">Emmanuel</h2>
        <p className="text-white/60 text-sm">Find the right help. Get it done.</p>

        <div className="bg-white rounded-full flex items-center p-3 mt-5 gap-2">
          <span>🔍</span>
          <input placeholder="Search for a service or job..." className="flex-1 text-black outline-none text-sm" />
          <span className="bg-gray-100 rounded-full w-7 h-7 flex items-center justify-center text-xs">X</span>
        </div>
      </div>

      {/* BANNER */}
      <div className="mx-4 -mt-2 bg-gradient-to-r from-[#0f2a54] to-[#3b82f6] rounded-[20px] p-5 text-white">
        <h3 className="font-black text-lg leading-tight">Trusted Services<br/>Across Kenya</h3>
        <p className="text-white/70 text-[11px] mt-1">Skilled workers • Reliable clients • Secure payments</p>
        <Link href="/post" className="inline-block bg-white text-[#0f2a54] text-sm font-bold px-4 py-2 rounded-full mt-4">+ Post a Job</Link>
      </div>

      {/* CATEGORIES - Same as screenshot */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-black">Popular Categories</h3>
          <Link href="/categories" className="text-blue-600 text-sm font-bold">See All ›</Link>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {categories.map((c)=>(
            <div key={c.name} className="bg-white rounded-2xl p-5 text-center border">
              <div className={`${c.bg} w-12 h-12 rounded-xl flex items-center justify-center text-xl mx-auto`}>{c.icon}</div>
              <p className="font-bold text-sm mt-3">{c.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM NAV - Same as screenshot */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-3">
        <span className="text-center text-xs font-bold">🏠<br/>Home</span>
        <span className="text-center text-xs text-gray-400">💼<br/>Jobs</span>
        <div className="bg-[#0f2a54] w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl -mt-6">+</div>
        <span className="text-center text-xs text-gray-400">💬<br/>Messages</span>
        <Link href="/subscription" className="text-center text-xs text-gray-400">👤<br/>Profile</Link>
      </div>
    </div>
  )
}
