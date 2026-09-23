"use client";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");

  const go = (path: string) => {
    window.location.href = path;
  };

  const handleSearch = () => {
    if (search.trim()) go(`/jobs?search=${search}`);
    else go('/jobs');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* HEADER */}
      <div className="bg-white p-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">T</div>
          <div>
            <p className="font-bold text-blue-600 leading-none">Taskmate</p>
            <p className="text-xs text-gray-500">Nairobi, Kenya</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={()=>go('/messages')} className="text-gray-600">💬</button>
          <button onClick={()=>go('/profile')} className="text-gray-600">👤</button>
        </div>
      </div>

      {/* SEARCH */}
      <div className="p-4 bg-white">
        <div className="flex gap-2">
          <input 
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            placeholder="Search for any service..."
            className="flex-1 p-3 bg-gray-100 rounded-xl outline-none"
            onKeyDown={(e)=> e.key==='Enter' && handleSearch()}
          />
          <button onClick={handleSearch} className="bg-blue-600 text-white px-5 rounded-xl">🔍</button>
        </div>
      </div>

      {/* POST A JOB BANNER - BUTTON FIXED */}
      <div className="p-4">
        <div onClick={()=>go('/post-job')} className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-5 text-white flex justify-between items-center cursor-pointer">
          <div>
            <h2 className="font-bold text-lg">Post a Job</h2>
            <p className="text-sm opacity-90">Find trusted local help in minutes</p>
            <p className="mt-2 bg-white text-blue-600 px-3 py-1 rounded-full text-sm inline-block font-bold">Post now →</p>
          </div>
          <div className="text-4xl">👷</div>
        </div>
      </div>

      {/* CATEGORIES - ALL BUTTONS FIXED FOREVER */}
      <div className="p-4 bg-white mt-2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold">Popular Categories</h3>
          <button onClick={()=>go('/jobs')} className="text-blue-600 text-sm">See All {'>'}</button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div onClick={()=>go('/jobs?category=Cleaning')} className="bg-gray-50 p-4 rounded-xl text-center cursor-pointer hover:bg-blue-50">
            <div className="text-2xl mb-1">🧹</div><p className="text-sm font-medium">Cleaning</p>
          </div>
          <div onClick={()=>go('/jobs?category=Delivery')} className="bg-gray-50 p-4 rounded-xl text-center cursor-pointer hover:bg-blue-50">
            <div className="text-2xl mb-1">📦</div><p className="text-sm font-medium">Delivery</p>
          </div>
          <div onClick={()=>go('/jobs?category=Repairs')} className="bg-gray-50 p-4 rounded-xl text-center cursor-pointer hover:bg-blue-50">
            <div className="text-2xl mb-1">🔧</div><p className="text-sm font-medium">Repairs</p>
          </div>
          <div onClick={()=>go('/jobs?category=Plumbing')} className="bg-gray-50 p-4 rounded-xl text-center cursor-pointer hover:bg-blue-50">
            <div className="text-2xl mb-1">🚿</div><p className="text-sm font-medium">Plumbing</p>
          </div>
          <div onClick={()=>go('/jobs?category=Construction')} className="bg-gray-50 p-4 rounded-xl text-center cursor-pointer hover:bg-blue-50">
            <div className="text-2xl mb-1">🏗️</div><p className="text-sm font-medium">Construction</p>
          </div>
          <div onClick={()=>go('/jobs?category=Catering')} className="bg-gray-50 p-4 rounded-xl text-center cursor-pointer hover:bg-blue-50">
            <div className="text-2xl mb-1">🍲</div><p className="text-sm text-xs font-medium">Outside Catering</p>
          </div>
        </div>
      </div>

      {/* TOP PROVIDERS LINK */}
      <div className="p-4 bg-white mt-2">
        <div className="flex justify-between items-center">
          <h3 className="font-bold">Top Providers</h3>
          <button onClick={()=>go('/providers')} className="text-blue-600 text-sm">See All {'>'}</button>
        </div>
        <div className="mt-3 p-4 bg-gray-50 rounded-xl text-center text-gray-500 text-sm">
          Providers coming soon - Post a job to see workers!
        </div>
      </div>

      {/* BOTTOM NAV - ALL BUTTONS FIXED FOREVER */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-2">
        <button onClick={()=>go('/')} className="flex flex-col items-center text-blue-600">
          <span>🏠</span><span className="text-xs font-bold">Home</span>
        </button>
        <button onClick={()=>go('/jobs')} className="flex flex-col items-center text-gray-500">
          <span>💼</span><span className="text-xs">Jobs</span>
        </button>
        <button onClick={()=>go('/post-job')} className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl -mt-4">+</button>
        <button onClick={()=>go('/messages')} className="flex flex-col items-center text-gray-500">
          <span>💬</span><span className="text-xs">Messages</span>
        </button>
        <button onClick={()=>go('/profile')} className="flex flex-col items-center text-gray-500">
          <span>👤</span><span className="text-xs">Profile</span>
        </button>
      </div>
    </div>
  );
}
