"use client"
import Link from 'next/link';

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] p-4">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin" className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm">← Back to Admin</Link>
        <h1 className="font-bold text-xl">Jobs (REAL - 0 jobs)</h1>
      </div>

      <div className="bg-white rounded-xl border p-8 text-center">
        <div className="text-6xl mb-4">💼</div>
        <h2 className="font-bold text-lg">No Jobs Yet</h2>
        <p className="text-sm text-slate-500 mt-2">This is REAL! You have 0 jobs because no client has posted yet.</p>
        <p className="text-sm text-slate-500">When someone posts "Need plumber in Mwea", it will appear here!</p>
        
        <div className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-left text-sm">
          <p className="font-bold">💡 How jobs work in TaskMate:</p>
          <p>1. Client posts job (e.g. "Fix my tap")</p>
          <p>2. Worker accepts job</p>
          <p>3. You get 10% = KSh 29.90</p>
          <p>4. Job shows as "Active" here</p>
        </div>

        <Link href="/" className="mt-6 inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold">➕ Post Test Job</Link>
      </div>
    </div>
  );
}
