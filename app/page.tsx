"use client"
export default function Page(){
 return(
 <div className="min-h-screen bg-white">
  <header className="bg-[#0a1f44] text-white p-4">
   <div className="flex justify-between">
    <h1 className="font-bold">TaskMate Kenya</h1>
    <span className="bg-yellow-400 text-black px-2 rounded-full text-sm">KES 50</span>
   </div>
   <p className="text-yellow-300 text-xs mt-1">Kenya's Trusted Job Marketplace</p>
  </header>
  <div className="p-3 grid grid-cols-2 gap-3">
   <div className="bg-blue-50 p-3 rounded-xl"><h2 className="font-bold">1 Get jobs done</h2><p className="text-xs">Find skilled people</p><div className="bg-gray-200 h-16 rounded mt-2"></div></div>
   <div className="bg-blue-50 p-3 rounded-xl"><h2 className="font-bold">2 Categories</h2><div className="text-xs mt-2">Cleaning<br/>Delivery<br/>Repairs<br/>Plumbing<br/>Construction<br/>Outside Catering<br/><span onClick={()=>location.href='/land'} className="font-bold text-green-700">Selling Land TILL 1754910</span></div></div>
   <div className="bg-blue-50 p-3 rounded-xl"><h2 className="font-bold">3 Post a Job</h2><input className="w-full mt-2 p-2 border rounded text-xs" placeholder="Job Title"/><input className="w-full mt-1 p-2 border rounded text-xs" placeholder="Location"/><input className="w-full mt-1 p-2 border rounded text-xs" placeholder="Budget KSh"/><button className="w-full mt-2 bg-yellow-400 py-2 rounded font-bold">Post Job</button></div>
   <div className="bg-blue-50 p-3 rounded-xl"><h2 className="font-bold">4 Skilled people ready</h2><div className="bg-gray-200 h-20 rounded mt-2"></div><p className="text-[10px] bg-yellow-200 mt-1 p-1 rounded">Verified • Ready to Work</p></div>
   <div className="bg-blue-50 p-3 rounded-xl"><h2 className="font-bold">5 Reliable trusted</h2><div className="bg-gray-200 h-20 rounded mt-2"></div><p className="text-[10px] bg-yellow-200 mt-1 p-1 rounded">Background-checked</p></div>
   <div className="bg-blue-50 p-3 rounded-xl"><h2 className="font-bold">6 Available Jobs</h2><div className="bg-white p-2 rounded mt-2 text-xs flex justify-between">House Cleaning KSh 1,800 <button className="bg-yellow-400 px-2 rounded">Apply</button></div><div className="bg-white p-2 rounded mt-1 text-xs flex justify-between">Delivery KSh 950 <button className="bg-yellow-400 px-2 rounded">Apply</button></div><div className="bg-white p-2 rounded mt-1 text-xs flex justify-between">Plumbing KSh 3,000 <button className="bg-yellow-400 px-2 rounded">Apply</button></div></div>
   <div className="bg-blue-50 p-3 rounded-xl"><h2 className="font-bold">7 Earn money</h2><div className="bg-gray-200 h-20 rounded mt-2"></div><p className="text-xs mt-1">Use skills to earn<br/>Flexible<br/>M-Pesa</p></div>
   <div className="bg-[#0a1f44] p-3 rounded-xl text-white"><h2 className="font-bold text-yellow-300">8 Download Now</h2><p className="text-xs mt-2">Safe & Secure<br/>Trusted Community<br/>Fast & Easy</p><div className="bg-black p-2 rounded mt-3 text-xs text-center">Google Play</div><div className="bg-black p-2 rounded mt-1 text-xs text-center">App Store</div><p className="text-[10px] text-yellow-300 mt-2">TILL 1754910 • 10,000+ Kenyans</p><p className="text-xs mt-1">Good morning, Emmanuel</p></div>
  </div>
 </div>
 )
}
