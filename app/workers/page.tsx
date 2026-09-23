"use client"
import Link from 'next/link';
export default function WorkersPage() {
  const workers: any[] = [];
  return (
    <div className="min-h-screen bg-[#f8fafc] p-4">
      <Link href="/admin" className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm">← Back</Link>
      <div className="bg-white rounded-xl border p-8 text-center mt-6">
        <div className="text-6xl mb-4">👷</div>
        <h2 className="font-bold">Workers - {workers.length} REAL</h2>
        <p className="text-sm text-slate-500 mt-2">5 demo deleted! Now 0 REAL fundis.</p>
        <p className="text-xs text-green-600 mt-2">Ready for real fundis from Mwea!</p>
      </div>
    </div>
  );
}
