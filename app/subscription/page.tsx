"use client";
export default function Subscription(){
return(
<div className="min-h-screen bg-[#eef2f7] p-4">
<button onClick={()=>{location.href='/'}} className="bg-white px-3 py-2 rounded-xl">← Home</button>
<div className="mt-6 bg-[#0a1931] text-white rounded-2xl p-6 text-center">
<h2 className="text-2xl font-bold">KES 50 / Month</h2>
<p className="text-xs mt-2">Pay to TILL 1754910</p>
<p className="text-[10px] mt-1">Seller 500 | Buyer 300 | Broker FREE</p>
<button onClick={()=>alert('Pay to Till 1754910 then send receipt')} className="mt-4 w-full bg-blue-600 py-3 rounded-xl font-bold">Activate Now</button>
</div>
</div>
)
}
