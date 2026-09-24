"use client";
import { useState } from "react";
export default function Page(){
 const [q,setQ]=useState("");
 const go=(p:string)=>window.location.href=p;
 return(
  <div style={{background:"#f1f5f9",minHeight:"100vh",paddingBottom:80}}>
    <div style={{background:"#0a1f44",padding:20,borderRadius:"0 0 24px 24px"}}>
      <div style={{display:"flex",justifyContent:"space-between"}}>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <div style={{background:"#facc15",width:40,height:40,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center"}}>🏠</div>
          <b style={{color:"white",fontSize:22}}>Task<span style={{color:"#facc15"}}>Mate</span></b>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>go("/subscription")} style={{background:"#ffffff33",color:"white",borderRadius:20,padding:"6px 12px",border:"none"}}>KES 50 ⭐</button>
          <span style={{background:"#ffffff33",borderRadius:20,padding:"6px 10px"}}>🔔</span>
        </div>
      </div>
      <p style={{color:"#94a3b8",margin:"20px 0 0"}}>Good morning,</p>
      <h1 style={{color:"white",margin:0,fontSize:28}}>Emmanuel</h1>
      <p style={{color:"#94a3b8",fontSize:13}}>Find the right help. Get it done.</p>
      <div style={{background:"white",borderRadius:24,padding:12,display:"flex",gap:8,marginTop:14}}>
        <span>🔍</span><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search for a service or job..." style={{border:"none",outline:"none",flex:1}}/>
      </div>
    </div>
    <div style={{background:"linear-gradient(90deg,#0a1f44,#2563eb)",margin:"-20px 16px 16px",borderRadius:20,padding:18,color:"white"}}>
      <b style={{fontSize:18}}>Trusted Services<br/>Across Kenya</b><br/><span style={{fontSize:11,color:"#bfdbfe"}}>Skilled workers • Reliable clients • Secure payments</span>
    </div>
    <div style={{padding:"0 16px"}}>
      <b>Popular Categories</b>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginTop:12}}>
        {[["🧹","Cleaning"],["🌍","Selling Land"],["🛵","Delivery"],["🔧","Repairs"],["💧","Plumbing"],["👷","Construction"],["🍲","Outside Catering"]].map(([i,n]:any)=>(
          <div key={n} onClick={()=>{if(n.includes("Land"))go("/land");}} style={{background:"white",border:"1px solid black",borderRadius:16,padding:14,textAlign:"center"}}>
            <div style={{fontSize:28}}>{i}</div><b style={{fontSize:13}}>{n}</b>{n.includes("Land")&&<div style={{color:"#16a34a",fontSize:11,fontWeight:"bold"}}>TILL 1754910<br/>Seller 500 | Buyer 300</div>}
          </div>
        ))}
      </div>
    </div>
    <div style={{position:"fixed",bottom:0,left:0,right:0,background:"white",display:"flex",justifyContent:"space-around",padding:"10px 0",borderTop:"1px solid #ddd"}}>
      <div>🏠<br/>Home</div><div>💼<br/>Jobs</div><div style={{background:"#0a1f44",color:"white",width:50,height:50,borderRadius:25,display:"flex",alignItems:"center",justifyContent:"center",marginTop:-20}}>+</div><div>💬<br/>Msg</div><div>👤<br/>Profile</div>
    </div>
  </div>
 )
}
