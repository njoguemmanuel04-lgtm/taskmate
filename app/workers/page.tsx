"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function WorkersPage() {
  const [workers, setWorkers] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('real_fundis') || '[]');
    setWorkers(saved);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4">
      <Link href="/" className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm">← Home</Link>
      <h1 className="font-bold text-xl mt-4">Workers - {workers.length} REAL</h1>
      <p className="text-sm text-slate-500">Only real fundis from Mwea</p>

      {workers.length === 0 ? (
        <div className="bg-white rounded-xl border p-8 text-center mt-6">
          <div className="text-6xl mb-4">👷</div>
          <h2 className="font-bold">No Real Fundis Yet - 0</h2>
          <Link href="/join" className="mt-4 inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-bold">➕ Join Now</Link>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {workers.map((w: any, i: number) => (
            <div key={i} className="bg-white p-4 rounded-xl border">
              <p className="font-bold">{w.name} - {w.skill}</p>
              <p className="text-sm">📞 {w.phone} | 📍 {w.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
