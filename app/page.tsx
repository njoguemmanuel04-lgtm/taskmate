"use client";
import { useState } from "react";
export default function Home(){
const [search,setSearch]=useState("");
const go=(p:string)=>window.location.href=p;
const cats=[
{name:"Cleaning",l:"🧹",bg:"bg-green-500",p:"/jobs?cat=cleaning"},
{name:"Delivery",l:"🛵",bg:"bg-orange-500",p:"/jobs?cat=delivery"},
{name:"Repairs",l:"🔧",bg:"bg-red-500",p:"/jobs?cat=repairs"},
{name:"Plumbing",l:"🚿",bg:"bg-blue-500",p:"/jobs?cat=plumbing"},
{name:"Construction",l:"🏗️",bg:"bg-purple-500",p:"/jobs?cat=construction"},
{name:"Outside Catering",l:"🍲",bg:"bg-yellow-500",p:"/jobs?cat=catering"},
{name:"Selling Land",l:"🏞️",bg:"bg-green-600",p:"/land"},
];
return(
<div className="min-h-screen bg-[#eef2f7] pb-20">
<div className="bg-[#0a1f44] p-5 pb-10 rounded-b-[30px]">
<div className="flex justify-between"><div className="text-white font-bold text-xl">TASKMATE</div></div>
<div className="mt-4"><div className="text-white/70 text-sm">What do you need help with?</div></div>
</div>
<div className="bg-gradient-to-r from-[#0a1f44] to-blue-600 mx-4 -mt-6 rounded-2xl p-4 text-white font-bold">Find Trusted Workers Near You</div>
<div className="p-4"><div className="font-bold text-lg mb-3">Popular Categories</div>
<div className="grid grid-cols-2 gap-3">
{cats.map((c:any,i)=><div key={i} onClick={()=>go(c.p)} className="bg-white rounded-2xl p-4 flex flex-col items-center shadow-sm border cursor-pointer active:scale-95">
<div className={`w-14 h-14 ${c.bg} rounded-xl flex items-center justify-center text-2xl`}>{c.l}</div>
<div className="font-bold text-sm mt-2 text-center">{c.name}</div>
{c.name==="Selling Land" && <div className="text-[10px] text-green-600 font-bold text-center mt-1">TILL 1754910<br/>Seller 500 | Buyer 300</div>}
</div>)}
</div></div>
</div>
)
}
