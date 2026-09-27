"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function Jobs(){
  const [jobs,setJobs]=useState<any[]>([]);
  const [title,setTitle]=useState("");
  const [desc,setDesc]=useState("");
  const [loc,setLoc]=useState("");
  const [budget,setBudget]=useState("");
  const [phone,setPhone]=useState("");
  const [show,setShow]=useState<number|null>(null);
  const [payPhone,setPayPhone]=useState("");
  const [loading,setLoading]=useState(false);

  const fetchJobs=async()=>{
    const {data}=await supabase.from("taskmate_jobs").select("*").order("created_at",{ascending:false});
    if(data) setJobs(data);
  }
  useEffect(()=>{fetchJobs()},[]);

  const postJob=async()=>{
    if(!title||!phone){alert("Add Title and Phone"); return;}
    setLoading(true);
    await supabase.from("taskmate_jobs").insert([{title,description:desc,location:loc,budget,phone,status:"locked"}]);
    setTitle("");setDesc("");setLoc("");setBudget("");setPhone("");
    fetchJobs();
    setLoading(false);
    alert("✅ Job Posted to CLOUD! Never disappears!");
  }

  const requestUnlock=async(j:any)=>{
    if(!payPhone||payPhone.length<9){alert("Enter M-Pesa Phone"); return;}
    await supabase.from("taskmate_jobs").update({status:"pending"}).eq("id",j.id);
    fetchJobs();
    setShow(null);
    const msg = `JOB PAYMENT - I PAID 200! Job: ${j.title} My M-Pesa: ${payPhone} Check 0116982197`;
    window.open(`https://wa.me/254116982197?text=${encodeURIComponent(msg)}`, '_blank');
  }

  function mask(p:any){
    let s=String(p||"");
    if(s.length<4) return s;
    return s.substring(0,2)+"****"+s.substring(s.length-2);
  }

  return(
    <div style={{padding:15}} className="max-w-md mx-auto bg-gray-50 min-h-screen pb-20">
      <h3 className="font-black text-xl text-center">💼 Jobs - CLOUD</h3>
      <p className="text-center text-xs text-green-600 font-bold">Jobs saved forever ✅</p>

      <div className="bg-white p-4 rounded-xl border mt-4 shadow-sm">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Job Title e.g House Cleaning" className="w-full border p-3 rounded"/>
        <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" className="w-full border p-3 rounded mt-3"/>
        <input value={loc} onChange={e=>setLoc(e.target.value)} placeholder="Location e.g Embu" className="w-full border p-3 rounded mt-3"/>
        <input value={budget} onChange={e=>setBudget(e.target.value)} placeholder="Budget Ksh e.g 2000" className="w-full border p-3 rounded mt-3"/>
        <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Your Phone" className="w-full border p-3 rounded mt-3"/>
        <button onClick={postJob} disabled={loading} className="w-full bg-[#0A1F44] text-white py-3 rounded-xl font-black mt-4">{loading?"Posting...":"Post Job to Cloud - FREE"}</button>
      </div>

      <h3 className="font-bold mt-6">Available Jobs ({jobs.length})</h3>
      {jobs.map((j:any)=>(
        <div key={j.id} className="border rounded-xl p-3 mt-3 bg-white shadow-sm">
          <p className="font-bold text-lg">{j.title}</p>
          <p className="text-sm text-gray-600">{j.description}</p>
          <p className="text-xs mt-1">📍 {j.location} | 💰 {j.budget}</p>
          
          {j.status==="locked" && (
            show===j.id ? (
              <div className="bg-yellow-50 p-3 rounded-xl mt-3 border-2 border-yellow-400">
                <p className="font-black text-center">Lipa Na M-PESA</p>
                <p className="font-black text-center text-green-700">Ksh 200 to 0116982197</p>
                <input value={payPhone} onChange={e=>setPayPhone(e.target.value)} placeholder="Your M-Pesa Number" className="w-full border p-3 rounded mt-2"/>
                <button onClick={()=>requestUnlock(j)} className="w-full bg-green-600 text-white py-3 rounded-xl font-black mt-2">✅ I HAVE PAID</button>
                <button onClick={()=>setShow(null)} className="w-full text-xs mt-2">Cancel</button>
              </div>
            ) : <button onClick={()=>setShow(j.id)} className="w-full bg-[#0A1F44] text-white py-2 rounded-xl font-bold mt-3">🔓 Unlock Contact - Pay 200</button>
          )}
          {j.status==="pending" && <p className="text-orange-600 font-bold mt-3 text-center bg-orange-50 py-2 rounded">⏳ Waiting Admin Verification</p>}
          {j.status==="unlocked" && <p className="font-black mt-3 text-green-700">📞 {j.phone}</p>}
          {j.status!=="locked" && j.status!=="pending" && j.status!=="unlocked" && <p className="font-black mt-3">📞 {mask(j.phone)}</p>}
        </div>
      ))}
    </div>
  )
}
