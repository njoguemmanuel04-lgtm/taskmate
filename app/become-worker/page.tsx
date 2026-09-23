"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
export default function BecomeWorker(){
const [form,setForm]=useState({name:"",skill:"",location:"Mwea",rate:"",phone:""});
const [done,setDone]=useState(false);
const submit=async(e:any)=>{
e.preventDefault();
const {error}=await supabase.from("workers").insert([{name:form.name,skill:form.skill,location:form.location,rate:form.rate,phone:form.phone}]);
if(!error){setDone(true)}else alert(error.message);
};
if(done) return(
<div className="min-h-screen bg-[#eef6ff] flex items-center justify-center p-4">
<div className="bg-white p-8 rounded-3xl border-2 border-black text-center">
<h1 className="text-3xl font-black text-green-600">✅ Sent!</h1>
<p className="mt-4 font-bold">We will review in 24 hours!</p>
<Link href="/workers" className="mt-6 block bg-blue-600 text-white py-3 rounded-full font-bold">View Workers →</Link>
</div></div>);
return(
<div className="min-h-screen bg-[#eef6ff]">
<header className="bg-white border-b p-4 flex justify-between">
<Link href="/" className="font-black text-blue-700">TaskMate Kenya 🇰🇪</Link>
<Link href="/workers" className="bg-green-500 text-white px-3 py-2 rounded-lg font-bold text-sm">👷 Workers</Link>
</header>
<div className="max-w-md mx-auto p-4 mt-6">
<div className="bg-white rounded-3xl p-6 border-2 border-black">
<h1 className="text-2xl font-black">Become a Worker 👷‍♂️</h1>
<p className="text-gray-600 text-sm mt-2">Join TaskMate Kenya!</p>
<form onSubmit={submit}
