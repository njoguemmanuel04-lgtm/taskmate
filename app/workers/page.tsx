"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function WorkersPage() {
  const [workers, setWorkers] = useState<any[]>([]);

  useEffect(() => {
    loadWorkers();
  }, []);

  const loadWorkers = () => {
    const saved = JSON.parse(localStorage.getItem('real_fundis') || '[]');
    // Remove duplicates by phone
    const unique = saved.filter((w: any, index: number, self: any[]) => 
      index === self.findIndex((t: any) => t.phone === w.phone)
    );
    setWorkers(unique);
    localStorage.setItem('real_fundis', JSON.stringify(unique));
  };

  const clearAll = () => {
    if (confirm('Delete ALL fundis?')) {
      localStorage.removeItem('real_fundis');
      setWorkers([]);
    }
  };

  const deleteOne = (index: number) => {
    const updated = workers.filter((_, i) => i !== index);
    localStorage.setItem('real_fundis', JSON.stringify(updated));
    setWorkers(updated);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4">
      <Link href="/" className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm">← Home</Link>
      
      <div className="flex justify-between items-center mt-4">
        <div>
          <h1 className="font-bold text-xl">Workers - {workers.length} REAL</h1>
          <p className="text-sm text-slate-500">Only real fundis from Mwea</p>
        </div>
        {workers.length > 0 && (
          <button onClick={clearAll} className="bg-red-100 text-red-600 px-3 py-2 rounded-lg text-xs font-bold">🗑️ Clear All</button>
        )}
      </div>

      {workers.length === 0 ? (
        <div className="bg-white rounded-xl border p-8 text-center mt-6">
          <div className="text-6xl mb-4">👷</div>
          <h2 className="font-bold">No Real Fundis Yet - 0</h2>
          <p className="text-sm text-slate-500 mt-2">Share JOIN link</p>
          <Link href="/join" className="mt-4 inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-bold">➕ Invite Fundi</Link>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {workers.map((w: any, i: number) => (
            <div key={i} className="bg-white p-4 rounded-xl border flex justify-between">
              <div>
                <p className="font-bold">{w.name} - {w.skill}</p>
                <p className="text-sm text-slate-600">📞 {w.phone} | 📍 {w.location}</p>
                <p className="text-xs text-slate-400">Joined: {w.joined}</p>
              </div>
              <button onClick={() => deleteOne(i)} className="text-red-500 text-xs">Delete</button>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-6 text-center">
        <Link href="/join" className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold inline-block">➕ Add More Fundis</Link>
      </div>
    </div>
  );
}
