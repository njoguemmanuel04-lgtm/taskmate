"use client";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Link from "next/link";

export default function JobsPage(){
const [jobs,setJobs]=useState<any[]>([]);
const [loading,setLoading]=useState(true);

useEffect(()=>{fetchJobs();},[]);

async function fetchJobs(){
setLoading(true);
const {data}=await supabase.from("jobs").select("*").order("created_at",{ascending:false});
if(data)setJobs(data);
setLoading(false);
}

async function requestPay(id:string){
const {error}=await supabase.from("jobs").update({pay_requested:true}).eq("id",id);
if(!error){
alert("Payment request sent! ✅ Wait for admin to verify your payment to 0116982197");
fetchJobs();
}
}

return(
<div className="min-h-screen bg-[#eef2f7] pb-20">
<div className="bg-[#0a1931] text-white p-5 flex gap-3 items-center">
<Link href="/" className="text-2xl">←</Link>
<h1 className="font-black text-xl">Jobs - Pay to Unlock</h1>
</div>

<div className="p-4">
{loading?<p className="text-center mt-10 font-bold">Loading cloud... ☁️</p>:jobs.map((j:any)=>(
<div key={j.id} className="bg-white rounded-[20px] p-4 mb-3 border shadow-sm">
<h3 className="font-black">{j.title}</h3>
<p className="text-sm opacity-70">📍 {j.location} | 💰 {j.budget}</p>

{j.unlocked?(
<div className="mt-3 bg-green-50 border-2 border-green-600 rounded-xl p-3 flex justify-between items-center">
<span className="font-black text-green-800">📞 {j.phone}</span>
<a href={`tel:${j.phone}`} className="bg-green-600 text-white px-4 py-2 rounded-full font-black text-xs">Call Now</a>
</div>
): j.pay_requested?(
<div className="mt-3 bg-yellow-50 border-2 border-yellow-500 rounded-xl p-3 text-center">
<p className="font-black text-yellow-800 text-sm">⏳ Waiting for admin to verify...</p>
<p className="text-[11px] mt-1">You paid to 0116982197 - Admin will unlock soon</p>
</div>
):(
<div className="mt-3 bg-[#f0f2f5] border-2 border-dashed border-orange-500 rounded-xl p-3 flex justify-between items-center">
<div>
<p className="font-black text-xs">🔒 Locked - Pay to Unlock</p>
<p className="text-[11px]">Send 100 to 0116982197</p>
</div>
<button onClick={()=>requestPay(j.id)} className="bg-[#0a1931] text-white px-5 py-2 rounded-full font-black text-xs">PAY</button>
</div>
)}

</div>
))}
</div>
</div>
);
}
