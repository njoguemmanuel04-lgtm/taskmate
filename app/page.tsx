"use client"
export default function Page(){
 return(
 <div className="min-h-screen bg-white">
  <header className="bg-[#0a1f44] text-white p-4">
   <div className="flex justify-between items-center">
    <h1 className="font-bold text-xl">✅ TaskMate Kenya 🇰🇪</h1>
    <div className="flex gap-2 items-center">
     <span className="bg-yellow-400 text-black px-2 py-1 rounded-full text-sm font-bold">⭐ KES 50</span>
     <span>🔔</span>
    </div>
   </div>
   <p className="text-yellow-300 text-xs mt-1">Kenya's Trusted Job Marketplace • Find skilled people • Get jobs done</p>
  </header>

  <div className="p-3 grid grid-cols-2 md:grid-cols-4 gap-3">
   {/* 1 */}
   <div className="bg-blue-50 p-3 rounded-xl">
    <h2 className="font-bold">1 Get jobs done</h2>
    <p className="text-xs">Find skilled people</p>
    <div className="mt-2 bg-gray-200 h-20 rounded flex items-center justify-center text-2xl">👷‍♀️👷‍♂️</div>
    <p className="text-[10px] mt-1">Kenya's trusted marketplace</p>
   </div>
   {/* 2 */}
   <div className="bg-blue-50 p-3 rounded-xl">
    <h2 className="font-bold">2 Categories</h2>
    <div className="text-xs mt-2 space-y-1">
     <div>🧹 Cleaning</div><div>🛵 Delivery</div><div>🔧 Repairs</div>
     <div>🚿 Plumbing</div><div>🏗️ Construction</div><div>🍲 Outside Catering</div>
     <div onClick={()=>location.href="/land"} className="bg-green-100 p-1 rounded font-bold cursor-pointer">🌍 Selling Land TILL 1754910</div>
    </div>
   </div>
   {/* 3 */}
   <div className="bg-blue-50 p-3 rounded-xl">
    <h2 className="font-bold">3 Post a Job</h2>
    <input className="w-full mt-2 p-2 border rounded text-xs" placeholder="Job Title e.g. House Cleaning"/>
    <input className="w-full mt-1 p-2 border rounded text-xs" placeholder="Nairobi - Kenya"/>
    <input className="w-full mt-1 p-2 border rounded text-xs" placeholder="Budget KSh e.g. 2500"/>
    <button className="w-full mt-2 bg-yellow-400 font-bold py-2 rounded text-sm">Post Job →</button>
   </div>
   {/* 4 */}
   <div className="bg-blue-50 p-3 rounded-xl">
    <h2 className="font-bold">4 Skilled people ready</h2>
    <div className="mt-2 bg-gray-200 h-24 rounded flex items-center justify-center">👨‍🔧</div>
    <p className="text-[10px] mt-1 bg-yellow-200 p-1 rounded">✓ Verified • Experienced • Ready to Work</p>
   </div>
   {/* 5 */}
   <div className="bg-blue-50 p-3 rounded-xl">
    <h2 className="font-bold">5 Reliable trusted workers</h2>
    <div className="mt-2 bg-gray-200 h-24 rounded flex items-center justify-center">👩‍🏭</div>
    <p className="text-[10px] mt-1 bg-yellow-200 p-1 rounded">Background-checked • Trusted • Professional</p>
   </div>
   {/* 6 */}
   <div className="bg-blue-50 p-3 rounded-xl col-span-2">
    <h2 className="font-bold">6 Available Jobs</h2>
    <div className="mt-2 space-y-2">
     <div className="bg-white p-2 rounded flex justify-between items-center text-xs"><span>🏠 House Cleaning - Westlands - KSh 1,800</span><button className="bg-yellow-400 px-2 py-1 rounded font-bold">Apply</button></div>
     <div className="bg-white p-2 rounded flex justify-between items-center text-xs"><span>🛵 Delivery - Kilimani - KSh 950</span><button className="bg-yellow-400 px-2 py-1 rounded font-bold">Apply</button></div>
     <div className="bg-white p-2 rounded flex justify-between items-center text-xs"><span>🔧 Plumbing - KSh 3,000</span><button className="bg-yellow-400 px-2 py-1 rounded font-bold">Apply</button></div>
    </div>
   </div>
   {/* 7 */}
   <div className="bg-blue-50 p-3 rounded-xl">
    <h2 className="font-bold">7 Earn money using skills</h2>
    <div className="mt-2 bg-gray-200 h-24 rounded flex items-center justify-center">👷</div>
    <div className="text-xs mt-1"><p>✅ Use your skills to earn</p><p>✅ Flexible shifts</p><p>✅ Paid via M-Pesa</p></div>
   </div>
   {/* 8 */}
   <div className="bg-[#0a1f44] p-3 rounded-xl text-white">
    <h2 className="font-bold text-yellow-300">8 Download Now</h2>
    <div className="mt-2 text-xs space-y-1">
     <p>✅ Safe & Secure • Local Jobs</p>
     <p>✅ Trusted Community</p>
     <p>✅ Fast & Easy</p>
    </div>
    <div className="mt-3 bg-black p-2 rounded text-center text-xs">GET IT ON Google Play</div>
    <div className="mt-1 bg-black p-2 rounded text-center text-xs">Download on App Store</div>
    <p className="text-[10px] text-yellow-300 mt-2">Join 10,000+ Kenyans • TILL 1754910</p>
    <p className="text-xs mt-1">Good morning, Emmanuel ☀️</p>
   </div>
  </div>
 </div>
 )
}
