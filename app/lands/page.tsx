"use client";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Link from "next/link";
export default function LandsPage(){
const [lands,setLands]=useState<any[]>([]);
const [loading,setLoading]=useState(true);
useEffect(()=>{fetchLands();},[]);
async function fetchLands(){
setLoading(true);
const {data}=await supabase.from("lands").select("*").order("created_at",{ascending:false});
if(data)setLands(data);
setLoading(false);
}
return(
<div className="min-h-screen bg-[#eef2f7] pb-20">
<div className="bg-[#0a1931] text-white p-5 flex gap-3 items-center">
<Link href="/" className="text-2xl">←</Link>
<h1 className="text-xl font-black">Lands - Send Money 0116982197</h1>
</div>
<div className="p-4">
<div className="bg-green-50 border-2 border-green-600 rounded-[15px] p-4 text-center mb-4">
<p className="font-black text-green-800">🏞️ Selling Land in Kirinyaga</p>
<p className="text-xs mt-1 font-bold">Send Money 0116982197 • Seller 500 | Buyer 300</p>
</div>
{loading?<p className="text-center mt-10 font-bold">Loading cloud... ☁️</p>:lands.length===0?(
<div className="text-center mt-10 bg-white p-10 rounded-[20px]">
<p className="text-5xl">🏞️</p>
<p className="font-bold mt-3">No lands yet - Cloud empty</p>
<p className="text-xs opacity-60">Go Supabase → lands → Add row!</p>
</div>
):(
<div className="grid gap-4">
{lands.map((land:any)=>(
<div key={land.id} className="bg-white rounded-[20px] overflow-hidden shadow">
{land.image_url&&<img src={land.image_url} className="w-full h-48 object-cover"/>}
<div className="p-4">
<h3 className="font-black">{land.title||land.location}</h3>
<p className="text-sm opacity-70">{land.location}</p>
<p className="font-black text-green-700 text-xl mt-1">KES {land.price}</p>
<a href={`tel:${land.phone}`} className="bg-green-600 text-white w-full block text-center py-3 rounded-full font-black mt-3">Call {land.phone}</a>
</div>
</div>
))}
</div>
)}
</div>
</div>
);
}
