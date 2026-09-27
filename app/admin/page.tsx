"use client";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function AdminPage(){
const [jobs,setJobs]=useState<any[]>([]);
const [lands,setLands]=useState<any[]>([]);
const [filter,setFilter]=useState("pending");

async function load(){
const {data:j}=await supabase.from("jobs").select("*").order("id",{ascending:false});
if(j)setJobs(j);
const {data:l}=await supabase.from("lands").select("*").order("id",{ascending:false});
if(l)setLands(l);
}
useEffect(()=>{load();},[]);

const all=[...jobs,...lands];
const pending=all.filter((x:any)=>x.payerphone==="REQUESTED"&&!x.paid);
const paid=all.filter((x:any)=>x.paid);
const earnings=paid.length*100;

async function verify(table:string,id:number){
await supabase.from(table).update({paid:true,payerphone:"VERIFIED"}).eq("id",id);
alert("Verified! ✅ Unlocked!");
load();
}

const list=filter==="pending"?pending:filter==="paid"?paid:all;

return(
<div className="min-h-screen bg-[#eef2f7] p-3">
<h1 className="font-black text-lg">🔑 Admin - Taskmate SEND MONEY</h1>
<p className="text-green-700 font-black text-sm">M-Pesa: 0116982197 (Send Money - Check SMS)</p>

<div className="grid grid-cols-4 gap-2 mt-3">
<div className="bg-white rounded-2xl p-2 text-sm">Total<br/>Jobs: {jobs.length}<br/>Land: {lands.length}</div>
<div className="bg-orange-500 text-white rounded-2xl p-2 font-black">Pending:<br/>{pending.length}</div>
<div className="bg-green-500 text-white rounded-2xl p-2 font-black">Paid: {paid.length}</div>
<div className="bg-black text-white rounded-2xl p-2">Earnings:<br/>Ksh {earnings}</div>
</div>

<div className="grid grid-cols-4 gap-2 mt-3">
<button onClick={()=>setFilter("pending")} className={`rounded-2xl p-3 font-black text-sm ${filter==="pending"?"bg-orange-500 text-white":"bg-white"} `}>⏳<br/>Pending Verify<br/>{pending.length} vs 50</button>
<button onClick={()=>setFilter("paid")} className={`rounded-2xl p-3 font-black text-sm ${filter==="paid"?"bg-green-500 text-white":"bg-white"} `}>✅ Paid<br/>{paid.length}</button>
<button onClick={()=>setFilter("all")} className={`rounded-2xl p-3 text-sm ${filter==="all"?"bg-black text-white":"bg-black text-white"}`}>All Jobs</button>
<button onClick={load} className="bg-blue-500 text-white rounded-2xl p-3 text-sm">🔄<br/>Refresh</button>
</div>

<h2 className="font-black mt-4">⏳ Pending - Check M-Pesa SMS to 0116982197</h2>
<div className="mt-2 space-y-2">
{list.map((x:any)=>{
const isJob=jobs.find((j:any)=>j.id===x.id && j.title===x.title);
const table=isJob||!x.location?"jobs":"lands";
return(
<div key={table+x.id} className="bg-white rounded-xl p-3 border-2 border-orange-300 flex justify-between items-center">
<div><p className="font-black text-sm">{x.title||x.location} - {x.phone}</p><p className="text-[11px]">{x.payerphone} | {x.paid?"PAID ✅":"REQUESTED"}</p></div>
{!x.paid&&<button onClick={()=>verify(table,x.id)} className="bg-green-600 text-white px-4 py-2 rounded-full font-black text-xs">VERIFY ✅</button>}
</div>
);
})}
{list.length===0&&<p className="text-center opacity-50 mt-10">No {filter} jobs</p>}
</div>
</div>
);
}
