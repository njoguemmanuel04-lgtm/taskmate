"use client";

export default function Subscription() {
  const TILL = "1754910";
  return (
    <div className="min-h-screen bg-[#eef2f7] pb-24">
      <div className="bg-[#0a1f44] text-white p-5">
        <h1 className="font-black text-xl">My Subscription</h1>
        <p className="text-xs opacity-80">TILL {TILL}</p>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-gradient-to-r from-[#0a1f44] to-blue-600 text-white p-6 rounded-2xl text-center">
          <div className="text-sm opacity-80">Current Plan</div>
          <div className="text-4xl font-black mt-2">KES 50</div>
          <div className="text-xs mt-2 bg-white/20 inline-block px-3 py-1 rounded-full">DAILY ACTIVE</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border-2 border-green-600">
          <h3 className="font-black text-green-700 text-center">CHOOSE PLAN - TILL {TILL}</h3>

          <div className="space-y-3 mt-4">
            <div className="border-2 border-[#0a1f44] rounded-xl p-4 flex justify-between items-center">
              <div><div className="font-black">Daily</div><div className="text-xs">24 Hours Access</div></div>
              <div className="text-right"><div className="font-black text-lg">KES 50</div><button onClick={()=>alert(`Pay KES 50 to TILL ${TILL} - Daily`)} className="bg-[#0a1f44] text-white text-xs px-4 py-1 rounded-full mt-1">Pay</button></div>
            </div>

            <div className="border-2 border-blue-500 bg-blue-50 rounded-xl p-4 flex justify-between items-center">
              <div><div className="font-black">Weekly</div><div className="text-xs">7 Days Access - Save 100</div></div>
              <div className="text-right"><div className="font-black text-lg">KES 250</div><button onClick={()=>alert(`Pay KES 250 to TILL ${TILL} - Weekly`)} className="bg-blue-600 text-white text-xs px-4 py-1 rounded-full mt-1">Pay</button></div>
            </div>

            <div className="border-2 border-green-600 bg-green-50 rounded-xl p-4 flex justify-between items-center">
              <div><div className="font-black">Monthly</div><div className="text-xs">30 Days - BEST VALUE</div></div>
              <div className="text-right"><div className="font-black text-lg">KES 500</div><button onClick={()=>alert(`Pay KES 500 to TILL ${TILL} - Monthly`)} className="bg-green-600 text-white text-xs px-4 py-1 rounded-full mt-1">Pay</button></div>
            </div>
          </div>

          <div className="text-center text-[11px] mt-4 font-bold bg-yellow-100 p-2 rounded-lg">
            How to Pay: Lipa na M-Pesa → Buy Goods → TILL {TILL} → Enter KES 50 / 250 / 500
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4">
          <h3 className="font-black">Land Fees (Separate):</h3>
          <div className="text-sm mt-2">Seller: KES 500 | Buyer: KES 300 | Broker: FREE → Same TILL {TILL}</div>
        </div>
      </div>
    </div>
  );
}
