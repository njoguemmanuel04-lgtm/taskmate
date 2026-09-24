"use client";
import { useState } from "react";

export default function Page(){
 const [q,setQ]=useState("");
 return(
  <div style={{background:"#f1f5f9",minHeight:"100vh",paddingBottom:80}}>
    <div style={{background:"#0a1f44",padding:20,borderRadius:"0 0 24px 24px"}}>
      <div style={{display:"flex",justifyContent:"space-between"}}>
        <b style={{color:"white"}}>Task<span style={{color:"#facc15"}}>Mate</span></b>
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>{window.location.href="/subscription"}} style={{background:"#ffffff33",color:"white",borderRadius:20,padding:"6px 12px",border:"none"}}>KES 50 ⭐</button>
          <span style={{background:"#ffffff33",borderRadius:20,padding:"6px 10px"}}>🔔</span>
        </div>
      </div>
      <p style={{color:"#94a3b8",margin:"20px 0 0"}}>Good morning,</p>
      <h1 style={{color:"white",margin:0}}>Emmanuel</h1>
      <div style={{background:"white",borderRadius:24,padding:12,marginTop:14,display:"flex",gap:8}}>
        <span>🔍</span>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search..." style={{border:"none",outline:"none",flex:1}}/>
      </div>
    </div>

    <div style={{background:"#2563eb",margin:"-20px 16px 16px",borderRadius:20,padding:16,color:"white"}}>
      <b>Trusted Services Across Kenya</b>
    </div>

    <div style={{padding:"0 16px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      <div onClick={()=>{window.location.href="/land"}} style={{background:"white",borderRadius:16,padding:14,textAlign:"center",border:"1px solid black"}}>
        <div>🌍</div><b style={{fontSize:12}}>Selling Land</b><br/><span style={{color:"green",fontSize:10}}>TILL 1754910</span>
      </div>
      <div style={{background:"white",borderRadius:16,padding:14,textAlign:"center",border:"1px solid black"}}><div>🧹</div><b style={{fontSize:12}}>Cleaning</b></div>
      <div style={{background:"white",borderRadius:16,padding:14,textAlign:"center",border:"1px solid black"}}><div>🛵</div><b style={{fontSize:12}}>Delivery</b></div>
      <div style={{background:"white",borderRadius:16,padding:14,textAlign:"center",border:"1px solid black"}}><div>🔧</div><b style={{fontSize:12}}>Repairs</b></div>
      <div style={{background:"white",borderRadius:16,padding:14,textAlign:"center",border:"1px solid black"}}><div>💧</div><b style={{fontSize:12}}>Plumbing</b></div>
      <div style={{background:"white",borderRadius:16,padding:14,textAlign:"center",border:"1px solid black"}}><div>👷</div><b style={{fontSize:12}}>Construction</b></div>
    </div>
  </div>
 )
}
