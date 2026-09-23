"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
export default function HomePage() {
  const [workers, setWorkers] = useState<any[]>([]);
  const [unlocked, setUnlocked] = useState<number[]>([]);
  const [earnings, setEarnings] = useState(0);
  const [till, setTill] = useState('');
  useEffect(() => {
    setWorkers(JSON.parse(localStorage.getItem('real_fundis') || '[]'));
    setUnlocked(JSON.parse(localStorage.getItem('unlocked_fundis') || '[]'));
    setTill(localStorage.getItem('my_till') || '0720000000');
    const tx = JSON.parse(localStorage.getItem('mpesa_tx') || '[]');
    setEarnings(tx.reduce((s:number,t:any)=>s+(t.commission||0),0));
  }, []);
  const saveTill = () => {
    const newTill = prompt('Enter YOUR M-PESA Number / Till (Money goes to YOU):', till);
    if(!newTill) return;
    localStorage.setItem('my_till', newTill);
    setTill(newTill);
    alert(`✅ Saved! Customers pay to: ${newTill}`);
  };
  const unlock = (i:number) => {
    if(!till || till==='0720000000'){ saveTill(); return; }
    if(!confirm(`LIPA NA M-PESA\n\nSend KES 50 to:\n\n📱 ${till}\n\nCEO: Emmanuel\n\nTap OK after you pay!`)) return;
    const newU = [...unlocked, i];
    setUnlocked(newU);
    localStorage.setItem('unlocked_fundis', JSON.stringify(newU));
    const tx = {amount:50, commission:50, fundi:workers[i].name, date:new Date().toLocaleString(), till};
    const all = JSON.parse(localStorage.getItem('mpesa_tx') || '[]');
    all.push(tx);
    localStorage.setItem('mpesa_tx', JSON.stringify(all));
    setEarnings(earnings+50);
    alert(`✅ KES 50 to ${till} - REAL MONEY! Unlocked!`);
  };
  const share = () => {
    const t = `🔧 TaskMate Mwea! ${workers.length} Fundis! Pay KES 50 to ${till} unlock real fundi! 👉 https://taskmate-ebon.vercel.app/`;
    window.open(`https://wa.me/?text=${encodeURIComponent(t)}`, '_blank');
  };
  return (
    <div className="min-h-screen bg-[#f8fafc] p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-black text-2xl">TaskMate - {workers.length} Fundis</h1>
        <p className="text-xs">💰 Till: <b>{till}</b> <button onClick={saveTill} className="text-blue-600 underline">Change</button></p>
        <button onClick={share} className="w-full bg-[#25D366] text-white py-3 rounded-xl font-black mt-3">📲 Share WhatsApp</button>
        <button onClick={saveTill} className="w-full bg-yellow-400 text-black py-2 rounded-xl font-bold text-sm mt-2">⚙️ Set My M-PESA: {till}</button>
        <div className="grid grid-cols-3 gap-2 mt-4">
          <Link href="/join" className="bg-green-600 text-white py-3 rounded-xl font-bold text-center">➕ Join</Link>
          <Link href="/connections" className="bg-blue-600 text-white py-3 rounded-xl font-bold text-center">🔗 Conn</Link>
          <Link href="/earnings" className="bg-slate-900 text-white py-3 rounded-xl font-bold text-center">💰 {earnings}</Link>
        </div>
        <div className="mt-6 space-y-3">
          {workers.length===0? <div className="bg-white p-8 rounded-xl border text-center"><b>No fundis</b><br/><Link href="/join" className="mt-2 inline-block bg-green-600 text-white px-6 py-2 rounded-xl">Join First</Link></div> :
          workers.map((w:any,i:number)=>{
            const ok = unlocked.includes(i);
            return (
              <div key={i} className="bg-white p-4 rounded-xl border">
                <b>{w.name} - {w.skill} ⭐</b>
                <p className="text-sm text-slate-600">📍 {w.location}</p>
                <p className="text-sm">📞 {ok? <b className="text-green-600">{w.phone}</b> : <span className="blur-sm">{w.phone}</span>} {!ok && '🔒'}</p>
                {ok? <>
                  <a href={`tel:${w.phone}`} className="block bg-green-600 text-white py-3 rounded-xl font-bold text-center mt-3">📞 Call {w.phone}</a>
                  <a href={`https://wa.me/254${w.phone.slice(1)}`} target="_blank" className="block bg-green-500 text-white py-3 rounded-xl font-bold text-center mt-2">💬 WhatsApp</a>
                </> : <button onClick={()=>unlock(i)} className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold mt-3">🔓 Unlock - Pay 50 to {till}</button>}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
