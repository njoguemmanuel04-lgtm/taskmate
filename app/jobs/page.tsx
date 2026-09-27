"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function Jobs(){
  const [title,setTitle]=useState("");
  const [location,setLocation]=useState("");
  const [budget,setBudget]=useState("");
  const [phone,setPhone]=useState("");
  const [jobs,setJobs]=useState<any[]>([]);

  const fetchJobs=async()=>{
    const {data}=await supabase.from("taskmate_jobs").select("*").order("created_at",{ascending:false});
    if(data) setJobs(data);
  }
  useEffect(()=>{fetchJobs()},[]);

  const post=async()=>{
    if(!title||!location||!budget||!phone) return alert("Fill all fields");
    const {error}=await supabase.from("taskmate_jobs").insert([{title,location,budget,phone,status:"pending"}]);
    if(error) alert(error.message);
    else { alert("Job Posted to CLOUD! Never disappears!"); setTitle("");setLocation("");setBudget("");setPhone(""); fetchJobs(); }
  }

  return <div className="p-4 max-w-md mx-auto pb-20">
    <h1 className="text-center font-black text-2xl">💼 Jobs - CLOUD</h1>
    <p className="text-center text-green-600 font-bold text-sm">Jobs saved forever ✅</p>
    <div className="border p-4 rounded-2xl mt-4 bg-white space-y-3">
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Job Title e.g House Cleaning" className="w-full border-2 p-3 rounded-lg"/>
      <input value={location} onChange={e=>setLocation(e.target.value)} placeholder="Location e.g Embu" className="w-full border-2 p-3 rounded-lg"/>
      <input value={budget} onChange={e=>setBudget(e.target.value)} placeholder="Budget Ksh e.g 2000" className="w-full border-2 p-3 rounded-lg"/>
      <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Your Phone" className="w-full border-2 p-3 rounded-lg"/>
      <button onClick={post} className="w-full bg-[#0a1931] text-white py-4 rounded-2xl font-black">Post Job to Cloud - FREE</button>
    </div>
    <h2 className="font-bold mt-6">Available Jobs ({jobs.length})</h2>
    {jobs.map((j:any)=><div key={j.id} className="border p-4 rounded-2xl mt-3 bg-white">
      <p className="font-black text-xl">{j.title}</p>
      <p className="text-sm mt-1">📍 {j.location} | 💰 {j.budget}</p>
      <p className="mt-2">📞 <b className="text-green-700">{j.phone}</b></p>
    </div>)}
  </div>
}
