"use client";
import { useState } from "react";

export default function LandPage() {
  const TILL = "1754910";
  const [role, setRole] = useState("Seller");
  const fee = role === "Seller"? 500 : role === "Buyer"? 300 : 0;

  const pay = () => {
    if (role === "Broker") {
      alert("Broker is FREE! Post land now.");
      window.location.href = "/post-job";
      return;
    }
    const phone = prompt(`Enter M-Pesa phone to pay KES ${fee} as ${role}:`);
    if (!phone) return;
    alert(`Pay KES ${fee} to TILL ${TILL} - ${role} Fee. If STK fails, pay manually: Lipa na M-Pesa -> Buy Goods -> TILL ${TILL}`);
  };

  return (
    <div className="min-h-screen bg-[#f2f4f7] pb-10">
      <div className="p-5 flex items-center gap-3">
        <div onClick={()=>window.location.href='/'} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer">←</div>
        <h1 className="font-black text-xl">🌍 Selling Land</h1>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-green-600 text-white p-5 rounded-[24px] text-center">
          <div className="font-black text-2xl">LAND TILL {TILL}</div>
          <div className="text-sm mt-1">Seller 500 | Buyer 300 | Broker FREE</div>
        </div>

        <div className="bg-white rounded-[24px] p-5">
          <div className="font-black text-lg">Who are you?</div>
          <div className="grid grid-cols-3 gap-2 mt-3">
            <button onClick={()=>setRole("Seller")} className={`p-3 rounded-xl font-bold border-2 ${role==="Seller"?"bg-[#0a1f44] text-white border-[#0a1f44]":"bg-white border-gray-300"}`}>Seller<br/><span className="text-xs">KES 500</span></button>
            <button onClick={()=>setRole("Buyer")} className={`p-3 rounded-xl font-bold border-2 ${role==="Buyer"?"bg-blue-600 text-white border-blue-600":"bg-white border-gray-300"}`}>Buyer<br/><span className="text-xs">KES 300</span></button>
            <button onClick={()=>setRole("Broker")} className={`p-3 rounded-xl font-bold border-2 ${role==="Broker"?"bg-green-600 text-white border-green-600":"bg-white border-gray-300"}`}>Broker<br/><span className="text-xs">FREE</span></button>
          </div>

          <div className="mt-6">
            <div className="font-bold">Selected: {role} - {role==="Broker"?"FREE":`KES ${fee}`}</div>
            <button onClick={pay} className="w-full mt-3 bg-[#0a1f44] text-white py-4 rounded-full font-black">
              {role==="Broker"? "Continue FREE" : `Pay KES ${fee} via M-Pesa`}
            </button>
          </div>

          <div className="text-[11px] mt-4 bg-yellow-100 p-2 rounded-lg text-center font-bold">
            How to Pay: M-Pesa → Lipa na M-Pesa → Buy Goods → TILL {TILL} → KES {fee}
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-5">
          <div className="font-black">Land Posts (After Payment)</div>
          <div className="text-sm text-gray-500 mt-2">✓ Seller posts land after KES 500</div>
          <div className="text-sm text-gray-500">✓ Buyer unlocks contact after KES 300</div>
          <div className="text-sm text-gray-500">✓ Broker posts FREE</div>
        </div>
      </div>
    </div>
  );
}
