"use client";
import { useState } from "react";
export default function PostJobPage(){
 const go=(p:string)=>location.href=p;
 const [title,setTitle]=useState("");
 const [desc,setDesc]=useState("");
 const [category,setCategory]=useState("Cleaning");
 const [budget,setBudget]=useState("");
 const handlePost=()=>{
   if(!title){alert("Enter what you need done");return;}
   const jobs=JSON.parse(localStorage.getItem("jobs")||"[]");
   jobs.push({title,desc,category,budget,time:"Just now"});
   localStorage.setItem("jobs",JSON.stringify(jobs));
   alert("✅ Job Posted!\n"+title);
   go('/jobs');
 };
 return(
 <div className="min-h-screen bg-[#eef2f7] p-5">
   <div className="flex gap-3 mb-6">
     <button onClick={()=>go('/')} className="bg-white w-9 h-9 rounded-full">←</button>
     <h1 className="font-bold text-xl">Post a Job</h1>
   </div>
   <div className="bg-white rounded-2xl p-5">
     <p className="text-sm font-bold mb-2">What do you need done? *</p>
     <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. House Cleaning" className="w-full border rounded-xl p-3 text-sm mb-4"/>
     <p className="text-sm font-bold mb-2">Category</p>
     <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full border rounded-xl p-3 text-sm mb-4">
       <option>Cleaning</option><option>Delivery</option><option>Repairs</option><option>Plumbing</option><option>Construction</option><option>Outside Catering</option>
     </select>
     <p className="text-sm font-bold mb-2">Describe it</p>
     <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Location, details..." className="w-full border rounded-xl p-3 text-sm h-24 mb-4"></textarea>
     <p className="text-sm font-bold mb-2">Budget KES</p>
     <input value={budget} onChange={e=>setBudget(e.target.value)} placeholder="2500" type="number" className="w-full border rounded-xl p-3 text-sm mb-6"/>
     <button onClick={handlePost} className="w-full bg-[#0a1f44] text-white py-4 rounded-full font-bold">Post Job - Free</button>
   </div>
 </div>
 );
}
