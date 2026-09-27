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
    const newLand={id:Date.now(),loc,phone,image,status:"locked",buyerCode:""};
    const updated=[newLand,...lands];
    localStorage.setItem("taskmate_lands",JSON.stringify(updated));
    setLands(updated);
    setLoc("");setPhone("");setImage("");
    alert("✅ Posted FREE! Locked 🔒");
  };

  const requestUnlock=(id:number)=>{
    if(!mpesaCode.trim()){alert("Enter M-Pesa Code"); return;}
    const updated=lands.map(l=>l.id===id?{...l,status:"pending",buyerCode:mpesaCode}:l);
    localStorage.setItem("taskmate_lands",JSON.stringify(updated));
    setLands(updated);
    const land = lands.find(l=>l.id===id);
    const msg = `NEW LAND PAYMENT!%0ALand: ${land?.loc}%0ACode: ${mpesaCode}%0AOwner Phone: ${land?.phone}%0A%0ACheck M-Pesa 0116982197 then approve in Admin`;
    window.open(`https://wa.me/254116982197?text=${msg}`, '_blank');
    setShowMpesaFor(null);
    setMpesaCode("");
    alert("✅ Request Sent to Admin! Wait for approval");
  };

  return(
    <div className="max-w-md mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="font-bold text-xl text-center">🏞️ Land For Sale - Embu</h1>
      <p className="text-center text-xs text-gray-500">Post FREE - Buyer pays 500 to unlock your number</p>

      <div className="bg-white p-4 rounded-xl border mt-4">
        <label className="font-bold">📸 Picture of Shamba</label>
        <input type="file" accept="image/*" onChange={handleImage} className="w-full mt-2 border rounded-lg p-2"/>
        {image && <img src={image} className="mt-2 w-full h-48 object-cover rounded-lg border"/>}
        <input value={loc} onChange={e=>setLoc(e.target.value)} placeholder="Location e.g Mumbu... 2 acres" className="w-full border rounded-lg p-3 mt-3"/>
        <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Owner Phone e.g 07..." className="w-full border rounded-lg p-3 mt-3"/>
        <button onClick={submit} className="w-full bg-[#0A1F44] text-white py-3 rounded-xl font-bold mt-4">Post FREE</button>
      </div>

      {lands.map(l=>{
        const isLocked = l.status==="locked" ||!l.status;
        const isPending = l.status==="pending";
        const isUnlocked = l.status==="unlocked";
        return(
          <div key={l.id} className="border rounded-xl overflow-hidden bg-white mt-4 shadow-sm">
            <img src={l.image} className="w-full h-64 object-cover"/>
            <div className="p-3">
              <p className="font-bold">📍 {l.loc}</p>

              {isLocked && (
                <div className="mt-3 border-2 border-dashed border-black p-3 rounded-xl text-center">
                  <p className="font-black text-lg">🔒 NUMBER LOCKED 🔒</p>
                  <p className="text-xs text-gray-600">Pay to see owner number</p>
                  {showMpesaFor===l.id?(
                    <div className="bg-yellow-50 p-3 rounded-lg mt-3 text-left border border-yellow-300">
                      <p className="font-bold text-center">SEND MONEY</p>
                      <p className="font-black text-center text-xl text-green-700">Ksh 500 to 0116982197</p>
                      <div className="text-xs mt-2 bg-white p-2 rounded">
                        1. M-Pesa → Send Money<br/>
                        2. To: <b>0116982197</b><br/>
                        3. Amount: <b>500</b><br/>
                        4. Enter M-Pesa Code below
                      </div>
                      <input value={mpesaCode} onChange={e=>setMpesaCode(e.target.value)} placeholder="M-Pesa Code e.g QH12ABC..." className="w-full border rounded-lg p-3 mt-2 font-bold"/>
                      <button onClick={()=>requestUnlock(l.id)} className="w-full bg-green-600 text-white py-3 rounded-lg font-bold mt-2">Submit for Admin Verification</button>
                      <button onClick={()=>setShowMpesaFor(null)} className="w-full bg-gray-200 py-2 rounded-lg mt-2 text-sm">Cancel</button>
                    </div>
                  ):(
                    <button onClick={()=>setShowMpesaFor(l.id)} className="w-full bg-[#0A1F44] text-white py-3 rounded-xl font-black mt-3">🔓 Unlock Number - Pay 500</button>
                  )}
                </div>
              )}

              {isPending && (
                <div className="mt-3 bg-orange-100 p-3 rounded-xl text-center border border-orange-300">
                  <p className="font-bold text-orange-700">⏳ WAITING FOR ADMIN APPROVAL</p>
                  <p className="text-xs mt-1">Your Code: <b>{l.buyerCode}</b> submitted</p>
                  <p className="text-xs">Admin is checking M-Pesa 0116982197</p>
                  <p className="text-xs mt-1">You will get number once approved</p>
                </div>
              )}

              {isUnlocked && (
                <div className="mt-3 bg-green-50 p-3 rounded-xl border border-green-300">
                  <p className="text-xs text-green-700 font-bold text-center mb-2">✅ PAYMENT VERIFIED</p>
                  <a href={`tel:${l.phone}`} className="block bg-green-600 text-white text-center py-3 rounded-xl font-black text-lg">📞 Call Owner: {l.phone}</a>
                </div>
              )}
            </div>
          </div>
        )
      })}

      <div className="text-center mt-6">
        <a href="/admin" className="text-xs text-gray-400 underline">Admin Panel → Verify Payments</a>
      </div>
    </div>
  )
}
