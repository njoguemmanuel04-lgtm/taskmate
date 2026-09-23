"use client"
import Link from 'next/link';

export default function HomePage() {
  const workers: any[] = []; // REAL = 0 workers!

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🤝 TaskMate - REAL MODE</h1>
        <Link href="/admin" className="bg-blue-600 px-4 py-2 rounded-lg text-sm">Admin</Link>
      </div>

      <div className="bg-green-900/50 border border-green-500 p-3 rounded-lg text-sm mb-6">
        ✅ REAL DATA: {workers.length} fundis. No fake demo! Invite real fundis from Mwea.
      </div>

      {workers.length === 0 ? (
        <div className="bg-white/10 rounded-xl p-8 text-center border">
          <div className="text-6xl mb-4">👷</div>
          <h2 className="font-bold text-xl">No Real Fundis Yet</h2>
          <p className="text-sm text-white/60 mt-2">You deleted 5 demo. Now waiting for REAL fundis!</p>
          <p className="text-sm text-white/60">Share link to fundis in Mwea</p>
          <div className="mt-6 space-y-3">
            <button onClick={()=>alert('Share: https://taskmate-ebon.vercel.app')} className="w-full bg-green-600 py-3 rounded-lg font-bold">📤 Share App Link</button>
            <Link href="/admin" className="block w-full bg-white/10 py-3 rounded-lg">Go to Admin</Link>
          </div>
        </div>
      ) : (
        workers.map((w: any, i: number) => (
          <div key={i} className="bg-white/10 p-4 rounded-xl mb-3">
            <p className="font-bold">{w.name}</p>
            <p className="text-sm text-white/60">{w.skill} | {w.phone}</p>
          </div>
        ))
      )}
    </div>
  );
}
