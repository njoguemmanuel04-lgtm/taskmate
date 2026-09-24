"use client";
import { useState } from "react";
export default function Home(){
const [search,setSearch]=useState("");
const go=(p:string)=>window.location.href=p;
const cats=[
{name:"Cleaning",l:"C",bg:"bg-green-500"},
{name:"Delivery",l:"D",bg:"bg-orange-500"},
{name:"Repairs",l:"R",bg:"bg-red-500"},
{name:"Plumbing",l:"P",bg:"bg-blue-500"},
{name:"Construction",l:"C",bg:"bg-purple-500"},
{name:"Outside Catering",l:"O",bg:"bg-yellow-500"},
{name:"Selling Land",l:"LAND",bg:"bg-green-600",special:true,path:"/land"},
];
return(
<div className="min-h-screen bg-[#eef2f7] pb-24">
<div className="bg-[#0a1f44] p-5 pb-10 rounded-b-[24px] text-white">
<div className="flex justify-between"><div className="flex gap-2 items-center"><div className="bg-[#ffcc00] p-2 rounded-lg text-[#0a1f44] font-black">TM</div><b>TaskMate</b></div><div className="flex gap-3"><span onClick={()=>go('/subscription')}>KES 50</span><span>🔔</span></div></div>
<div className="mt-4"><div className="text-sm opacity-80">Good morning,</div><div className="font-bold text-xl">Emmanuel</div><div className="bg-white rounded-full flex items-center p-3 mt-3"><span className="text-black text-sm mr-2">Search:</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." className="flex-1 outline-none text-black text-sm"/></div></div>
</div>
<div className="bg-gradient-to-r from-[#0a1f44] to-blue-600 text-white mx-4 -mt-5 p-5 rounded-2xl"><h2 className="font-bold">Trusted Services<br/>Across Kenya</h2><button onClick={()=>go('/post-job')} className="bg-white text-[#0a1f44] px-4 py-2 rounded-full font-black text-sm mt-3">+ Post a Job</button></div>
<div className="p-4"><div className="font-bold mb-3">Popular Categories</div>
<div className="grid grid-cols-2 gap-3">
{cats.map((c:any,i)=><div key={i} onClick={()=>go(c.path?c.path:`/workers?cat=${c.name}`)} className={`bg-white rounded-2xl p-5 text-center border cursor-pointer ${c.special?'border-2 border-green-600 bg-green-50':''}`}><div className={`w-14 h-14 ${c.bg} rounded-xl mx-auto flex items-center justify-center text-white font-black mb-2 text-[10px]`}>{c.l}</div><div className="font-bold text-sm">{c.name}</div>{c.special&&<><div className="text-green-600 text-[11px] font-black mt-1">TILL 1754910</div><div className="text-[10px] font-semibold">Seller 500 | Buyer 300 | Broker FREE</div></>}</div>)}
</div></div>
<div className="fixed bottom-0 left-0 right-0 bg-white flex justify-around p-3 border-t"><div>Home</div><div>Jobs</div><div className="bg-[#0a1f44] text-white w-12 h-12 rounded-full flex items-center justify-center -mt-6 font-black">+</div><div>Msgs</div><div>Profile</div></div>
</div>
)}
