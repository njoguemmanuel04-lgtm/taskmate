"use client";
import { useState } from "react";

export default function Plans() {
  const MPESA = "0116982197";
  const [loading, setLoading] = useState("");

  const pay = async (amount: string, plan: string) => {
    setLoading(plan);
    try {
      const phone = prompt(`Enter M-Pesa Phone to pay KES ${amount} for ${plan}:`);
      if (!phone) { setLoading(""); return; }
      await fetch("/api/mpesa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, amount: Number(amount), account: MPESA, plan })
      });
      alert(`STK Push sent! Pay KES ${amount} via M-Pesa. Check your phone.\nIf no STK, pay manually to ${MPESA}`);
    } catch {
      alert(`Pay manually: M-PESA ${MPESA} - KES ${amount}`);
    }
    setLoading("");
  };

  return (
    <div className="min-h-screen bg-[#f2f4f7] pb-10">
      <div className="p-5 flex items-center gap-3">
        <div onClick={()=>window.location.href='/'} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer">←</div>
        <h1 className="font-black text-xl flex items-center gap-2">💰 Plans</h1>
      </div>
      <div className="px-5 -mt-2 text-sm text-gray-600">M-PESA: <span className="font-bold">{MPESA}</span></div>

      <div className="p-4 space-y-4">
        {/* DAILY TRY */}
        <div className="bg-white rounded-[24px] p-5 border border-gray-800">
          <div className="flex justify-between">
            <div><div className="font-black text-lg">Daily Try</div><div className="text-gray-500 text-sm">1 Day</div></div>
            <div className="font-black text-xl">KES 50</div>
          </div>
          <div className="mt-3 text-sm space-y-1">
            <div>✓ Visible 24hrs</div>
            <div>✓ 2-3 Calls</div>
          </div>
          <button onClick={()=>pay("50","Daily Try")} className="w-full mt-5 bg-[#0a1f44] text-white py-4 rounded-full font-black">
            {loading==="Daily Try"? "Sending..." : "Pay KES 50 via M-Pesa"}
          </button>
        </div>

        {/* WEEKLY HUSTLE */}
        <div className="bg-blue-50 rounded-[24px] p-5 border-2 border-blue-500">
          <div className="flex justify-between">
            <div><div className="font-black text-lg">Weekly Hustle</div><div className="text-gray-500 text-sm">7 Days</div></div>
            <div className="font-black text-xl">KES 250</div>
          </div>
          <div className="mt-3 text-sm space-y-1">
            <div>✓ Visible 7 days</div>
            <div>✓ TOP in search</div>
            <div>✓ 15-20 Calls</div>
            <div>✓ Mwea+Ngurubani</div>
          </div>
          <button onClick={()=>pay("250","Weekly Hustle")} className="w-full mt-5 bg-blue-600 text-white py-4 rounded-full font-black">
            {loading==="Weekly Hustle"? "Sending..." : "Pay KES 250 via M-Pesa"}
          </button>
        </div>

        {/* MONTHLY CEO */}
        <div className="bg-[#fff9e6] rounded-[24px] p-5 border-2 border-yellow-500">
          <div className="flex justify-between">
            <div><div className="font-black text-lg">Monthly CEO</div><div className="text-gray-500 text-sm">30 Days</div></div>
            <div className="font-black text-xl">KES 799</div>
          </div>
          <div className="mt-3 text-sm space-y-1">
            <div>✓ Visible 30 days</div>
            <div>✓ ALWAYS TOP</div>
            <div>✓ 80+ Calls</div>
            <div>✓ Verified badge</div>
            <div>✓ All Kirinyaga</div>
          </div>
          <button onClick={()=>pay("799","Monthly CEO")} className="w-full mt-5 bg-[#0a1f44] text-white py-4 rounded-full font-black">
            {loading==="Monthly CEO"? "Sending..." : "Pay KES 799 via M-Pesa"}
          </button>
        </div>
      </div>
    </div>
  );
}
