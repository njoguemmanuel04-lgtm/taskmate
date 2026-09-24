"use client";
import { useState } from "react";

export default function LandPage() {
  const [role, setRole] = useState("seller");
  const [mpesaCode, setMpesaCode] = useState("");
  const [phone, setPhone] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const fee = role === "seller"? 500 : role === "buyer"? 300 : 0;

  const handleSubmit = () => {
    if (!mpesaCode ||!phone ||!title) {
      alert("Fill all fields + M-Pesa Code!");
      return;
    }
    if (role!== "broker" && mpesaCode.length < 8) {
      alert("Enter valid M-Pesa Code e.g. QGH... ");
      return;
    }
    alert(`SUCCESS! Land listed!\nRole: ${role}\nM-Pesa Code: ${mpesaCode}\nWe will verify TILL 1754910 and approve in 10 mins!`);
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#eef2f7] p-4 pb-24">
      <div className="bg-[#0a1f44] text-white p-4 rounded-b-[24px] -m-4 mb-4">
        <div className="flex items-center gap-2"><span onClick={()=>window.location.href="/"} className="cursor-pointer">← Back</span><b className="ml-4">Selling Land - TILL 1754910</b></div>
      </div>

      <div className="bg-green-600 text-white p-4 rounded-2xl text-center">
        <div className="font-black text-xl">LAND TILL 1754910</div>
        <div className="text-sm mt-1">Pay via Lipa Na M-Pesa Buy Goods</div>
        <div className="mt-2 bg-white text-green-700 font-black px-3 py-1 rounded-full inline-block text-sm">Seller 500 | Buyer 300 | Broker FREE</div>
      </div>

      <div className="bg-white p-4 rounded-2xl mt-4">
        <div className="font-bold mb-3">I am:</div>
        <div className="grid grid-cols-3 gap-2">
          <button onClick={()=>setRole("seller")} className={`p-3 rounded-xl border-2 font-bold ${role==="seller"?"bg-green-600 text-white border-green-600":"bg-white"}`}>Seller<br/><span className="text-xs">500</span></button>
          <button onClick={()=>setRole("buyer")} className={`p-3 rounded-xl border-2 font-bold ${role==="buyer"?"bg-blue-600 text-white border-blue-600":"bg-white"}`}>Buyer<br/><span className="text-xs">300</span></button>
          <button onClick={()=>setRole("broker")} className={`p-3 rounded-xl border-2 font-bold ${role==="broker"?"bg-orange-500 text-white border-orange-500":"bg-white"}`}>Broker<br/><span className="text-xs">FREE</span></button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl mt-4">
        <div className="font-bold mb-2">Land Details</div>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title: e.g. 50x100 in Kenol" className="w-full border p-3 rounded-xl mb-2" />
        <input value={location} onChange={e=>setLocation(e.target.value)} placeholder="Location: e.g. Muranga, Kenol" className="w-full border p-3 rounded-xl mb-2" />
        <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price: e.g. 850,000" className="w-full border p-3 rounded-xl mb-2" />
        <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Your Phone: 07..." className="w-full border p-3 rounded-xl mb-2" />
      </div>

      {role!== "broker" && (
        <div className="bg-yellow-50 border-2 border-yellow-400 p-4 rounded-2xl mt-4">
          <div className="font-black text-yellow-800">STEP 1: PAY NOW</div>
          <div className="text-sm mt-1">Go M-Pesa -> Lipa Na M-Pesa -> Buy Goods -> Till: <b className="text-green-700 text-lg">1754910</b> -> Amount: <b>KES {fee}</b></div>
          <div className="mt-3 font-bold">STEP 2: ENTER M-PESA CODE BELOW</div>
          <input value={mpesaCode} onChange={e=>setMpesaCode(e.target.value.toUpperCase())} placeholder="Enter Code e.g. QGH7XYZ123" className="w-full border-2 border-green-600 p-3 rounded-xl mt-2 font-black uppercase" />
          <div className="text-[11px] mt-1 text-gray-600">Check M-Pesa SMS for code after paying to Till 1754910</div>
        </div>
      )}

      {role === "broker" && (
        <div className="bg-green-50 border-2 border-green-600 p-4 rounded-2xl mt-4 text-center">
          <div className="font-black text-green-700">BROKER - FREE LISTING!</div>
          <div className="text-sm">Post land for clients - 0 KES</div>
        </div>
      )}

      <button onClick={handleSubmit} className="w-full bg-[#0a1f44] text-white p-4 rounded-xl font-black mt-4">SUBMIT LAND - TILL 1754910</button>
      <div className="text-center text-xs mt-2 text-gray-500">We verify M-Pesa code in 10 mins and publish your land</div>
    </div>
  );
}
