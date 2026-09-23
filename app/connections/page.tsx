"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ConnectionsPage() {
  const [connections, setConnections] = useState<any[]>([]);

  useEffect(() => {
    setConnections(JSON.parse(localStorage.getItem('connections') || '[]'));
  }, []);

  const updateStatus = (index: number, newStatus: string) => {
    const updated = [...connections];
    updated[index].status = newStatus;
    setConnections(updated);
    localStorage.setItem('connections', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm">← Home</Link>
        <h1 className="font-black text-2xl mt-4">🔗 Customer Connections</h1>
        <p className="text-sm text-slate-500">{connections.length} customers unlocked fundis</p>

        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-white border p-3 rounded-xl text-center">
            <p className="text-xs">Unlocked</p>
            <p className="font-black text-xl">{connections.length}</p>
          </div>
          <div className="bg-green-100 p-3 rounded-xl text-center">
            <p className="text-xs">From Unlock</p>
            <p className="font-black text-xl">KES {connections.length * 50}</p>
          </div>
          <div className="bg-yellow-100 p-3 rounded-xl text-center">
            <p className="text-xs">Pending</p>
            <p className="font-black text-xl">{connections.filter(c=>c.status.includes('UNLOCKED')).length}</p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {connections.length === 0? (
            <div className="bg-white border rounded-xl p-8 text-center">
              <p className="font-bold">No connections yet</p>
              <p className="text-sm text-slate-500">When customer pays 50 to unlock, it shows here</p>
            </div>
          ) : (
            connections.map((c, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border">
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold">{c.fundi} - {c.skill}</p>
                    <p className="text-sm">📞 {c.phone}</p>
                    <p className="text-xs text-slate-500">{c.time}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full h-fit ${c.status.includes('DONE')? 'bg-green-100 text-green-700' : c.status.includes('CALLED')? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>{c.status}</span>
                </div>

                <div className="flex gap-2 mt-3">
                  <button onClick={() => updateStatus(i, 'CALLED - Talking')} className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-xs font-bold">📞 Called</button>
                  <button onClick={() => updateStatus(i, 'JOB DONE - Collect 10%')} className="flex-1 bg-green-600 text-white py-2 rounded-lg text-xs font-bold">✅ Job Done</button>
                  <a href={`tel:${c.phone}`} className="flex-1 bg-slate-900 text-white py-2 rounded-lg text-xs font-bold text-center">Call Fundi</a>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="bg-slate-900 text-white p-4 rounded-xl mt-8 text-xs">
          <p className="font-bold">💰 How to use this page:</p>
          <p>1. Customer unlocks → Shows here</p>
          <p>2. You call fundi: "Umeitwa? Customer ali-unlock"</p>
          <p>3. After job: Mark Job Done → Go to /pay to collect 10%</p>
          <p className="mt-2 text-yellow-300">This is your CEO dashboard!</p>
        </div>

        <div className="flex gap-2 mt-4">
          <Link href="/earnings" className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold text-center">💰 Earnings</Link>
          <Link href="/" className="flex-1 bg-white border py-3 rounded-xl font-bold text-center">🏠 Home</Link>
        </div>
      </div>
    </div>
  );
}
