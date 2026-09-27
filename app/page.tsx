"use client";

export default function HomePage(){
return(
<div className="min-h-screen bg-[#eef2f7] pb-28">

{/* TOP SEARCH - SAME BEAUTIFUL */}
<div className="bg-[#0a1931] p-4 pt-6 pb-6">
<div className="bg-white rounded-full flex items-center px-4 py-3">
<span>🔍</span>
<input placeholder="Search services..." className="ml-2 w-full outline-none text-sm" />
</div>
</div>

<div className="p-4">
<div className="flex justify-between items-center">
<h1 className="font-black text-[#0a1931] text-xl">Popular Categories</h1>
<button onClick={()=>window.location.href='/jobs'} className="text-blue-600 text-sm">See All</button>
</div>

{/* GRID - SAME COLORS */}
<div className="grid grid-cols-2 gap-4 mt-4">

<button onClick={()=>window.location.href='/jobs?cat=Cleaning'} className="bg-white rounded-[24px] p-6 shadow-sm flex flex-col items-center">
<div className="bg-[#00d68f] w-16 h-16 rounded-[16px] flex items-center justify-center text-white font-black text-xl">C</div>
<p className="font-black mt-3 text-[#0a1931]">Cleaning</p>
</button>

<button onClick={()=>window.location.href='/jobs?cat=Delivery'} className="bg-white rounded-[24px] p-6 shadow-sm flex flex-col items-center">
<div className="bg-[#ff7a00] w-16 h-16 rounded-[16px] flex items-center justify-center text-white font-black text-xl">D</div>
<p className="font-black mt-3 text-[#0a1931]">Delivery</p>
</button>

<button onClick={()=>window.location.href='/jobs?cat=Repairs'} className="bg-white rounded-[24px] p-6 shadow-sm flex flex-col items-center">
<div className="bg-[#ff1f3d] w-16 h-16 rounded-[16px] flex items-center justify-center text-white font-black text-xl">R</div>
<p className="font-black mt-3 text-[#0a1931]">Repairs</p>
</button>

<button onClick={()=>window.location.href='/jobs?cat=Plumbing'} className="bg-white rounded-[24px] p-6 shadow-sm flex flex-col items-center">
<div className="bg-[#3a8dff] w-16 h-16 rounded-[16px] flex items-center justify-center text-white font-black text-xl">P</div>
<p className="font-black mt-3 text-[#0a1931]">Plumbing</p>
</button>

<button onClick={()=>window.location.href='/jobs?cat=Construction'} className="bg-white rounded-[24px] p-6 shadow-sm flex flex-col items-center">
<div className="bg-[#a855f7] w-16 h-16 rounded-[16px] flex items-center justify-center text-white font-black text-xl">C</div>
<p className="font-black mt-3 text-[#0a1931] text-sm">Construction</p>
</button>

<button onClick={()=>window.location.href='/jobs?cat=Catering'} className="bg-white rounded-[24px] p-6 shadow-sm flex flex-col items-center">
<div className="bg-[#ffcc00] w-16 h-16 rounded-[16px] flex items-center justify-center text-white font-black text-xl">O</div>
<p className="font-black mt-3 text-[#0a1931] text-sm text-center">Outside Catering</p>
</button>

<button onClick={()=>window.location.href='/cars'} className="bg-white rounded-[24px] p-5 shadow-sm flex flex-col items-center border-2 border-black">
<div className="bg-black w-16 h-16 rounded-[16px] flex items-center justify-center">🚗</div>
<p className="font-black mt-3 text-[#0a1931]">Cars Sale</p>
<span className="bg-red-500 text-white text-xs px-4 py-1 rounded-full mt-2 font-black">NEW!</span>
</button>

<button onClick={()=>window.location.href='/lands'} className="bg-white rounded-[24px] p-5 shadow-sm flex flex-col items-center border-2 border-green-500">
<div className="bg-green-50 w-16 h-16 rounded-[16px] flex items-center justify-center">🖼️</div>
<p className="font-black mt-3 text-[#0a1931]">Lands</p>
<span className="text-green-600 text-sm mt-1">0116982197</span>
</button>

</div>

{/* Selling Land - SAME */}
<button onClick={()=>window.location.href='/lands'} className="w-full mt-4 bg-white rounded-[20px] p-4 border-2 border-[#0a1931] flex flex-col items-center">
<span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">LAND</span>
<p className="font-black text-2xl mt-2 text-[#0a1931]">Selling Land</p>
</button>

</div>

{/* BOTTOM NAV - NOW 100% PRESSING! */}
<div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center py-3 pb-8 z-[9999]">
<button onClick={()=>window.location.href='/'} className="flex flex-col items-center"><span>🏠</span><span className="text-sm font-black">Home</span></button>
<button onClick={()=>window.location.href='/jobs'} className="flex flex-col items-center"><span>💼</span><span className="text-sm">Jobs</span></button>
<button onClick={()=>window.location.href='/post'} className="bg-[#0a1931] text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl -mt-3">+</button>
<button onClick={()=>window.location.href='/cars'} className="flex flex-col items-center"><span>🚗</span><span className="text-sm">Cars</span></button>
<button onClick={()=>window.location.href='/lands'} className="flex flex-col items-center"><span>🖼️</span><span className="text-sm">Lands</span></button>
</div>

</div>
);
}
