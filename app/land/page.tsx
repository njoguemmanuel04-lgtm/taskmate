"use client";
import { useState, useEffect } from "react";

export default function LandPage(){
  const [loc,setLoc]=useState("");
  const [phone,setPhone]=useState("");
  const [image,setImage]=useState("");
  const [lands,setLands]=useState<any[]>([]);
  const [showMpesaFor,setShowMpesaFor]=useState<number|null>(null);
  const [mpesaCode,setMpesaCode]=useState("");

  useEffect(()=>{
    const s=JSON.parse(localStorage.getItem("taskmate_lands")||"[]");
    setLands(s);
  },[]);

  const handleImage=(e:any)=>{
    const file=e.target.files[0];
    if(file){
      const reader=new FileReader();
      reader.onload=(ev:any)=>setImage(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const submit=()=>{
    if(!loc||!phone||!image){alert("Add Picture, Location and Phone"); return;}
    const newLand={id:Date.now(),loc,phone,image,status:"locked",code:"",buyerCode:""};
    const updated=[newLand,...lands];
    localStorage.setItem("taskmate_lands",JSON.stringify(updated));
    setLands(updated);
    setLoc("");setPhone("");setImage("");
    alert("✅ Posted FREE! Locked 🔒");
  };

  const requestUnlock=(id:number)=>{
    if(!mpesaCode){alert("Enter M-Pesa Code"); return;}
    const u=lands.map(l=>l.id===id?{...l,status:"pending",buyerCode:mpesaCode}:l);
    localStorage.setItem("taskmate_lands",JSON.stringify(u));
    setLands(u);
    setShowMpesaFor(null);
    setMpesaCode("");
    alert("✅ Request Sent to Admin! Wait for approval. Admin will check 0116982197");
  };

  return(
    <div className="max-w-md mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="font-bold text-xl text-center">Land For Sale - Embu</h1>

      <div className="bg-white p-4 rounded-xl border mt-4">
        <label className="font-bold">📸 Picture of Shamba</label>
        <input type="file" accept="image/*" onChange={handleImage} className="w-full mt-2"/>
        {image && <img src={image} className="mt-2 w-full h-48 object-cover rounded-lg"/>}
        <input value={loc} onChange={e=>setLoc(e.target.value)} placeholder="Location e.g Mum... 2 acres" className="w-full border rounded-lg p-3 mt-3"/>
        <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Owner Phone" className="w-full border rounded-lg p-3 mt-3"/>
        <button onClick={submit} className="w-full bg-[#0A1F44] text-white py-3 rounded-xl font-bold mt-4">Post FREE</button>
      </div>

      {lands.map(l=>(
        <div key={l.id} className="border rounded-xl overflow-hidden bg-white mt-4">
          <img src={l.image} className="w-full h-64 object-cover"/>
          <div className="p-3">
            <p className="font-bold">📍 {l.loc}</p>
            {l.status==="locked" && (
              <div className="mt-3 border-2 border-dashed p-3 rounded-xl text-center">
                <p className="font-black">🔒 NUMBER LOCKED 🔒</p>
                {showMpesaFor===l.id?(
                  <div className="bg-yellow-50 p-3 rounded-lg mt-2 text-left">
                    <p className="font-bold text-center">SEND MONEY</p>
                    <p className="font-black text-center text-xl">500 to 0116982197</p>
                    <p className="text-xs mt-1">1. M-Pesa → Send Money<br/>2. To: 0116982197<br/>3. Amount: 500</p>
                    <input value={mpesaCode} onChange={e=>setMpesaCode(e.target.value)} placeholder="M-Pesa Code e.g QH..." className="w-full border rounded-lg p-2 mt-2"/>
                    <button onClick={()=>requestUnlock(l.id)} className="w-full bg-green-600 text-white py-2 rounded-lg font-bold mt-2">Submit for Admin Verification</button>
                  </div>
                ):(
                  <button onClick={()=>setShowMpesaFor(l.id)} className="w-full bg-[#0A1F44] text-white py-2 rounded-lg font-bold mt-2">Unlock - Pay 500</button>
                )}
              </div>
            )}
            {l.status==="pending" && (
              <div className="mt-3 bg-orange-100 p-3 rounded-lg text-center border border-orange-300">
                <p className="font-bold text-orange-700">⏳ WAITING FOR ADMIN</p>
                <p className="text-xs">Code: {l.buyerCode} submitted</p>
                <p className="text-xs">Admin will verify 0116982197</p>
              </div>
            )}
            {l.status==="unlocked" && (
              <div className="mt-3 bg-green-50 p-3 rounded-lg border border-green-300">
                <a href={`tel:${l.phone}`} className="block bg-green-600 text-white text-center py-3 rounded-lg font-black">📞 Call: {l.phone}</a>
              </div>
            )}
          </div>
        </div>
      ))}

      <a href="/admin/land" className="block text-center mt-6 text-xs text-gray-400">Admin Panel →</a>
    </div>
  )
}
