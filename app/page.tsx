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
  const [mpesaNumber, setMpesaNumber] = useState('0116982197');
  const [search, setSearch] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setWorkers(JSON.parse(localStorage.getItem('real_fundis') || '[]'));
    setUnlocked(JSON.parse(localStorage.getItem('unlocked_fundis') || '[]'));
    setMpesaNumber(localStorage.getItem('my_till') || '0116982197');
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.get('admin') === '1' || localStorage.getItem('is_owner') === 'yes'){
      setIsAdmin(true);
    }
  }, []);

  const enableAdmin = () => {
    const taps = parseInt(localStorage.getItem('logo_taps') || '0') + 1;
    localStorage.setItem('logo_taps', taps.toString());
    if(taps >= 5){
      localStorage.setItem('is_owner', 'yes');
      setIsAdmin(true);
      alert('✅ Owner Mode ON!');
    }
  };

  const saveMpesa = () => {
    const n = prompt('YOUR M-PESA Number (Send Money):', mpesaNumber);
    if(!n) return;
    localStorage.setItem('my_till', n);
    setMpesaNumber(n);
    alert(`✅ Saved: ${n}`);
  };

  const unlock = (i:number) => {
    if(!confirm(`SEND MONEY\n\nSend KES 50 to:\n📱 ${mpesaNumber}\n\nVia M-PESA Send Money\n\nAfter sending, tap OK to unlock!`)) return;
    const nu = [...unlocked, i];
    setUnlocked(nu);
    localStorage.setItem('unlocked_fundis', JSON.stringify(nu));
  };

  const filtered = workers.filter(w =>
    w.name?.toLowerCase().includes(search.toLowerCase()) ||
    w.skill?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f0f4f8] pb-20">
      <div className="bg-[#0f2a54] text-white p-4 sticky top-0 z-20">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2" onClick={enableAdmin}>
            <div className="bg-yellow-400 p-2 rounded-lg text-[#0f2a54] font-black">🏠🔧</div>
            <span className="font-black text-xl">Task<span className="text-yellow-400">Mate</span></span>
          </div>
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">🔔</div>
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
        {isAdmin && (
          <div className="mt-3 bg-yellow-400 text-black text-xs p-2 rounded-lg flex justify-between">
            <span>💰 Send Money: {mpesaNumber} (Owner Only)</span>
            <button onClick={saveMpesa} className="underline font-bold">Change</button>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] rounded-2xl p-4 text-white">
          <p className="font-bold text-lg leading-tight">Trusted Services<br/>Across Kenya</p>
          <p className="text-xs mt-1 opacity-80">Skilled workers • Reliable clients • Secure payments</p>
          <Link href="/post-task" className="inline-block mt-3 bg-white text-[#1e3a8a] text-xs px-4 py-2 rounded-full font-bold">+ Post a Job</Link>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <p className="font-bold">Popular Categories</p>
          <span className="text-xs text-blue-600">See All ›</span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {categories.map((c,i)=>(
            <div key={i} className="bg-white rounded-2xl p-3 flex flex-col items-center border shadow-sm">
              <div className={`${c.color} w-10 h-10 rounded-xl flex items-center justify-center text-white`}>{c.icon}</div>
              <p className="text-[10px] font-bold mt-2 text-center leading-tight">{c.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4">
        <p className="font-bold mb-3">Featured Workers - {workers.length}</p>
        <div className="space-y-3">
          {filtered.map((w:any,i:number)=>{
            const ok = unlocked.includes(i);
            return (
              <div key={i} className="bg-white rounded-2xl p-3 flex gap-3 border shadow-sm">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">👨‍🔧</div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{w.name}</p>
                  <p className="text-xs text-slate-500">{w.skill} • {w.location}</p>
                  <p className="text-xs mt-1">⭐ 4.8 • Available</p>
                </div>
                <div className="flex flex-col gap-2 justify-center">
                  {ok? (
                    <a href={`tel:${w.phone}`} className="bg-green-600 text-white text-xs px-4 py-2 rounded-full font-bold text-center">📞 Call</a>
                  ) : (
                    <button onClick={()=>unlock(i)} className="bg-[#0f2a54] text-white text-xs px-5 py-2.5 rounded-full font-bold">Hire Now</button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center p-3">
        <div className="flex flex-col items-center"><span>🏠</span><span className="text-[10px] font-bold">Home</span></div>
        <div className="flex flex-col items-center opacity-60"><span>💼</span><span className="text-[10px]">Jobs</span></div>
        <div className="bg-[#0f2a54] w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl">+</div>
        <div className="flex flex-col items-center opacity-60"><span>💬</span><span className="text-[10px]">Messages</span></div>
        <div className="flex flex-col items-center opacity-60"><span>👤</span><span className="text-[10px]">Profile</span></div>
      </div>
    </div>
  );
}
