"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [workers, setWorkers] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('real_fundis') || '[]');
    setWorkers(saved);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-black text-2xl">TaskMate REAL - {workers.length} fundis</h1>
        <p className="text-slate-500 text-sm">Real fundis from Mwea - No fake data</p>

        <div className="flex gap-2 mt-4">
          <Link href="/join" className="bg-green-600 text-white px-5 py-3 rounded-xl font-bold">➕ Join as Fundi</Link>
          <Link href="/workers" className="bg-white border px-5 py-3 rounded-xl font-bold">👷 View {workers.length} REAL</Link>
        </div>

        {workers.length === 0 ? (
          <div className="bg-white rounded-xl border p-8 text-center mt-8">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="font-bold">No Real Fundis Yet - Be First!</h2>
            <p className="text-sm text-slate-500">Invite fundis from Mwea</p>
            <Link href="/join" className="mt-4 inline-block bg-slate-900 text-white px-6 py-3 rounded-xl">Join Now</Link>
          </div>
        ) : (
          <div className="mt-6">
            <h2 className="font-bold mb-3">🔥 {workers.length} REAL Fundis Available Now</h2>
            <div className="space-y-3">
              {workers.map((w: any, i: number) => (
                <div key={i} className="bg-white p-4 rounded-xl border flex justify-between items-center">
                  <div>
                    <p className="font-bold">{w.name} - {w.skill} ⭐ REAL</p>
                    <p className="text-sm">📞 {w.phone} | 📍 {w.location}</p>
                  </div>
                  <a href={`tel:${w.phone}`} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold">Call</a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
