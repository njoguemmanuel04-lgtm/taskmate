"use client";
import { useState } from "react";
export default function Page(){
const [q,setQ]=useState("");
return (
<div className="bg-slate-100 min-h-screen pb-20">
<div className="bg-[#0a1f44] p-5 rounded-b-3xl">
<div className="flex justify-between">
<b className="text-white text-xl">TaskMate</b>
<div className="flex gap-2">
<button onClick={()=>location.href="/subscription"} className="bg-white/20 text-white rounded-full px-3 py-1 text-sm">KES 50 ⭐</button>
<span className="bg-white/20 rounded-full px-2 py-1">🔔</span>
</div>
</div>
<p className="text-slate-400 mt-5">Good morning,</p>
<h1 className="text-white text-3xl font-bold">Emmanuel</h1>
<div className="bg-white rounded-full p-3 flex gap-2 mt-4">
<span>🔍</span>
<input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search..." className="flex-1 outline-none"/>
</div>
</div>

<div className="bg-blue-600 -mt-5 mx-4 rounded-2xl p-4 text-white">
<b>Trusted Services Across Kenya</b>
</div>

<div className="grid grid-cols-2 gap-3 p-4">
<div onClick={()=>location.href="/land"} className="bg-white rounded-2xl p-4 text-center border border-black">
<div className="text-2xl">🌍</div>
<b className="text-xs">Selling Land</b>
<div className="text-[10px] text-green-600">TILL 1754910</div>
</div>
<div className="bg-white rounded-2xl p-4 text-center border border-black"><div className="text-2xl">🧹</div><b className="text-xs">Cleaning</b></div>
<div className="bg-white rounded-2xl p-4 text-center border border-black"><div className="text-2xl">🛵</div><b className="text-xs">Delivery</b></div>
<div className="bg-white rounded-2xl p-4 text-center border border-black"><div className="text-2xl">🔧</div><b className="text-xs">Repairs</b></div>
</div>
</div>
)
}
