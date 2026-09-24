"use client";
import { useState, useEffect } from "react";
export default function LandPage(){
const [role,setRole]=useState("seller");
const [phone,setPhone]=useState("");
const [title,setTitle]=useState("");
const [loc,setLoc]=useState("");
const [price,setPrice]=useState("");
const [lands,setLands]=useState<any[]>([]);
useEffect(()=>{
const s=JSON.parse(localStorage.getItem("taskmate_lands")||"[]");
setLands(s);
},[]);
const submit=()=>{
if(!title||!phone||!loc){alert("Fill Title, Location & Phone!");return;}
const newLand={id:Date.now(),title,loc,price:price||"Negotiable",phone,role,fee:role==="seller"?500:role==="buyer"?300:0,paid:false,date:new Date().toLocaleDateString()};
const updated=[newLand,...lands];
localStorage.setItem("taskmate_lands",JSON.stringify(updated));
setLands(updated);
if(role==="broker"){alert(`✅ LISTED FREE as Broker!\n${title} @ ${loc}`);}else{alert(`✅ Land Posted: ${title} in ${loc}\n\nLIVE! Pay ${newLand.fee} to TILL 1754910 to show your number!`);}
setTitle("");setLoc("");setPrice("");setPhone("");
};
const markPaid=(id:number)=>{
const u=lands.map(l=>l.id===id?{...l,paid:true}:l);
localStorage.setItem("taskmate_lands",JSON.stringify(u));
setLands(u);
alert("Marked PAID ✅");
};
return(
<div className="min-h-screen bg-[#f0f4f8] p-3 pb-24">
<div className="bg-[#0a1f44] text-white p-3 rounded-b-2xl -m-3 mb-3"><span onClick={()=>window.location.href="/"}>← Back</span><b className="ml-3">Selling Land - Fast</b></div>
<div className="bg-white p-4 rounded-2xl shadow"><div className="font-black text-lg">List Land in 5 Seconds</div><div className="text-xs text-gray-500">No Code • Till 1754910</div>
<div className="grid grid-cols-3 gap-2 mt-3">
<button onClick={()=>setRole("seller")} className={`p-3 rounded-xl font-bold border-2 ${role==="seller"?"bg-[#0a1f44] text-white":"bg-white"}`}>Seller<br/><span className="text-[10px]">500</span></button>
<button onClick={()=>setRole("buyer")} className={`p-3 rounded-xl font-bold border-2 ${role==="buyer"?"bg-blue-600 text-white":"bg-white"}`}>Buyer<br/><span className="text-[10px]">300</span></button>
<button onClick={()=>setRole("broker")} className={`p-3 rounded-xl font-bold border-2 ${role==="broker"?"bg-orange-500 text-white":"bg-white"}`}>Broker<br/><span className="text-[10px]">FREE</span></button>
</div></div>
<div className="bg-white p-3 rounded-2xl mt-3">
<input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title e.g. 50x100 Kenol" className="w-full border p-3 rounded-xl mb-2"/>
<input value={loc} onChange={e=>setLoc(e.target.value)} placeholder="Location e.g. Mwea" className="w-full border p-3 rounded-xl mb-2"/>
<input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price e.g. 850k" className="w-full border p-3 rounded-xl mb-2"/>
<input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="WhatsApp 07..." className="w-full border p-3 rounded-xl mb-2"/>
<button onClick={submit} className="w-full bg-[#0a1f44] text-white p-4 rounded-xl font-black mt-2">POST LAND NOW - FREE</button>
</div>
{lands.length>0 && <div className="mt-4"><div className="font-black mb-2">Posted Lands ({lands.length}) - You can SEE here:</div>
{lands.map((l:any)=><div key={l.id} className="bg-white p-3 rounded-xl mb-2 border flex justify-between"><div><div className="font-bold">{l.title}</div><div className="text-xs text-gray-600">{l.loc} • KES {l.price}</div><div className="text-xs mt-1">{l.paid?"✅ Paid - "+l.phone:"🔒 Hidden - Pay Till 1754910"}</div></div><div className="text-right"><div className={`text-[10px] px-2 py-1 rounded-full ${l.paid?"bg-green-100":"bg-yellow-100"}`}>{l.paid?"PAID":"UNPAID"}</div>{!l.paid && l.role!=="broker" && <button onClick={()=>markPaid(l.id)} className="text-[10px] bg-[#0a1f44] text-white px-2 py-1 rounded mt-1">I Paid</button>}</div></div>)}</div>}
</div>
);
}
