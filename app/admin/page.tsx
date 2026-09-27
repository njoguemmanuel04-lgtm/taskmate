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
alert("✅ Verified & Unlocked!"); load();
}
async function reject(table:string,id:number){
await supabase.from(table).update({paid:false,payerphone:""}).eq("id",id);
alert("❌ Rejected - Back to Locked"); load();
}
async function del(table:string,id:number){
if(!confirm("DELETE this forever?"))return;
await supabase.from(table).delete().eq("id",id);
alert("🗑️ Deleted!"); load();
}

const list=filter==="pending"?pending:filter==="paid"?paid:all;

return(
<div className="min-h-screen bg-[#eef2f7] p-3 pb-20">
<h1 className="font-black text-lg">🔑 Admin - 0116982197</h1>
<p className="text-green-700 font-black text-xs">M-Pesa SEND MONEY - Check SMS</p>

<div className="grid grid-cols-4 gap-2 mt-3">
<div className="bg-white rounded-2xl p-2 text-[11px] font-bold">Total<br/>Jobs:{jobs.length}<br/>Land:{lands.length}</div>
<div className="bg-orange-500 text-white rounded-2xl p-2 font-black text-xs">Pending<br/>{pending.length}</div>
<div className="bg-green-500 text-white rounded-2xl p-2 font-black text-xs">Paid:{paid.length}</div>
<div className="bg-black text-white rounded-2xl p-2 text-xs">Ksh {earnings}</div>
</div>

<div className="grid grid-cols-4 gap-2 mt-3">
<button onClick={()=>setFilter("pending")} className={`rounded-2xl p-2 font-black text-xs ${filter==="pending"?"bg-orange-500 text-white":"bg-white"}`}>⏳ Pending {pending.length}</button>
<button onClick={()=>setFilter("paid")} className={`rounded-2xl p-2 font-black text-xs ${filter==="paid"?"bg-green-500 text-white":"bg-white"}`}>✅ Paid {paid.length}</button>
<button onClick={()=>setFilter("all")} className="bg-black text-white rounded-2xl p-2 text-xs">All {all.length}</button>
<button onClick={load} className="bg-blue-500 text-white rounded-2xl p-2 text-xs">🔄 Refresh</button>
</div>

<div className="mt-4 space-y-3">
{list.map((x:any)=>{
const isJob=jobs.some((j:any)=>j.id===x.id && j.title===x.title);
const table=isJob?"jobs":"lands";
return(
<div key={table+x.id} className="bg-white rounded-[18px] p-3 border-2 border-orange-200">
<p className="font-black text-sm">{x.title||x.location} | {x.location||x.pay} | 📞{x.phone}</p>
<p className="text-[10px] opacity-60">{table} #{x.id} - {x.payerphone||"LOCKED"} - {x.paid?"PAID":"UNPAID"}</p>

<div className="flex gap-2 mt-3">
{!x.paid&&<button onClick={()=>verify(table,x.id)} className="flex-1 bg-green-600 text-white py-2.5 rounded-full font-black text-xs">✅ VERIFY</button>}
{!x.paid&&x.payerphone==="REQUESTED"&&<button onClick={()=>reject(table,x.id)} className="flex-1 bg-yellow-500 text-white py-2.5 rounded-full font-black text-xs">❌ REJECT</button>}
<button onClick={()=>del(table,x.id)} className="flex-1 bg-red-600 text-white py-2.5 rounded-full font-black text-xs">🗑️ DELETE</button>
</div>
</div>
);
})}
</div>
</div>
);
}
