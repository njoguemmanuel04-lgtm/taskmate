"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [workers, setWorkers] = useState<any[]>([]);
  const [unlocked, setUnlocked] = useState<number[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('real_fundis') || '[]');
    setWorkers(saved);
    setUnlocked(JSON.parse(localStorage.getItem('unlocked_fundis') || '[]'));
  }, []);

  const unlockContact = (index: number) => {
    if (!confirm('Pay KES 50 to unlock phone? You keep 50!')) return;
    const newUnlocked = [...unlocked, index];
    setUnlocked(newUnlocked);
    localStorage.setItem('unlocked_fundis', JSON.stringify(newUnlocked));

    const tx = { amount: 50, commission: 50, type: 'UNLOCK', fundi: workers[index].name, date: new Date().toLocaleString() };
    const allTx = JSON.parse(localStorage.getItem('mpesa_tx') || '[]');
    allTx.push(tx);
    localStorage.setItem('mpesa_tx', JSON.stringify(allTx));

    const conns = JSON.parse(localStorage.getItem('connections') || '[]');
    conns.push({ fundi: workers[index].name, phone: workers[index].phone, skill: workers[index].skill, time: new Date().toLocaleString(), status: 'UNLOCKED - Not yet called' });
    localStorage.setItem('connections', JSON.stringify(conns));

    alert('✅ Unlocked! Check Connections & Earnings');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-black text-2xl">TaskMate REAL - {workers.length} Fundis</h1>
        <p className="text-sm text-slate-500">Phone hidden - Pay 50 to unlock - No direct calls</p>

        <div className="grid grid-cols-3 gap-2 mt-4">
          <Link href="/join" className="bg-green-600 text-white py-3 rounded-xl font-bold text-center">➕ Join</Link>
          <Link href="/connections" className="bg-blue-600 text-white py-3 rounded-xl font-bold text-center">🔗 {JSON.parse(typeof window!== 'undefined'? localStorage.getItem('connections') || '[]' : '[]').length} Conn</Link>
          <Link href="/earnings" className="bg-slate-900 text-white py-3 rounded-xl font-bold text-center">💰 Earn</Link>
        </div>

        <div className="mt-6 space-y-3">
          {workers.length === 0? (
            <div className="bg-white p-8 rounded-xl border text-center">
              <p className="font-bold">No fundis yet - Be first!</p>
              <Link href="/join" className="mt-3 inline-block bg-green-600 text-white px-6 py-2 rounded-xl">Join Now</Link>
            </div>
          ) : workers.map((w: any, i: number) => {
            const isUnlocked = unlocked.includes(i);
            return (
              <div key={i} className="bg-white p-4 rounded-xl border shadow-sm">
                <p className="font-bold">{w.name} - {w.skill} ⭐ REAL</p>
                <p className="text-sm text-slate-600">📍 {w.location} | ✅ Verified</p>
                <p className="text-sm mt-1">📞 {isUnlocked? <b className="text-green-600">{w.phone}</b> : <span className="blur-sm">{w.phone}</span>} {!isUnlocked && <span className="text-xs text-red-500">🔒 Hidden</span>}</p>
                {isUnlocked? (
                  <div className="mt-3 space-y-2">
                    <a href={`tel:${w.phone}`} className="block bg-green-600 text-white py-3 rounded-xl font-bold text-center">📞 Call {w.phone}</a>
                    <a href={`https://wa.me/254${w.phone.slice(1)}?text=Hi ${w.name}, I found you on TaskMate`} target="_blank" className="block bg-green-500 text-white py-3 rounded-xl font-bold text-center">💬 WhatsApp</a>
                    <Link href="/pay" className="block bg-yellow-400 text-black py-3 rounded-xl font-bold text-center">💰 Pay Job - 10% yours</Link>
                  </div>
                ) : (
                  <button onClick={() => unlockContact(i)} className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold mt-3">🔓 Unlock Phone - KES 50</button>
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-slate-900 text-white p-4 rounded-xl mt-8 text-xs">
          <b>💰 Your Business:</b><br/>
          Unlock 50 KES + Job 10% + Listing 200/week = 3 incomes!
        </div>
      </div>
    </div>
  );
}
