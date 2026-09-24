"use client"
export default function Page(){
return(
<div className="min-h-screen bg-slate-100 pb-10">
  {/* HEADER */}
  <div className="bg-white p-3 border-b-4 border-blue-900">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="bg-blue-900 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold">M</div>
        <div>
          <h1 className="font-black text-blue-900 leading-none">TaskMate <span className="text-orange-500">Kenya</span></h1>
          <p className="text-[10px] font-bold">Kenya's Trusted Job Marketplace</p>
        </div>
      </div>
      <div className="text-[10px]">🇰🇪 Real People<br/>Real Skills</div>
    </div>
  </div>

  {/* 8 GRID */}
  <div className="p-3 grid grid-cols-2 gap-3">

    {/* 1 */}
    <div className="bg-blue-500 rounded-2xl p-3 text-white">
      <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
      <h2 className="font-black mt-1 text-sm">Get jobs done<br/>Find skilled people</h2>
      <p className="text-[10px] mt-1">From home services to pro work</p>
      <div className="bg-white/20 h-16 rounded-xl mt-2"></div>
      <p className="text-[9px] bg-white text-blue-600 mt-2 px-2 py-1 rounded-full inline-block">✓ Safe • Easy • Reliable</p>
    </div>

    {/* 2 */}
    <div className="bg-white rounded-2xl p-3 shadow">
      <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
      <h2 className="font-black text-sm text-blue-900">Categories</h2>
      <div className="grid grid-cols-3 gap-1 mt-2 text-[8px] text-center">
        <div>🧹<br/>Cleaning</div><div>🛵<br/>Delivery</div><div>🔧<br/>Repairs</div>
        <div>🚿<br/>Plumbing</div><div>👷<br/>Construct</div><div>🍲<br/>Catering</div>
        <div>⚡<br/>Electrical</div><div>📚<br/>Tutoring</div><div>💻<br/>Online</div>
      </div>
      <p className="text-[8px] text-green-700 font-bold mt-2">Selling Land TILL 1754910</p>
    </div>

    {/* 3 */}
    <div className="bg-white rounded-2xl p-3 shadow">
      <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
      <h2 className="font-black text-sm text-blue-900">Post a Job</h2>
      <p className="text-[9px]">Describe what you need in minutes</p>
      <div className="bg-slate-900 h-20 rounded-xl mt-2 flex items-center justify-center text-white text-[8px]">📱 TaskMate App Mockup</div>
      <div className="text-[9px] mt-2 space-y-1">
        <div>✓ Quick & simple</div><div>✓ Set your budget</div>
        <div className="bg-green-50 p-1 rounded text-green-700 font-bold">M-PESA Pay securely</div>
      </div>
    </div>

    {/* 4 */}
    <div className="bg-white rounded-2xl p-3 shadow">
      <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">4</span>
      <h2 className="font-black text-sm text-blue-900 leading-tight">Skilled people ready</h2>
      <p className="text-[9px]">Verified. Experienced. Professional.</p>
      <div className="bg-slate-200 h-16 rounded-xl mt-2"></div>
      <div className="text-[8px] mt-2 space-y-1">
        <div>✓ Background checked</div><div>⭐ Ratings & reviews</div>
      </div>
    </div>

    {/* 5 */}
    <div className="bg-white rounded-2xl p-3 shadow">
      <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">5</span>
      <h2 className="font-black text-sm text-blue-900">Reliable trusted workers</h2>
      <div className="bg-slate-200 h-16 rounded-xl mt-2"></div>
      <div className="text-[8px] mt-2 space-y-1">
        <div>✓ Verified ID</div><div>⭐ Customer reviews</div>
        <div className="bg-blue-900 text-white p-1 rounded text-[8px] mt-1 text-center">Trusted by thousands</div>
      </div>
    </div>

    {/* 6 */}
    <div className="bg-white rounded-2xl p-3 shadow">
      <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">6</span>
      <h2 className="font-black text-sm text-blue-900">Available Jobs</h2>
      <div className="mt-2 space-y-2 text-[9px]">
        <div className="flex justify-between border-b pb-1"><span>House Cleaning<br/>Nairobi</span><span className="font-bold">KSh 1,500</span></div>
        <div className="flex justify-between border-b pb-1"><span>Delivery Rider<br/>Thika</span><span className="font-bold">KSh 800</span></div>
        <div className="flex justify-between border-b pb-1"><span>Construction<br/>Nakuru</span><span className="font-bold">KSh 1,200</span></div>
        <div className="flex justify-between"><span>Maths Tutor<br/>Kisumu</span><span className="font-bold">KSh 500</span></div>
      </div>
    </div>

    {/* 7 */}
    <div className="bg-orange-400 rounded-2xl p-3 text-white shadow">
      <span className="bg-white text-orange-500 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">7</span>
      <h2 className="font-black text-sm mt-1">Earn money using skills</h2>
      <p className="text-[9px] mt-1">Turn your talent into income.</p>
      <div className="bg-white/20 h-16 rounded-xl mt-2"></div>
      <div className="text-[9px] mt-2 space-y-1">
        <div>✓ Get hired for local jobs</div><div>✓ Withdraw via M-Pesa</div>
      </div>
    </div>

    {/* 8 */}
    <div className="bg-blue-900 rounded-2xl p-3 text-white shadow">
      <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">8</span>
      <h2 className="font-black text-sm mt-1">Download Now</h2>
      <p className="text-[9px]">Get started in minutes</p>
      <div className="mt-3 space-y-2">
        <div className="bg-black rounded p-2 text-[9px] text-center">▶ GET IT ON Google Play</div>
        <div className="bg-black rounded p-2 text-[9px] text-center"> Download on App Store</div>
      </div>
      <p className="text-[8px] mt-3 text-yellow-300">TILL 1754910 • Good morning, Emmanuel</p>
    </div>

  </div>

  {/* FOOTER */}
  <div className="bg-blue-900 text-white text-[9px] p-3 flex justify-between mt-2">
    <span>❤ Support Local</span><span>🛡 Safe & Secure</span><span>📱 Easy to Use</span><span>🇰🇪 TaskMate Kenya</span>
  </div>
</div>
)
}
