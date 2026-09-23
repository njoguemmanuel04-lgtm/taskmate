"use client";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const go = (path: string) => window.location.href = path;
  const handleSearch = () => {
    if (search.trim()) go(`/jobs?search=${search}`);
    else go('/jobs');
  };

  return (
    <div className="min-h-screen bg-[#eef2f7] pb-24">
      {/* HEADER - ORIGINAL COLOR #0a1f44 + KES 50 LINKED TO SUBSCRIPTION */}
      <div className="bg-[#0a1f44] rounded-b-[30px] p-5 pb-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-[#ffcc00] p-2 rounded-xl">🏠🔧</div>
            <h1 className="text-white font-bold text-2xl">Task<span className="text-[#ffcc00]">Mate</span></h1>
          </div>
          <div className="flex items-center gap-2">
            <div onClick={()=>go('/subscription')} className="bg-white/20 text-white px-3 py-1.5 rounded-full text-sm font-bold cursor-pointer">
              💰 KES 50
            </div>
            <div onClick={()=>go('/notifications')} className="bg-white/20 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer">🔔</div>
          </div>
        </div>
        <p className="text-white/60 text-sm">Good morning,</p>
        <h2 className="text-white text-2xl font-bold">Emmanuel</h2>
        <p className="text-white/60 text-sm mb-4">Find the right help. Get it done.</p>
        <div className="bg-white rounded-full flex items-center px-4 py-3 gap-2">
          <span>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleSearch()} placeholder="Search for a service or job..." className="flex-1 outline-none text-sm" />
        </div>
      </div>

      {/* BANNER - ORIGINAL BLUE GRADIENT */}
      <div className="px-4 -mt-6">
        <div className="bg-gradient-to-r from-[#0a1f44] to-[#3b82f6] rounded-[20px] p-5 text-white">
          <h3 className="font-bold text-xl">Trusted Services<br/>Across Kenya</h3>
          <p className="text-white/70 text-xs mt-1">Skilled workers • Reliable clients • Secure payments</p>
          <button onClick={()=>go('/post-job')} className="mt-4 bg-white text-[#0a1f44] px-4 py-2 rounded-full text-sm font-bold">+ Post a Job</button>
        </div>
      </div>

      {/* CATEGORIES - ALL WORKING FOREVER */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-[#0a1f44]">Popular Categories</h3>
          <button onClick={()=>go('/jobs')} className="text-blue-600 text-sm font-bold">See All ›</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div onClick={()=>go('/jobs?category=Cleaning')} className="bg-white border rounded-2xl p-5 text-center cursor-pointer"><div className="bg-green-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">🧹</div><p className="font-bold text-sm">Cleaning</p></div>
          <div onClick={()=>go('/jobs?category=Delivery')} className="bg-white border rounded-2xl p-5 text-center cursor-pointer"><div className="bg-orange-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">🚚</div><p className="font-bold text-sm">Delivery</p></div>
          <div onClick={()=>go('/jobs?category=Repairs')} className="bg-white border rounded-2xl p-5 text-center cursor-pointer"><div className="bg-red-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">🔧</div><p className="font-bold text-sm">Repairs</p></div>
          <div onClick={()=>go('/jobs?category=Plumbing')} className="bg-white border rounded-2xl p-5 text-center cursor-pointer"><div className="bg-blue-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">💧</div><p className="font-bold text-sm">Plumbing</p></div>
          <div onClick={()=>go('/jobs?category=Construction')} className="bg-white border rounded-2xl p-5 text-center cursor-pointer"><div className="bg-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">👷</div><p className="font-bold text-sm">Construction</p></div>
          <div onClick={()=>go('/jobs?category=Catering')} className="bg-white border rounded-2xl p-5 text-center cursor-pointer"><div className="bg-yellow-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">👨‍🍳</div><p className="font-bold text-sm">Outside Catering</p></div>
        </div>
      </div>

      {/* BOTTOM NAV - ALL WORKING FOREVER */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center py-2">
        <button onClick={()=>go('/')} className="flex flex-col items-center text-[#0a1f44]"><span>🏠</span><span className="text-xs font-bold">Home</span></button>
        <button onClick={()=>go('/jobs')} className="flex flex-col items-center text-gray-400"><span>💼</span><span className="text-xs">Jobs</span></button>
        <button onClick={()=>go('/post-job')} className="bg-[#0a1f44] text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl -mt-6">+</button>
        <button onClick={()=>go('/messages')} className="flex flex-col items-center text-gray-400"><span>💬</span><span className="text-xs">Messages</span></button>
        <button onClick={()=>go('/profile')} className="flex flex-col items-center text-gray-400"><span>👤</span><span className="text-xs">Profile</span></button>
      </div>
    </div>
  );
}
