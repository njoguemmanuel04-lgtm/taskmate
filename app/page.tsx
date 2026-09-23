"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [workers, setWorkers] = useState<any[]>([]);
  const [unlocked, setUnlocked] = useState<number[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('real_fundis') || '[]');
    setWorkers(saved);
    const unlockSaved = JSON.parse(localStorage.getItem('unlocked_fundis') || '[]');
    setUnlocked(unlockSaved);
  }, []);

  const unlockContact = (index: number) => {
    if (confirm('Pay KES 50 to unlock phone? (M-PESA to YOUR Till)\n\nYou keep 50, then see phone')) {
      const newUnlocked = [...unlocked, index];
      setUnlocked(newUnlocked);
      localStorage.setItem('unlocked_fundis', JSON.stringify(newUnlocked));
      
      // Save earning
      const tx = { amount: 50, commission: 50, type: 'UNLOCK', date: new Date().toLocaleString() };
      const allTx = JSON.parse(localStorage.getItem('mpesa_tx') || '[]');
      allTx.push(tx);
      localStorage.setItem('mpesa_tx', JSON.stringify(allTx));
      
      alert('✅ Paid! Phone unlocked!');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="font-black text-2xl">TaskMate REAL - {workers.length}</h1>
          <Link href="/earnings" className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">💰 KES Earnings</Link>
        </div>
        <p className="text-slate-500 text-sm">Pay KES 50 to unlock contact - No direct calls!</p>

        <div className="flex gap-2 mt-4">
          <Link href="/join" className="bg-green-600 text-white px-5 py-3 rounded-xl font-bold flex-1 text-center">➕ Join as Fundi</Link>
          <Link href="/workers" className="bg-white border px-5 py-3 rounded-xl font-bold">👷 {workers.length} REAL</Link>
        </div>

        {workers.length === 0 ? (
          <div className="bg-white rounded-xl border p-8 text-center mt-8">
            <h2 className="font-bold">No Fundis - Be First!</h2>
            <Link href="/join" className="mt-4 inline-block bg-slate-900 text-white px-6 py-3 rounded-xl">Join Now</Link>
          </div>
        ) : (
          <div className="mt-6">
            <h2 className="font-bold mb-3">🔥 {workers.length} REAL Fundis - Phone Hidden!</h2>
            <div className="space-y-3">
              {workers.map((w: any, i: number) => {
                const isUnlocked = unlocked.includes(i);
                return (
                  <div key={i} className="bg-white p-4 rounded-xl border">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold">{w.name} - {w.skill} ⭐ REAL</p>
                        <p className="text-sm">📍 {w.location} | ✅ Verified</p>
                        <p className="text-sm mt-1">
                          📞 {isUnlocked ? <b className="text-green-600">{w.phone}</b> : <span className="blur-sm select-none">{w.phone}</span>}
                          {!isUnlocked && <span className="text-xs text-red-500 ml-2">🔒 Hidden</span>}
                        </p>
                      </div>
                    </div>
                    
                    {isUnlocked ? (
                      <a href={`tel:${w.phone}`} className="w-full bg-green-600 text-white py-3 rounded-xl font-bold mt-3 block text-center">📞 Call Now {w.phone}</a>
                    ) : (
                      <button onClick={() => unlockContact(i)} className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold mt-3">
                        🔓 Unlock Phone - Pay KES 50
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="bg-slate-900 text-white p-4 rounded-xl mt-8 text-xs">
          <p className="font-bold">🛡️ How you make money:</p>
          <p>• Customer pays 50 to unlock → You keep 50</p>
          <p>• Customer pays job 1000 via Pay → You keep 100 (10%)</p>
          <p>• Fundi pays 200/week to be listed</p>
          <p className="mt-2 text-yellow-300">= 3 incomes! No direct calls!</p>
        </div>
      </div>
    </div>
  );
}
