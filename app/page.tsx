"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#eef2f7] pb-20">
      {/* HEADER */}
      <div className="bg-[#0a1931] text-white p-5 rounded-b-[30px]">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-black">TaskMate</h1>
            <p className="text-sm opacity-70 mt-1">Kirinyaga • Find help. Get it done.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-white text-black px-4 py-2 rounded-full font-bold text-sm">
              KES 50
            </div>
            <span className="text-2xl">🔔</span>
          </div>
        </div>

        <div className="bg-white rounded-full p-2 flex items-center mt-5">
          <input placeholder="Search..." className="flex-1 px-4 text-black outline-none bg-transparent" />
          <button className="bg-[#0a1931] text-white px-6 py-3 rounded-full font-bold">Search</button>
        </div>

        <div className="bg-[#2d6bff] rounded-[20px] p-5 mt-5">
          <h2 className="text-xl font-black">Trusted Services Across Kenya</h2>
          <p className="text-sm opacity-90 mt-1">Skilled workers • Secure payments</p>
          <Link href="/jobs" className="bg-white text-black inline-block px-5 py-2.5 rounded-full font-black mt-3">+ Post a Job</Link>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-black text-xl text-[#0a1931]">Popular Categories</h2>
          <Link href="/jobs" className="text-[#2d6bff] text-sm">See All</Link>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-6 rounded-[20px] flex flex-col items-center shadow-sm">
            <div className="w-12 h-12 bg-[#00d084] rounded-xl flex items-center justify-center text-white font-bold text-xl">C</div>
            <p className="font-bold mt-3">Cleaning</p>
          </div>
          <div className="bg-white p-6 rounded-[20px] flex flex-col items-center shadow-sm">
            <div className="w-12 h-12 bg-[#ff7a00] rounded-xl flex items-center justify-center text-white font-bold text-xl">D</div>
            <p className="font-bold mt-3">Delivery</p>
          </div>
          <div className="bg-white p-6 rounded-[20px] flex flex-col items-center shadow-sm">
            <div className="w-12 h-12 bg-[#ff2d2d] rounded-xl flex items-center justify-center text-white font-bold text-xl">R</div>
            <p className="font-bold mt-3">Repairs</p>
          </div>
          <div className="bg-white p-6 rounded-[20px] flex flex-col items-center shadow-sm">
            <div className="w-12 h-12 bg-[#2d8cff] rounded-xl flex items-center justify-center text-white font-bold text-xl">P</div>
            <p className="font-bold mt-3">Plumbing</p>
          </div>
          <div className="bg-white p-6 rounded-[20px] flex flex-col items-center shadow-sm">
            <div className="w-12 h-12 bg-[#a259ff] rounded-xl flex items-center justify-center text-white font-bold text-xl">C</div>
            <p className="font-bold mt-3">Construction</p>
          </div>
          <div className="bg-white p-6 rounded-[20px] flex flex-col items-center shadow-sm">
            <div className="w-12 h-12 bg-[#ffbe00] rounded-xl flex items-center justify-center text-white font-bold text-xl">O</div>
            <p className="font-bold mt-3 text-sm text-center">Outside Catering</p>
          </div>
          <Link href="/cars" className="bg-white p-6 rounded-[20px] flex flex-col items-center shadow-sm border-2 border-black">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-xl">🚗</div>
            <p className="font-black mt-3">Cars Sale</p>
            <p className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full mt-1">NEW!</p>
          </Link>
          <Link href="/lands" className="bg-white p-6 rounded-[20px] flex flex-col items-center shadow-sm border-2 border-green-600">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-xl">🏞️</div>
            <p className="font-black mt-3">Lands</p>
            <p className="text-[10px] bg-green-600 text-white px-2 py-0.5 rounded-full mt-1 font-bold">0116982197</p>
          </Link>
        </div>

        <Link href="/lands" className="bg-white border-2 border-[#0a6b2a] rounded-[20px] p-5 mt-4 flex flex-col items-center text-center block">
          <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-bold">LAND</span>
          <h3 className="font-black text-xl mt-2">Selling Land</h3>
          <p className="text-xs mt-1 font-bold">Send Money 0116982197 • Seller 500 | Buyer 300 | Broker FREE</p>
        </Link>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center py-3 px-2">
        <Link href="/" className="flex flex-col items-center"><span>🏠</span><span className="text-xs font-bold">Home</span></Link>
        <Link href="/jobs" className="flex flex-col items-center"><span>💼</span><span className="text-xs">Jobs</span></Link>
        <Link href="/jobs" className="w-12 h-12 bg-[#0a1931] rounded-full flex items-center justify-center text-white text-2xl">+</Link>
        <Link href="/cars" className="flex flex-col items-center"><span>🚗</span><span className="text-xs">Cars</span></Link>
        <Link href="/lands" className="flex flex-col items-center"><span>🏞️</span><span className="text-xs">Lands</span></Link>
      </div>
    </div>
  );
}
