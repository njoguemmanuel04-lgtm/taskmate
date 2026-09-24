"use client";
import { useState } from "react";

export default function Plans(){
 const [load,setLoad] = useState("");
 const pay = async (amt) => {
   setLoad(amt);
   const phone = prompt("Enter Mpesa 07...");
   if(!phone){ setLoad(""); return; }
   const res = await fetch("/api/mpesa", {
     method: "POST",
     headers: {"Content-Type":"application/json"},
     body: JSON.stringify({ phone: phone, amount: amt, till: "0116982197" })
   });
   alert("STK sent for KES " + amt + " to 0116982197. Enter PIN");
   setLoad("");
 }
 return(
  <div style={{padding:16, background:"#eef2f7", minHeight:"100vh"}}>
    <div style={{marginBottom:10}}>M-PESA: <b>0116982197</b></div>

    <div style={{background:"white", border:"2px solid #ccc", borderRadius:20, padding:16, marginBottom:12}}>
      <b>Daily Try - KES 50</b><div style={{fontSize:12}}>1 Day - Visible 24hrs - 2-3 Calls</div>
      <button onClick={()=>pay(50)} style={{width:"100%", marginTop:12, background:"black", color:"white", padding:12, borderRadius:30, fontWeight:"bold"}}>{load==50?"...":"Pay KES 50 via M-Pesa"}</button>
    </div>

    <div style={{background:"#e6f0ff", border:"2px solid #3b82f6", borderRadius:20, padding:16, marginBottom:12}}>
      <b>Weekly Hustle - KES 250</b><div style={{fontSize:12}}>7 Days - TOP in search - 15-20 Calls - Mwea+Ngurubani</div>
      <button onClick={()=>pay(250)} style={{width:"100%", marginTop:12, background:"#2563eb", color:"white", padding:12, borderRadius:30, fontWeight:"bold"}}>{load==250?"...":"Pay KES 250 via M-Pesa"}</button>
    </div>

    <div style={{background:"#fff9db", border:"2px solid #eab308", borderRadius:20, padding:16, marginBottom:12}}>
      <b>Monthly CEO - KES 799</b><div style={{fontSize:12}}>30 Days - ALWAYS TOP - 80+ Calls - Verified badge - All Kirinyaga</div>
      <button onClick={()=>pay(799)} style={{width:"100%", marginTop:12, background:"#0a1f44", color:"white", padding:12, borderRadius:30, fontWeight:"bold"}}>{load==799?"...":"Pay KES 799 via M-Pesa"}</button>
    </div>

    <div style={{fontSize:11, textAlign:"center", background:"white", padding:10, borderRadius:10}}>Land Fees separate: Seller 500 | Buyer 300 | Broker FREE - Same 0116982197</div>
  </div>
 )
}
