"use client";
import { useState, useEffect } from "react";

export default function LandPage(){
  const [loc,setLoc]=useState("");
  const [phone,setPhone]=useState("");
  const [image,setImage]=useState("");
  const [lands,setLands]=useState<any[]>([]);
  const [showMpesaFor, setShowMpesaFor]=useState<number|null>(null);
  const [mpesaCode, setMpesaCode]=useState("");

  useEffect(()=>{
    const s=JSON.parse(localStorage.getItem("taskmate_lands")||"[]");
    setLands(s);
  },[]);

  const handleImage = (e:any) => {
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = (ev:any) => setImage(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const submit=()=>{
    if(!loc||!phone||!image){alert("Add Picture, Location and Phone"); return;}
    const newLand={id:Date.now(), loc, phone, image, paid:false, code:""};
    const updated=[newLand,...lands];
    localStorage.setItem("taskmate_lands",JSON.stringify(updated));
    setLands(updated);
    setLoc("");setPhone("");setImage("");
    alert("✅ Posted FREE! Your number is now LOCKED 🔒");
  };

  const submitPayment=(id:number)=>{
    if(!mpesaCode){alert("Enter M-Pesa Code"); return;}
    const u=lands.map(l=>l.id===id?{...l,paid:true,code:mpesaCode}:l);
    localStorage.setItem("taskmate_lands",JSON.stringify(u));
    setLands(u);
    setShowMpesaFor(null);
    setMpesaCode("");
    alert("✅ Code Submitted! Number Unlocked. (Admin will verify 0116982197)");
  };

  return(
    <div className="max-w-md mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="font-bold text-xl text-center">Selling Land Fast - FREE</h1>
      <p className="text-center text-xs text-gray-500">Post FREE, Buyers pay to unlock</p>

      <div className="bg-white p-4 rounded-xl border mt-4 shadow-sm">
        <label className="font-bold">📸 Picture of Shamba</label>
        <input type="file" accept="image/*" onChange={handleImage} className="mt-2 w-full text-sm" />
        {image && <img src={image} className="mt-2 w-full h-48 object-cover rounded-lg"/>}

        <input value={loc} onChange={e=>setLoc(e.target.value)} placeholder="Location e.g Embu - Kangaru" className="w-full border rounded-lg p-3 mt-3"/>
        <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Your Phone Number" className="w-full border rounded-lg p-3 mt-3"/>
        <p className="text-xs text-gray-500 mt-1">🔒 Will be locked until buyer pays</p>

        <button onClick={submit} className="w-full bg-[#0A1F44] text-white py-3 rounded-xl font-bold mt-4">
          Post Now - FREE
        </button>
      </div>

      <div className="mt-6">
        <h2 className="font-bold">Available Lands ({lands.length})</h2>
        {lands.map(l=>(
          <div key={l.id} className="border rounded-xl overflow-hidden bg-white mt-3 shadow-sm">
            <img src={l.image} className="w-full h-56 object-cover"/>
            <div className="p-3">
              <p className="font-bold text-sm">📍 {l.loc}</p>

              {/* LOCK THING */}
              {!l.paid? (
                <div className="mt-3 bg-gray-100 p-3 rounded-lg border-2 border-dashed">
                  <p className="text-center font-black text-gray-600">🔒 NUMBER LOCKED 🔒</p>
                  <p className="text-center text-xs text-gray-500">Pay 500 to unlock owner number</p>

                  {showMpesaFor === l.id? (
                    <div className="bg-yellow-50 border border-yellow-300 p-3 rounded-lg mt-2">
                      <p className="font-bold text-sm text-center">SEND MONEY</p>
                      <p className="font-black text-center text-lg">500 to 0116982197</p>
                      <p className="text-[10px] mt-2">1. M-Pesa → Send Money<br/>2. To: 0116982197<br/>3. Amount: 500<br/>4. Paste Code Below</p>
                      <input value={mpesaCode} onChange={e=>setMpesaCode(e.target.value)} placeholder="M-Pesa Code e.g QH..." className="w-full border rounded-lg p-2 mt-2"/>
                      <button onClick={()=>submitPayment(l.id)} className="w-full bg-green-600 text-white py-2 rounded-lg text-sm font-bold mt-2">
                        Unlock Now
                      </button>
                    </div>
                  ) : (
                    <button onClick={()=>setShowMpesaFor(l.id)} className="w-full bg-[#0A1F44] text-white py-2.5 rounded-lg text-sm font-bold mt-2">
                      🔓 Unlock Number - 500
                    </button>
                  )}
                </div>
              ) : (
                <div className="mt-3 bg-green-50 border border-green-300 p-3 rounded-lg">
                  <p className="text-center text-xs text-green-700 font-bold">✅ UNLOCKED - Code: {l.code}</p>
                  <a href={`tel:${l.phone}`} className="mt-2 block bg-green-600 text-white text-center py-3 rounded-lg font-black">
                    📞 Call Owner: {l.phone}
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
