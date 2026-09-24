"use client";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const go = (path: string) => window.location.href = path;
  const handleSearch = () => {
    if (search.trim()) go(`/jobs?search=${search}`);
    else go('/jobs');
  };

  const categories = [
    { name: "Cleaning", letter: "C", bg: "bg-green-500" },
    { name: "Delivery", letter: "D", bg: "bg-orange-500" },
    { name: "Repairs", letter: "R", bg: "bg-red-500" },
    { name: "Plumbing", letter: "P", bg: "bg-blue-500" },
    { name: "Construction", letter: "C", bg: "bg-purple-500" },
    { name: "Outside Catering", letter: "O", bg: "bg-yellow-500" },
    { name: "Selling Land", letter: "LAND", bg: "bg-green-600", special: true, till: "1754910", sub: "Seller 500 | Buyer 300 | Broker FREE" },
  ];

  return (
    <div className="min-h-screen bg-[#eef2f7] pb-24">
      {/* HEADER - ORIGINAL COLOR #0a1f44 - NOT TAMPERED */}
      <div className="bg-[#0a1f44] rounded-b-[24px] p-5 pb-10 text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-[#ffcc00] p-2 rounded-lg text-[#0a1f44] font-black">TM</div>
            <h1 className="font-bold text-lg">TaskMate</h1>
          </div>
          <div className="flex items-center gap-3">
            <div onClick={()=>go('/subscription')} className="flex items-center gap-1 text-sm cursor-pointer">💰 KES 50</div>
            <div onClick={()=>go('/notifications')} className="cursor-pointer">🔔</div>
          </div>
        </div>
        <div className="mt-4">
          <div className="text-sm opacity-80">Good morning,</div>
          <div className="font-bold text-xl">Emmanuel</div>
          <div className="bg-white rounded-full flex items-center p-3 mt-3">
            <span className="text-black text-sm mr-2">Search:</span>
            <input value={search} onChange={(e)=>setSearch(e.target.value)} onKeyDown={(e)=>e.key==='Enter' && handleSearch()} placeholder="Search for a service or job..." className="flex-1 outline-none text-black text-sm" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#0a1f44] to-blue-600 text-white mx-4 -mt-5 p-5 rounded-2xl">
        <h2 className="font-bold text-lg">Trusted Services<br/>Across Kenya</h2>
        <p className="text-xs mt-1 opacity-90">Skilled workers - Reliable clients - Secure payments</p>
        <button onClick={()=>go('/post-job')} className="bg-white text-[#0a1f44] px-4 py-2 rounded-full font-black text-sm mt-3">+ Post a Job</button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold">Popular Categories</h3>
          <span onClick={()=>go('/tasks')} className="text-blue-600 text-sm font-bold cursor-pointer">See All {">"}</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((c,i)=>(
            <div key={i} onClick={()=>go(`/workers?cat=${c.name}`)} className={`bg-white rounded-2xl p-5 text-center border cursor-pointer ${c.special? 'border-2 border-green-600 bg-green-50' : 'border-gray-200'}`}>
              <div className={`w-14 h-14 ${c.bg} rounded-xl mx-auto flex items-center justify-center text-white font-black mb-2 text-xs`}>{c.letter}</div>
              <div className="font-bold text-sm">{c.name}</div>
              {c.special && (
                <>
                  <div className="text-green-600 text-[11px] font-black mt-1">TILL {c.till}</div>
                  <div className="text-[10px] mt-1">{c.sub}</div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white flex justify-around p-3 border-t">
        <div onClick={()=>go('/')} className="cursor-pointer">Home</div>
        <div onClick={()=>go('/jobs')} className="cursor-pointer">Jobs</div>
        <div onClick={()=>go('/post-job')} className="bg-[#0a1f44] text-white w-12 h-12 rounded-full flex items-center justify-center -mt-6 font-black cursor-pointer">+</div>
        <div onClick={()=>go('/messages')} className="cursor-pointer">Msgs</div>
        <div onClick={()=>go('/profile')} className="cursor-pointer">Profile</div>
      </div>
    </div>
  );
}
