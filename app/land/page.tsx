"use client";
import { useState } from "react";
export default function LandPage(){
const [role,setRole]=useState("seller");
const [phone,setPhone]=useState("");
const [title,setTitle]=useState("");
const [loc,setLoc]=useState("");
const [price,setPrice]=useState("");
const submit=()=>{
if(!title||!phone){alert("Add Title + Phone!");return;}
if(role==="broker"){
alert(`LISTED FREE as Broker!\n${title}\n@ ${loc}\nBuyers will call you!`);
}else{
alert(`Land Posted! ✅\n${title} in ${loc}\n\nTo get BUYERS CALLS, pay KES ${role==="seller"?500:300} to TILL 1754910\nGo M-Pesa -> Buy Goods -> 1754910\n\nYour listing is LIVE but number is hidden until you pay. Pay now to unlock 100+ buyers!`);
}
window.location.href="/";
};
return(
<div className="min-h-screen bg-[#f0f4f8] p-3 pb-20">
<div className="bg-[#0a1f44] text-white p-3 rounded-b-2xl -m-3 mb-3 flex gap-3"><span onClick={()=>window.location.href="/"}>←</span><b>Selling Land - Fast Post</b></div>
<div className="bg-white p-3 rounded-2xl shadow">
<div className="font-black text-lg">List Land in 5 Seconds</div>
<div className="text-xs text-gray-500">No M-Pesa Code Needed</div>
<div className="grid grid-cols-3 gap-2 mt-3">
<button onClick={()=>setRole("seller")} className={`p-3 rounded-xl font-bold border-2 ${role==="seller"?"bg-[#0a1f44] text-white":"bg-white"}`}>Seller<br/><span className="text-xs">500 to Unlock Calls</span></button>
<button onClick={()=>setRole("buyer")} className={`p-3 rounded-xl font-bold border-2 ${role==="buyer"?"bg-blue-600 text-white":"bg-white"}`}>Buyer<br/><span className="text-xs">300 to Unlock</span></button>
<button onClick={()=>setRole("broker")} className={`p-3 rounded-xl font-bold border-2 ${role==="broker"?"bg-orange-500 text-white":"bg-white"}`}>Broker<br/><span className="text-xs">FREE Forever</span></button>
</div>
</div>
<div className="bg-white p-3 rounded-2xl mt-3">
<input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Land Title e.g. 50x100 Kenol" className="w-full border p-3 rounded-xl mb-2"/>
<input value={loc} onChange={e=>setLoc(e.target.value)} placeholder="Location e.g. Muranga" className="w-full border p-3 rounded-xl mb-2"/>
<input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price e.g. 850k" className="w-full border p-3 rounded-xl mb-2"/>
<input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Your WhatsApp 07..." className="w-full border p-3 rounded-xl mb-2"/>
</div>
<button onClick={submit} className="w-full bg-[#0a1f44] text-white p-4 rounded-xl font-black mt-3">POST LAND NOW - FREE</button>
<div className="bg-green-50 border border-green-200 p-3 rounded-2xl mt-3">
<div className="font-bold text-green-800 text-sm">How you get paid? 💰</div>
<div className="text-xs mt-1">Listing is FREE. To show your phone to buyers and get calls, you pay to TILL <b>1754910</b> after posting. Broker = FREE always. This is how you make 500 per seller without boring code!</div>
</div>
</div>
);
}
