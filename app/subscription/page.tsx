"use client";
import { useState } from "react";

export default function Subscription() {
  const TILL = "1754910";
  return (
    <div className="min-h-screen bg-[#eef2f7] pb-24">
      <div className="bg-[#0a1f44] text-white p-5">
        <h1 className="font-black text-xl">My Subscription</h1>
        <p className="text-xs opacity-80">TILL {TILL} - TaskMate Kenya</p>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-gradient-to-r from-[#0a1f44] to-blue-600 text-white p-6 rounded-2xl text-center">
          <div className="text-sm opacity-80">Current Balance</div>
          <div className="text-4xl font-black mt-2">KES 50</div>
          <div className="text-xs mt-2 bg-white/20 inline-block px-3 py-1 rounded-full">ACTIVE - Valid for 30 Days</div>
          <button onClick={()=>window.location.href='/'} className="bg-white text-[#0a1f44] px-6 py-2 rounded-full font-black text-sm mt-4 block mx-auto">Go Home</button>
        </div>

        <div className="bg-white rounded-2xl p-4">
          <h3 className="font-black">What KES 50 Unlocks:</h3>
          <div className="mt-3 space-y-2 text-sm">
            <div>✅ Apply unlimited jobs</div>
            <div>✅ Contact clients directly</div>
            <div>✅ Post 3 jobs per month FREE</div>
            <div>✅ Selling Land: Seller 500 / Buyer 300 / Broker FREE (Separate from KES 50)</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border-2 border-green-600">
          <h3 className="font-black text-green-700">Top Up Subscription</h3>
          <p className="text-xs mt-1">Pay to TILL {TILL}</p>
          <div className="grid grid-cols-3 gap-2 mt-3">
            <button className="bg-[#0a1f44] text-white p-3 rounded-xl font-bold">KES 50<br/><span className="text-[10px]">1 Month</span></button>
            <button className="bg-green-600 text-white p-3 rounded-xl font-bold">KES 120<br/><span className="text-[10px]">3 Months</span></button>
            <button className="bg-yellow-500 text-black p-3 rounded-xl font-bold">KES 400<br/><span className="text-[10px]">1 Year</span></button>
          </div>
          <div className="text-center text-[11px] mt-3 font-bold">Lipa na M-Pesa -&gt; Buy Goods -&gt; TILL {TILL} -&gt; KES 50</div>
        </div>
      </div>
    </div>
  );
}
