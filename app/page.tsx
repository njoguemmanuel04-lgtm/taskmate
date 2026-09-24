"use client";
import { useState } from "react";
export default function Home(){
const [search,setSearch]=useState("");
const go=(p:string)=>{window.location.href=p};
return(
<div className="min-h-screen bg-[#eef2f7] pb-20">
<div className="bg-[#0a1931] text-white p-4 rounded-b-[24px]">
<div className="flex justify-between"><div><h1 className="font-bold">TaskMate</h1><p className="text-[10px] opacity-70">Kirinyaga • Find help. Get it done.</p></div><div className="flex gap-2"><span className="bg-white text-black text-xs px-2 py-1 rounded-full">KES 50</span><span>🔔</span></div></div>
<div className="mt-4 bg-white rounded-full flex items-center p-2"><span className="px-2">🔍</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." className="flex-1 outline-none text-black text-sm"/><button onClick={()=>go(search?`/jobs?search=${search}`:'/jobs')} className="bg-[#0a1931] text-white px-4 py-1 rounded-full text-sm">Search</button></div>
<div className="mt-4 bg-blue-600 rounded-2xl p-4 flex justify-between items-center"><div><h2 className="font-bold text-sm">Trusted Services Across Kenya</h2><p className="text-[10px]">Skilled workers • Secure payments</p><button onClick={()=>go('/post-job')} className="mt-2 bg-white text-black text-xs px-3 py-1 rounded-full font-bold">+ Post a Job</button></div><div className="text-3xl">🛡️</div></div>
</div>
<div className="p-4"><div className="flex justify-between mb-3"><h3 className="font-bold text-sm">Popular Categories</h3><span onClick={()=>go('/jobs')} className="text-xs text-blue-600">See All</span></div>
<div className="grid grid-cols-2 gap-3">
<div onClick={()=>go('/jobs?cat=Cleaning')} className="bg-white p-4 rounded-2xl shadow text-center"><div className="bg-green-500 w-10 h-10 rounded-xl mx-auto flex items-center justify-center text-white">C</div><p className="text-xs font-bold mt-1">Cleaning</p></div>
<div onClick={()=>go('/jobs?cat=Delivery')} className="bg-white p-4 rounded-2xl shadow text-center"><div className="bg-orange-500 w-10 h-10 rounded-xl mx-auto flex items-center justify-center text-white">D</div><p className="text-xs font-bold mt-1">Delivery</p></div>
<div onClick={()=>go('/jobs?cat=Repairs')} className="bg-white p-4 rounded-2xl shadow text-center"><div className="bg-red-500 w-10 h-10 rounded-xl mx-auto flex items-center justify-center text-white">R</div><p className="text-xs font-bold mt-1">Repairs</p></div>
<div onClick={()=>go('/jobs?cat=Plumbing')} className="bg-white p-4 rounded-2xl shadow text-center"><div className="bg-blue-500 w-10 h-10 rounded-xl mx-auto flex items-center justify-center text-white">P</div><p className="text-xs font-bold mt-1">Plumbing</p></div>
<div onClick={()=>go('/jobs?cat=Construction')} className="bg-white p-4 rounded-2xl shadow text-center"><div className="bg-purple-500 w-10 h-10 rounded-xl mx-auto flex items-center justify-center text-white">C</div><p className="text-xs font-bold mt-1">Construction</p></div>
<div onClick={()=>go('/jobs?cat=Catering')} className="bg-white p-4 rounded-2xl shadow text-center"><div className="bg-yellow-500 w-10 h-10 rounded-xl mx-auto flex items-center justify-center text-white">O</div><p className="text-xs font-bold mt-1">Outside Catering</p></div>
<div onClick={()=>go('/land')} className="bg-white p-4 rounded-2xl shadow text-center border-2 border-green-600 col-span-2"><p className="bg-green-100 text-green-700 text-[9px] px-2 py-1 rounded w-fit mx-auto">LAND</p><p className="text-xs font-bold mt-1">Selling Land</p><p className="text-[9px]">TILL 1754910 • Seller 500 | Buyer 300 | Broker FREE</p></div>
</div></div>
<div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-3 text-[10px]"><span onClick={()=>go('/')} className="font-bold">🏠Home</span><span onClick={()=>go('/jobs')}>💼Jobs</span><span onClick={()=>go('/post-job')} className="bg-[#0a1931] text-white w-10 h-10 rounded-full flex items-center justify-center -mt-3">+</span><span>💬</span><span>👤</span></div>
</div>
)}
