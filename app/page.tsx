"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';

const categories = [
  { name:'Cleaning', icon:'🧹', color:'bg-green-500' },
  { name:'Delivery', icon:'🚚', color:'bg-orange-500' },
  { name:'Repairs', icon:'🔧', color:'bg-red-500' },
  { name:'Plumbing', icon:'💧', color:'bg-blue-500' },
  { name:'Construction', icon:'👷', color:'bg-purple-600' },
  { name:'Outside Catering', icon:'👨‍🍳', color:'bg-yellow-500' },
  { name:'Tutoring', icon:'📚', color:'bg-teal-600' },
  { name:'Online Jobs', icon:'💻', color:'bg-indigo-600' },
  { name:'Other', icon:'•••', color:'bg-gray-400' },
  { name:'Electrical Services', icon:'⚡', color:'bg-pink-500' },
];

export default function HomePage() {
  const [workers, setWorkers] = useState<any[]>([]);
  const [unlocked, setUnlocked] = useState<number[]>([]);
  const [till, setTill] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setWorkers(JSON.parse(localStorage.getItem('real_fundis') || '[]'));
    setUnlocked(JSON.parse(localStorage.getItem('unlocked_fundis') || '[]'));
    setTill(localStorage.getItem('my_till') || '0116982197');
  }, []);

  const saveTill = () => {
    const n = prompt('YOUR M-PESA Till/Number:', till);
    if(!n) return;
    localStorage.setItem('my_till', n);
    setTill(n);
    alert(`✅ Till saved: ${n} - Real money to YOU!`);
  };

  const unlock = (i:number) => {
    if(!till){ saveTill(); return; }
    if(!confirm(`LIPA NA M-PESA\nSend KES 50 to:\n📱 ${till}\n\nTap OK after pay`)) return;
    const nu = [...unlocked, i];
    setUnlocked(nu);
    localStorage.setItem('unlocked_fundis', JSON.stringify(nu));
    alert(`✅ Unlocked! Paid to ${till}`);
  };

  const filtered = workers.filter(w => w.name?.toLowerCase().includes(search.toLowerCase()) || w.skill?.toLowerCase().includes(search.toLowerCase()) || w.location?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#f0f4f8] pb-20">
      {/* HEADER */}
      <div className="bg-[#0f2a54] text-white p-4 sticky top-0 z-20">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-400 p-2 rounded-lg text-[#0f2a54] font-black">🏠🔧</div>
            <span className="font-black text-xl">Task<span className="text-yellow-400">Mate</span></span>
          </div>
          <div className="flex gap-3">
            <button onClick={saveTill} className="bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-bold">💰 {till || 'Set Till'}</button>
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">🔔</div>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-xs opacity-70">Good morning,</p>
          <p className="font-bold">Emmanuel</p>
          <p className="text-xs opacity-60">Find the right help. Get it done.</p>
        </div>
        <div className="mt-3 bg-white rounded-2xl flex items-center p-3 gap-2">
          <span>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search for a service or job..." className="flex-1 text-black text-sm outline-none" />
          <span>🎛️</span>
        </div>
      </div>

      {/* TRUSTED BANNER */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] rounded-2xl p-4 text-white relative overflow-hidden">
          <div className="relative z-10">
            <p className="font-bold text-lg leading-tight">Trusted Services<br/>Across Kenya</p>
            <p className="text-xs mt-1 opacity-80">Skilled workers • Reliable clients<br/>• Secure payments</p>
            <Link href="/post-task" className="inline-block mt-3 bg-white text-[#1e3a8a] text-xs px-4 py-2 rounded-full font-bold">+ Post a Job</Link>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 bg-white/10">🏙️</div>
        </div>
      </div>

      {/* POPULAR CATEGORIES */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <p className="font-bold">Popular Categories</p>
          <Link href="/workers" className="text-xs text-blue-600">See All ›</Link>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {categories.map((c,i)=>(
            <Link key={i} href={`/workers?cat=${c.name}`} className="bg-white rounded-2xl p-3 flex flex-col items-center border shadow-sm">
              <div className={`${c.color} w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg`}>{c.icon}</div>
              <p className="text-[10px] font-bold mt-2 text-center leading-tight">{c.name}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* FEATURED WORKERS */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <p className="font-bold">Featured Workers - {workers.length}</p>
          <Link href="/workers" className="text-xs text-blue-600">See All ›</Link>
        </div>

        {workers.length===0? (
          <div className="bg-white rounded-2xl p-8 text-center border">
            <p className="font-bold">No fundis yet!</p>
            <p className="text-xs text-slate-500 mt-1">Be the first to join</p>
            <Link href="/join" className="inline-block mt-3 bg-[#0f2a54] text-white px-6 py-2 rounded-full text-sm font-bold">+ Join as Fundi</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((w:any,i:number)=>{
              const ok = unlocked.includes(i);
              return (
                <div key={i} className="bg-white rounded-2xl p-3 flex gap-3 border shadow-sm">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-xl">👨‍🔧</div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{w.name}</p>
                    <p className="text-xs text-slate-500">{w.skill} • {w.location}</p>
                    <p className="text-xs mt-1">⭐ 4.8 (32 reviews)</p>
                    <p className="text-xs font-bold mt-1">{ok? <span className="text-green-600">{w.phone}</span> : <span className="blur-[4px]">{w.phone}</span>} {ok? '' : '🔒'}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    {ok? (
                      <>
                        <a href={`tel:${w.phone}`} className="bg-[#0f2a54] text-white text-xs px-4 py-2 rounded-full font-bold text-center">Hire Now</a>
                        <a href={`https://wa.me/254${w.phone?.slice(1)}`} className="bg-green-500 text-white text-xs px-3 py-1 rounded-full text-center">WhatsApp</a>
                      </>
                    ) : (
                      <button onClick={()=>unlock(i)} className="bg-yellow-400 text-black text-xs px-4 py-2 rounded-full font-bold">🔓 KES 50</button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center p-3">
        <div className="flex flex-col items-center"><span>🏠</span><span className="text-[10px] font-bold">Home</span></div>
        <Link href="/jobs" className="flex flex-col items-center opacity-60"><span>💼</span><span className="text-[10px]">Jobs</span></Link>
        <Link href="/post-task" className="bg-[#0f2a54] w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl">+</Link>
        <Link href="/connections" className="flex flex-col items-center opacity-60"><span>💬</span><span className="text-[10px]">Messages</span></Link>
        <Link href="/earnings" className="flex flex-col items-center opacity-60"><span>👤</span><span className="text-[10px]">Profile</span></Link>
      </div>

      {/* TOP TILL BAR */}
      <div className="fixed top-0 right-0 left-0 bg-yellow-400 text-black text-[10px] text-center py-1 font-bold z-30">
        💰 M-PESA Till: {till} • Customers pay YOU directly • <button onClick={saveTill} className="underline">Change</button>
      </div>
      <div className="h-5"></div>
    </div>
  );
}
