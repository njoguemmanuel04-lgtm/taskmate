"use client";
export default function Subscription(){
const go=(p:string)=>{window.location.href=p};
return(
<div className="min-h-screen bg-[#eef2f7] p-4">
<div className="flex gap-3 mb-6"><button onClick={()=>go('/')} className="bg-white p-2 rounded-xl">←</button><h1 className="font-bold text-xl">Subscription</h1></div>
<div className="bg-[#0a1931] text-white rounded-2xl p-6 text-center">
<h2 className="text-2xl font-bold">KES 50 / Month</h2><p className="text-xs opacity-70 mt-2">Unlimited jobs + Land</p>
<div className="mt-4 bg-white text-black rounded-xl p-3"><p className="font-bold text-sm">TILL 1754910</p><p className="text-[10px]">Seller 500 | Buyer 300 | Broker FREE</p></div>
<button onClick={()=>alert('Pay to Till 1754910')} className="mt-4 w-full bg-blue-600 py-3 rounded-xl font-bold">Activate Now</button>
</div>
</div>
)
}
