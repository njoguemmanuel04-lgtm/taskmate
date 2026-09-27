"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#eef2f7] pb-20">
      {/* HEADER - SAME */}
      <div className="bg-[#0a1931] text-white p-5">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-black">TaskMate</h1>
          <div className="w-8 h-8 bg-white rounded-full"></div>
        </div>
        <div className="mt-4 bg-white rounded-full p-2 flex items-center">
          <span className="ml-2">🔍</span>
          <input placeholder="Search services..." className="ml-2 w-full outline-none text-black text-sm" />
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-black text-[#0a1931] text-lg">Popular Categories</h2>
          <span className="text-blue-600 text-sm">See All</span>
        </div>

        {/* GRID - SAME */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-[20px] p-5 text-center shadow-sm">
            <div className="w-12 h-12 bg-[#00d084] rounded-[12px] flex items-center justify-center mx-auto text-white font-black">C</div>
            <p className="font-bold mt-2 text-[#0a1931]">Cleaning</p>
          </div>
          <div className="bg-white rounded-[20px] p-5 text-center shadow-sm">
            <div className="w-12 h-12 bg-orange-500 rounded-[12px] flex items-center justify-center mx-auto text-white font-black">D</div>
            <p className="font-bold mt-2 text-[#0a1931]">Delivery</p>
          </div>
          <div className="bg-white rounded-[20px] p-5 text-center shadow-sm">
            <div className="w-12 h-12 bg-red-500 rounded-[12px] flex items-center justify-center mx-auto text-white font-black">R</div>
            <p className="font-bold mt-2 text-[#0a1931]">Repairs</p>
          </div>
          <div className="bg-white rounded-[20px] p-5 text-center shadow-sm">
            <div className="w-12 h-12 bg-blue-500 rounded-[12px] flex items-center justify-center mx-auto text-white font-black">P</div>
            <p className="font-bold mt-2 text-[#0a1931]">Plumbing</p>
          </div>
          <div className="bg-white rounded-[20px] p-5 text-center shadow-sm">
            <div className="w-12 h-12 bg-purple-500 rounded-[12px] flex items-center justify-center mx-auto text-white font-black">C</div>
            <p className="font-bold mt-2 text-[#0a1931]">Construction</p>
          </div>
          <div className="bg-white rounded-[20px] p-5 text-center shadow-sm">
            <div className="w-12 h-12 bg-yellow-400 rounded-[12px] flex items-center justify-center mx-auto text-white font-black">O</div>
            <p className="font-bold mt-2 text-[#0a1931]">Outside Catering</p>
          </div>

          {/* Cars Sale - SAME */}
          <Link href="/cars" className="bg-white rounded-[20px] p-5 text-center shadow-sm border border-black">
            <div className="w-12 h-12 bg-black rounded-[12px] flex items-center justify-center mx-auto">🚗</div>
            <p className="font-bold mt-2 text-[#0a1931]">Cars Sale</p>
            <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full mt-1 inline-block">NEW!</span>
          </Link>

          {/* Lands - ONLY THIS CHANGED to 0116982197 */}
          <Link href="/lands" className="bg-white rounded-[20px] p-5 text-center shadow-sm border-2 border-green-500">
            <div className="w-12 h-12 bg-green-100 rounded-[12px] flex items-center justify-center mx-auto">🏞️</div>
            <p className="font-bold mt-2 text-[#0a1931]">Lands</p>
            <span className="text-green-600 text-xs mt-1 inline-block">0116982197</span>
          </Link>
        </div>

        {/* Selling Land Box - ONLY THIS CHANGED to Send Money 0116982197 */}
        <Link href="/lands" className="mt-4 bg-white border-2 border-[#0a1931] rounded-[20px] p-5 text-center block">
          <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">LAND</span>
          <h3 className="font-black text-xl mt-2 text-[#0a1931]">Selling Land</h3>
          <p className="text-xs opacity-60 mt-1">Send Money 0116982197 • Seller 500 | Buyer 300 | Broker FREE</p>
        </Link>
      </div>

      {/* BOTTOM MENU - SAME */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center py-3">
        <span className="text-center text-sm font-bold">🏠<br/>Home</span>
        <span className="text-center text-sm">💼<br/>Jobs</span>
        <div className="w-12 h-12 bg-[#0a1931] rounded-full flex items-center justify-center text-white text-2xl">+</div>
        <Link href="/cars" className="text-center text-sm">🚗<br/>Cars</Link>
        <Link href="/lands" className="text-center text-sm">🏞️<br/>Lands</Link>
      </div>
    </div>
  );
}
