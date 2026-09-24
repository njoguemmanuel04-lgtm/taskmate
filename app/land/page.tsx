"use client";
import { useState } from "react";
export default function LandPage(){
const [role,setRole]=useState("seller");
const [code,setCode]=useState("");
const [phone,setPhone]=useState("");
const [title,setTitle]=useState("");
const [loc,setLoc]=useState("");
const [price,setPrice]=useState("");
const fee=role==="seller"?500:role==="buyer"?300:0;
const submit=()=>{
if(role!=="broker" && code.length<6){alert("Pay to TILL 1754910 then enter M-Pesa Code!");return;}
if(!title||!phone){alert("Fill Title and Phone!");return;}
alert(`RECEIVED!\nLand:${title}\nPhone:${phone}\nCode:${code}\nFee:${fee}\nWe verify TILL 1754910 in 10min!`);
window.location.href="/";
};
return(
<div className="min-h-screen bg-[#f0f4f8] p-3">
<div className="bg-[#0a1f44] text-white p-3 rounded-b-2xl -m-3 mb-3 flex gap-3"><span onClick={()=>window.location.href="/"}>←</span><b>Selling Land - LIVE</b></div>
<div className="bg-green-600 text-white p-4 rounded-2xl text-center font-black text-xl">LAND TILL 1754910<br/><span className="text-sm font-normal">Seller 500 | Buyer 300 | Broker FREE</span></div>
<div className="bg-white p-3 rounded-2xl mt-3">
<div className="font-bold">Who are you?</div>
<div className="grid grid-cols-3 gap-2 mt-2">
<button onClick={()=>setRole("seller")} className={`p-3 rounded-xl font-bold border-2 ${role==="seller"?"bg-[#0a1f44] text-white":"bg-white"}`}>Seller<br/>500</button>
<button onClick={()=>setRole("buyer")} className={`p-3 rounded-xl font-bold border-2 ${role==="buyer"?"bg-blue-600 text-white":"bg-white"}`}>Buyer<br/>300</button>
<button onClick={()=>setRole("broker")} className={`p-3 rounded-xl font-bold border-2 ${role==="broker"?"bg-orange-500 text-white":"bg-white"}`}>Broker<br/>FREE</button>
</div>
</div>
<div className="bg-white p-3 rounded-2xl mt-3">
<input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Land Title e.g. 50x100 Kenol" className="w-full border p-3 rounded-xl mb-2"/>
<input value={loc} onChange={e=>setLoc(e.target.value)} placeholder="Location e.g. Muranga" className="w-full border p-3 rounded-xl mb-2"/>
<input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price e.g. 850k" className="w-full border p-3 rounded-xl mb-2"/>
<input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Your Phone 07..." className="w-full border p-3 rounded-xl mb-2"/>
</div>
{role!=="broker" && (
<div className="bg-yellow-100 border-2 border-yellow-400 p-3 rounded-2xl mt-3">
<div className="font-black">STEP 1: Lipa na M-Pesa</div>
<div className="text-sm mt-1">M-Pesa → Lipa na M-Pesa → Buy Goods → <b className="text-green-700">1754910</b> → Amount <b>{fee}</b></div>
<div className="font-black mt-3">STEP 2: Enter M-Pesa Code</div>
<input value={code} onChange={e=>setCode(e.target.value.toUpperCase())} placeholder="QGH..." className="w-full border-2 border-green-600 p-3 rounded-xl mt-2 font-black"/>
</div>
)}
{role==="broker" && <div className="bg-green-50 p-3 rounded-2xl mt-3 text-center font-bold text-green-700">BROKER FREE - No Payment Needed</div>}
<button onClick={submit} className="w-full bg-[#0a1f44] text-white p-4 rounded-xl font-black mt-3">SUBMIT TO TILL 1754910</button>
</div>
);
}
