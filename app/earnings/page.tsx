"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function EarningsPage() {
  const [tx, setTx] = useState<any[]>([]);
  const [conns, setConns] = useState<any[]>([]);

  useEffect(() => {
    setTx(JSON.parse(localStorage.getItem('mpesa_tx') || '[]'));
    setConns(JSON.parse(localStorage.getItem('connections') || '[]'));
  }, []);

  const total = tx.reduce((s, t) => s + (t.commission || 0), 0);
  const unlockTotal = tx.filter(t => t.type === 'UNLOCK').length * 50;

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm">← Home</Link>
        <h1 className="font-black text-2xl mt-4">💰 Your Earnings - CEO</h1>
        <p className="text-sm text-slate-500">M-PESA Till: Your Money</p>

        <div className="bg-green-600 text-white p-6 rounded-2xl mt-4 text-center">
          <p className="text-sm opacity-80">TOTAL EARNED TODAY</p>
          <p className="font-black text-4xl">KES {total}</p>
          <p className="text-xs mt-2">{tx.length} transactions</p>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-white border p-3 rounded-xl text-center">
            <p className="text-xs">Unlocks</p>
            <p className="font-black text-xl">KES {unlockTotal}</p>
            <p className="text-xs text-slate-500">{tx.filter(t=>t.type==='UNLOCK').length} x 50</p>
          </div>
          <div className="bg-white border p-3 rounded-xl text-center">
            <p className="text-xs">Jobs 10%</p>
            <p className="font-black text-xl">KES {total - unlockTotal}</p>
          </div>
          <div className="bg-white border p-3 rounded-xl text-center">
            <p className="text-xs">Connections</p>
            <p className="font-black text-xl">{conns.length}</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="font-bold">📜 M-PESA Transactions</h2>
          <div className="space-y-2 mt-2">
            {tx.length === 0? (
              <div className="bg-white border rounded-xl p-6 text-center">
                <p className="font-bold">No earnings yet?</p>
                <p className="text-sm">Go Home and unlock a fundi to test - you already have 1 Conn so check localStorage</p>
                <button onClick={()=>{
                  const all = JSON.parse(localStorage.getItem('mpesa_tx') || '[]');
                  if(all.length===0 && conns.length>0){
                    const fix = [{amount:50, commission:50, type:'UNLOCK', fundi: conns[0].fundi, date: conns[0].time}];
                    localStorage.setItem('mpesa_tx', JSON.stringify(fix));
                    setTx(fix);
                  }
                }} className="mt-3 bg-yellow-400 text-black px-4 py-2 rounded-xl font-bold text-xs">🔧 Fix My KES 50</button>
              </div>
            ) : tx.map((t,i)=>(
              <div key={i} className="bg-white p-3 rounded-xl border flex justify-between">
                <div>
                  <p className="font-bold text-sm">{t.type} - {t.fundi}</p>
                  <p className="text-xs text-slate-500">{t.date}</p>
                </div>
                <p className="font-black text-green-600">+{t.commission}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 mt-8">
          <Link href="/connections" className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold text-center">🔗 Connections</Link>
          <Link href="/" className="flex-1 bg-white border py-3 rounded-xl font-bold text-center">🏠 Home</Link>
        </div>
      </div>
    </div>
  );
}
