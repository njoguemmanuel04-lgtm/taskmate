"use client";
import { useState, useEffect } from "react";

export default function AdminPage(){
  const [jobs,setJobs]=useState<any[]>([]);
  const [lands,setLands]=useState<any[]>([]);
  const [tab,setTab]=useState("pending");

  useEffect(()=>{
    // Jobs - try all possible keys
    const j = JSON.parse(localStorage.getItem("taskmate_jobs")||localStorage.getItem("jobs")||localStorage.getItem("allJobs")||"[]");
    const j2 = JSON.parse(localStorage.getItem("taskmate_requests")||"[]");
    const allJobs = j.length>0 ? j : j2;
    setJobs(allJobs);

    const l = JSON.parse(localStorage.getItem("taskmate_lands")||"[]");
    setLands(l);
  },[]);

  const refresh=()=>location.reload();

  // JOBS ACTIONS
  const unlockJob=(id:any)=>{
    const u=jobs.map((j:any)=>j.id===id?{...j,status:"paid",paid:true}:j);
    localStorage.setItem("taskmate_jobs",JSON.stringify(u));
    localStorage.setItem("jobs",JSON.stringify(u));
    localStorage.setItem("taskmate_requests",JSON.stringify(u));
    setJobs(u);
    alert("✅ Job Unlocked!");
  };
  const rejectJob=(id:any)=>{
    const u=jobs.map((j:any)=>j.id===id?{...j,status:"pending",paid:false}:j);
    localStorage.setItem("taskmate_jobs",JSON.stringify(u));
    localStorage.setItem("jobs",JSON.stringify(u));
    localStorage.setItem("taskmate_requests",JSON.stringify(u));
    setJobs(u);
  };
  const deleteJob=(id:any)=>{
    if(!confirm("DELETE this job permanently?")) return;
    const u=jobs.filter((j:any)=>j.id!==id);
    localStorage.setItem("taskmate_jobs",JSON.stringify(u));
    localStorage.setItem("jobs",JSON.stringify(u));
    localStorage.setItem("taskmate_requests",JSON.stringify(u));
    setJobs(u);
  };

  // LANDS ACTIONS
  const approveLand=(id:any)=>{
    const u=lands.map((l:any)=>l.id===id?{...l,status:"unlocked"}:l);
    localStorage.setItem("taskmate_lands",JSON.stringify(u));
    setLands(u);
    alert("✅ Land Approved!");
  };
  const rejectLand=(id:any)=>{
    const u=lands.map((l:any)=>l.id===id?{...l,status:"locked",buyerCode:""}:l);
    localStorage.setItem("taskmate_lands",JSON.stringify(u));
    setLands(u);
  };
  const deleteLand=(id:any)=>{
    if(!confirm("DELETE this land permanently?")) return;
    const u=lands.filter((l:any)=>l.id!==id);
    localStorage.setItem("taskmate_lands",JSON.stringify(u));
    setLands(u);
  };

  const pendingJobs=jobs.filter((j:any)=>!j.paid && j.status!=="paid");
  const paidJobs=jobs.filter((j:any)=>j.paid || j.status==="paid");
  const pendingLands=lands.filter((l:any)=>l.status==="pending");
  const paidLands=lands.filter((l:any)=>l.status==="unlocked");

  return(
    <div className="min-h-screen bg-gray-100 p-3 max-w-md mx-auto">
      <h1 className="font-black">🔑 Admin - Taskmate SEND MONEY</h1>
      <p className="text-green-700 font-bold text-sm">M-Pesa: 0116982197 (Send Money - Check SMS)</p>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-2 mt-3">
        <div className="bg-white p-3 rounded-xl text-sm">Total Jobs: <b>{jobs.length + lands.length}</b><br/>Jobs: {jobs.length} Land: {lands.length}</div>
        <div className="bg-orange-400 text-white p-3 rounded-xl text-sm">Pending: <b>{pendingJobs.length + pendingLands.length}</b></div>
        <div className="bg-green-500 text-white p-3 rounded-xl text-sm">Paid: <b>{paidJobs.length + paidLands.length}</b></div>
        <div className="bg-black text-white p-3 rounded-xl text-sm">Earnings: <b>Ksh {(paidJobs.length*100)+(paidLands.length*500)}</b></div>
      </div>

      {/* TABS */}
      <div className="grid grid-cols-4 gap-2 mt-3">
        <button onClick={()=>setTab("pending")} className={`p-3 rounded-xl text-sm ${tab==="pending"?"bg-orange-400 text-white":"bg-white"}`}>⏳ Pending Verify<br/><b>{pendingJobs.length + pendingLands.length}</b> vs 50</button>
        <button onClick={()=>setTab("paid")} className={`p-3 rounded-xl text-sm ${tab==="paid"?"bg-green-500 text-white":"bg-white"}`}>✅ Paid<br/><b>{paidJobs.length + paidLands.length}</b></button>
        <button onClick={()=>setTab("all")} className={`p-3 rounded-xl text-sm ${tab==="all"?"bg-black text-white":"bg-black text-white"}`}>All Jobs</button>
        <button onClick={refresh} className="bg-blue-500 text-white p-3 rounded-xl text-sm">🔄 Refresh</button>
      </div>

      <p className="mt-4 font-bold">⏳ Pending - Check M-Pesa SMS to 0116982197</p>

      {/* PENDING JOBS */}
      {(tab==="pending" || tab==="all") && pendingJobs.map((j:any)=>(
        <div key={j.id} className="bg-white border-l-4 border-orange-400 p-3 rounded-xl mt-3">
          <p className="text-sm">📱 <b>Payer Phone:</b> {j.payerPhone||j.phone||"N/A"}</p>
          <p className="text-sm">📝 <b>Job:</b> {j.jobTitle||j.title||j.job||"Job"}</p>
          <p className="text-sm">⏰ <b>Time:</b> {j.time||new Date(j.id).toLocaleString()}</p>
          <div className="bg-yellow-100 p-2 rounded-lg mt-2 text-sm">
            <p>👉 <b>CHECK SMS:</b> Search M-Pesa SMS for</p>
            <p>Did you get <b>Ksh100.00</b> from {j.payerPhone||"client"} to <b>0116982197</b>?</p>
            <p>If SMS shows 100 → UNLOCK</p>
            <p>If SMS shows 50 → REJECT</p>
          </div>
          <div className="flex gap-2 mt-2">
            <button onClick={()=>unlockJob(j.id)} className="flex-1 bg-green-600 text-white py-2 rounded-lg font-bold">✅ UNLOCK</button>
            <button onClick={()=>rejectJob(j.id)} className="flex-1 bg-orange-400 text-white py-2 rounded-lg font-bold">❌ REJECT</button>
            <button onClick={()=>deleteJob(j.id)} className="bg-black text-white px-3 py-2 rounded-lg font-bold">🗑️</button>
          </div>
        </div>
      ))}

      {/* PENDING LANDS */}
      {(tab==="pending" || tab==="all") && pendingLands.map((l:any)=>(
        <div key={l.id} className="bg-white border-l-4 border-orange-400 p-3 rounded-xl mt-3">
          <img src={l.image} className="w-full h-32 object-cover rounded-lg"/>
          <p className="text-sm mt-1">📍 <b>{l.loc}</b></p>
          <p className="text-sm">💰 Code: <b>{l.buyerCode}</b> Owner: {l.phone}</p>
          <div className="bg-yellow-100 p-2 rounded-lg mt-2 text-sm">
            <p>👉 <b>CHECK SMS:</b> Did you get <b>Ksh500.00</b> to <b>0116982197</b>?</p>
            <p>Land: {l.loc}</p>
          </div>
          <div className="flex gap-2 mt-2">
            <button onClick={()=>approveLand(l.id)} className="flex-1 bg-green-600 text-white py-2 rounded-lg font-bold">✅ UNLOCK LAND</button>
            <button onClick={()=>rejectLand(l.id)} className="flex-1 bg-orange-400 text-white py-2 rounded-lg font-bold">❌ REJECT</button>
            <button onClick={()=>deleteLand(l.id)} className="bg-black text-white px-3 py-2 rounded-lg font-bold">🗑️</button>
          </div>
        </div>
      ))}

      {/* PAID LIST */}
      {tab==="paid" && [...paidJobs.map((j:any)=>({...j,type:"job"})), ...paidLands.map((l:any)=>({...l,type:"land"}))].map((item:any)=>(
        <div key={item.id} className="bg-white border-l-4 border-green-500 p-3 rounded-xl mt-3">
          <p className="text-sm">{item.type==="job"?"📝 Job:":"🏞️ Land:"} <b>{item.jobTitle||item.loc}</b> - PAID</p>
          <div className="flex gap-2 mt-2">
            <button onClick={()=>item.type==="job"?deleteJob(item.id):deleteLand(item.id)} className="bg-black text-white px-3 py-1 rounded-lg text-xs">🗑️ DELETE</button>
          </div>
        </div>
      ))}

      {/* ALL JOBS */}
      {tab==="all" && jobs.map((j:any)=>(
        <div key={j.id} className="bg-white p-3 rounded-xl mt-3 flex justify-between items-center">
          <div className="text-sm"><b>{j.jobTitle||j.title||"Job"}</b> - {j.paid?"PAID":"PENDING"}</div>
          <button onClick={()=>deleteJob(j.id)} className="bg-black text-white px-3 py-1 rounded-lg text-xs">🗑️ Delete</button>
        </div>
      ))}
      {tab==="all" && lands.map((l:any)=>(
        <div key={l.id} className="bg-white p-3 rounded-xl mt-3 flex justify-between items-center">
          <div className="text-sm flex items-center gap-2"><img src={l.image} className="w-10 h-10 rounded object-cover"/><b>{l.loc}</b> - {l.status}</div>
          <button onClick={()=>deleteLand(l.id)} className="bg-black text-white px-3 py-1 rounded-lg text-xs">🗑️ Delete</button>
        </div>
      ))}

    </div>
  )
}
