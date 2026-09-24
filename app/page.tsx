"use client";
import { useState } from "react";
export default function Page(){
 const [q,setQ]=useState("");
 return(
  <div style={{background:"#f1f5f9", minHeight:"100vh", fontFamily:"sans-serif", paddingBottom:80}}>
    {/* DARK BLUE HEADER - Good morning theme */}
    <div style={{background:"#0a1f44", padding:"20px 16px 40px", borderRadius:"0 0 24px 24px"}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <div style={{display:"flex", alignItems:"center", gap:10}}>
          <div style={{background:"#facc15", width:44, height:44, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20}}>🏠</div>
          <b style={{color:"white", fontSize:26}}>Task<span style={{color:"#facc15"}}>Mate</span></b>
        </div>
        <div style={{display:"flex", gap:8, alignItems:"center"}}>
          <button onClick={()=>window.location.href="/subscription"} style={{background:"#ffffff22", color:"white", borderRadius:20, padding:"6px 12px", border:"none", fontSize:13}}>💰 KES 50 ⭐</button>
          <button style={{background:"#ffffff22", borderRadius:20, padding:"6px 10px", border:"none"}}>🔔</button>
        </div>
      </div>
      <p style={{color:"#94a3b8", marginTop:20, marginBottom:2, fontSize:14}}>Good morning,</p>
      <h1 style={{color:"white", fontSize:28, margin:0, fontWeight:"bold"}}>Emmanuel</h1>
      <p style={{color:"#94a3b8", marginTop:4, fontSize:14}}>Find the right help. Get it done.</p>
      <div style={{background:"white", borderRadius:24, padding:"12px 16px", display:"flex", alignItems:"center", gap:8, marginTop:16}}>
        <span>🔍</span>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search for a service or job..." style={{border:"none", outline:"none", flex:1, fontSize:14}}/>
      </div>
    </div>

    {/* BLUE BANNER - Trusted Services Across Kenya */}
    <div style={{background:"linear-gradient(90deg,#0a1f44,#2563eb)", margin:"-22px 16px 16px", borderRadius:20, padding:20, color:"white"}}>
      <h2 style={{margin:0, fontSize:20}}>Trusted Services</h2>
      <h2 style={{margin:0, fontSize:20}}>Across Kenya</h2>
      <p style={{color:"#bfdbfe", fontSize:12, margin:"6px 0 0"}}>Skilled workers • Reliable clients • Secure payments</p>
      <button style={{background:"white", color:"#0a1f44", borderRadius:20, padding:"10px 16px", border:"none", fontWeight:"bold", marginTop:12, fontSize:13}}>+ Post a Job</button>
    </div>

    <div style={{padding:"0 16px"}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}><b>Popular Categories</b><span style={{color:"#2563eb", fontSize:13}}>See All ›</span></div>
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginTop:12}}>
        {[
         ["🧹","Cleaning","#22c55e"],
         ["🌍","Land","#16a34a"],
         ["🛵","Delivery","#f97316"],
         ["🔧","Repairs","#ef4444"],
         ["💧","Plumbing","#3b82f6"],
         ["👷","Construction","#a855f7"],
         ["👨‍🍳","Catering","#eab308"],
        ].map(([icon,name,color]:any)=>(
         <div key={name} onClick={()=>{
           if(name==="Land") window.location.href="/land";
           if(name==="Cleaning") alert("Cleaning coming");
         }} style={{background:"white", border:"1px solid black", borderRadius:16, padding:16, textAlign:"center", cursor:"pointer"}}>
           <div style={{background:color, width:56, height:56, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto", fontSize:28}}>{icon}</div>
           <b style={{fontSize:13, display:"block", marginTop:8}}>{name}</b>
         </div>
        ))}
      </div>
    </div>

    {/* BOTTOM NAV */}
    <div style={{position:"fixed", bottom:0, left:0, right:0, background:"white", display:"flex", justifyContent:"space-around", alignItems:"center", padding:"10px 0", borderTop:"1px solid #e2e8f0"}}>
      <div style={{textAlign:"center", fontSize:11}}>🏠<br/>Home</div>
      <div style={{textAlign:"center", fontSize:11}}>💼<br/>Jobs</div>
      <div style={{background:"#0a1f44", color:"white", width:56, height:56, borderRadius:28, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, marginTop:-24, border:"3px solid white"}}>+</div>
      <div style={{textAlign:"center", fontSize:11}}>💬<br/>Messages</div>
      <div style={{textAlign:"center", fontSize:11}}>👤<br/>Profile</div>
    </div>
  </div>
 )
}
