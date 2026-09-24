"use client";
import { useState } from "react";

export default function SellingLand() {
  const TILL = "1754910";
  const SELLER_FEE = 500;
  const BUYER_FEE = 300;

  const [role, setRole] = useState<"seller"|"buyer"|"broker">("seller");
  const [phone, setPhone] = useState("");
  const [landTitle, setLandTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const payFee = async () => {
    let amount = 0;
    if (role === "seller") amount = SELLER_FEE;
    if (role === "buyer") amount = BUYER_FEE;
    if (role === "broker") { alert("Brokers post FREE - No payment needed"); return; }

    if (!phone) { alert("Enter M-Pesa phone"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/mpesa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, amount, till: TILL, reason: `Land ${role} fee` })
      });
      const data = await res.json();
      if (res.ok) alert(`STK Push sent to ${phone} - Pay KES ${amount} to TILL ${TILL}. Check phone and enter PIN`);
      else alert(data.message || "Payment failed - Pay manually to TILL " + TILL);
    } catch (e) {
      alert(`Pay manually: TILL ${TILL} - KES ${role==="seller"?500:300}. Then upload screenshot`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#eef2f7] pb-24">
      <div className="bg-[#0a1f44] text-white p-5">
        <h1 className="font-black text-xl">Selling Land</h1>
        <p className="text-xs opacity-80">Verified lands across Kenya - TILL {TILL}</p>
      </div>

      <div className="p-4 space-y-4">
        {/* FEE CARD */}
        <div className="bg-white rounded-2xl p-4 border-2 border-green-600">
          <h3 className="font-black text-green-700">FEE STRUCTURE - TILL {TILL}</h3>
          <div className="grid grid-cols-3 gap-2 mt-3 text-center text-sm">
            <div className="bg-green-50 p-3 rounded-xl border"><div className="font-black">SELLER</div><div className="text-green-600 font-bold">KES 500</div><div className="text-[10px]">To List Land</div></div>
            <div className="bg-blue-50 p-3 rounded-xl border"><div className="font-black">BUYER</div><div className="text-blue-600 font-bold">KES 300</div><div className="text-[10px]">To View Contact</div></div>
            <div className="bg-gray-50 p-3 rounded-xl border"><div className="font-black">BROKER</div><div className="font-bold">FREE</div><div className="text-[10px]">0 KES</div></div>
          </div>
          <div className="text-center mt-2 text-[11px] font-bold">Pay to TILL {TILL} - TaskMate Kenya</div>
        </div>

        {/* ROLE SELECT */}
        <div className="bg-white rounded-2xl p-4">
          <div className="flex gap-2">
            <button onClick={()=>setRole("seller")} className={`flex-1 p-3 rounded-xl font-bold ${role==="seller"?"bg-green-600 text-white":"bg-gray-100"}`}>I am Seller - 500</button>
            <button onClick={()=>setRole("buyer")} className={`flex-1 p-3 rounded-xl font-bold ${role==="buyer"?"bg-blue-600 text-white":"bg-gray-100"}`}>I am Buyer - 300</button>
            <button onClick={()=>setRole("broker")} className={`flex-1 p-3 rounded-xl font-bold ${role==="broker"?"bg-black text-white":"bg-gray-100"}`}>Broker FREE</button>
          </div>

          <input value={landTitle} onChange={e=>setLandTitle(e.target.value)} placeholder="Land Title - e.g. 1 Acre Kitengela" className="w-full mt-3 p-3 border rounded-xl" />
          <input value={location} onChange={e=>setLocation(e.target.value)} placeholder="Location - e.g. Kajiado" className="w-full mt-2 p-3 border rounded-xl" />
          <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price - e.g. 1,200,000" className="w-full mt-2 p-3 border rounded-xl" />
          <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="M-Pesa Phone 07..." className="w-full mt-2 p-3 border rounded-xl" />

          <button onClick={payFee} disabled={loading} className="w-full mt-4 bg-[#0a1f44] text-white p-4 rounded-xl font-black">
            {loading? "Sending STK..." : role==="seller"? `Pay KES 500 to TILL ${TILL} & List` : role==="buyer"? `Pay KES 300 to TILL ${TILL} & View Contacts` : "Post as Broker - FREE"}
          </button>

          <div className="text-center text-[11px] mt-3">Manual Payment: Go to Lipa na M-Pesa -&gt; Buy Goods -&gt; TILL {TILL} -&gt; Amount {role==="seller"?500:role==="buyer"?300:0}</div>
        </div>
      </div>
    </div>
  );
}
