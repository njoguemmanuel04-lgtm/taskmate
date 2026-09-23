"use client";
import {useState} from "react";
import {supabase} from "@/lib/supabase";
import Link from "next/link";
export default function Page(){
const [f,setF]=useState({name:"",skill:"Cleaning",location:"Mwea",rate:"",phone:""});
const [ok,setOk]=useState(false);
const sub=async(e:any)=>{
e.preventDefault();
const {error}=await supabase.from("workers").insert([{name:f.name,skill:f.skill,location:f.location,rate:f.rate,phone:f.phone}]);
if(!error)setOk(true);
else alert(error.message);
};
if(ok)return(
<div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
<div className="bg-white p-8 rounded-2xl border-2 border-black text-center">
<h1 className="text-3xl font-black text-green-600">✅ Sent!</h1>
<p className="mt-3 font-bold">We will review in 24h!</p>
<Link href="/workers" className="mt-4 block bg-blue-600 text-white py-3 rounded-full font-bold">View Workers</Link>
</div></div>);
return(
<div className="min-h-screen bg-blue-50">
<header className="bg-white p-4 flex justify-between border-b">
<Link href="/" className="font-black text-blue-700">TaskMate Kenya 🇰🇪</Link>
<Link href="/workers" className="bg-green-500 text-white px-3 py-2 rounded-lg font-bold text-sm">Workers</Link>
</header>
<div className="max-w-md mx-auto p-4">
<div className="bg-white rounded-2xl p-6 border-2 border-black">
<h1 className="text-2xl font-black">Become a Worker 👷‍♂️</h1>
<form onSubmit={sub} className="mt-4 space-y-3">
<input required placeholder="Name" className="w-full border-2 border-black p-3 rounded-xl" value={f.name} onChange={e=>setF({...f,name:e.target.value})}/>
<select className="w-full border-2 border-black p-3 rounded-xl font-bold" value={f.skill} onChange={e=>setF({...f,skill:e.target.value})}><option>Cleaning</option><option>Delivery</option><option>Repairs</option><option>Plumbing</option><option>Electric</option><option>Cooking</option></select>
<select className="w-full border-2 border-black p-3 rounded-xl" value={f.location} onChange={e=>setF({...f,location:e.target.value})}><option>Mwea</option><option>Nairobi</option><option>Mombasa</option><option>Kisumu</option><option>Nakuru</option></select>
<input required placeholder="Rate e.g 2000" type="number" className="w-full border-2 border-black p-3 rounded-xl" value={f.rate} onChange={e=>setF({...f,rate:e.target.value})}/>
<input required placeholder="Phone 07..." className="w-full border-2 border-black p-3 rounded-xl" value={f.phone} onChange={e=>setF({...f,phone:e.target.value})}/>
<button className="w-full bg-blue-600 text-white py-3 rounded-full font-black">Submit →</button>
</form>
</div></div></div>)}
