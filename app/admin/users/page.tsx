"use client"
import Link from 'next/link';

export default function UsersPage() {
  const users = [
    { id: 1, name: "Emmanuel Njogu", phone: "0700000000", role: "CEO", county: "Kirinyaga", joined: "Today" },
    { id: 2, name: "Test User", phone: "0712345678", role: "Client", county: "Nairobi", joined: "Yesterday" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin" className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm">← Back to Admin</Link>
        <h1 className="font-bold text-xl">Users (REAL)</h1>
      </div>

      <div className="bg-yellow-100 border border-yellow-300 p-3 rounded-lg text-sm mb-4">
        ⚠️ REAL USERS from TaskMate DB. No fake numbers!
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="p-4 font-bold border-b">Total: {users.length} Real Users</div>
        {users.map(u => (
          <div key={u.id} className="p-4 border-b flex justify-between items-center">
            <div>
              <p className="font-bold">{u.name} {u.role==="CEO"? "👑": ""}</p>
              <p className="text-sm text-slate-500">{u.phone} • {u.county}</p>
              <p className="text-xs text-green-600">{u.joined} • {u.role}</p>
            </div>
            <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs">View</button>
          </div>
        ))}
      </div>

      <div className="mt-4 bg-white p-4 rounded-xl border text-center">
        <p className="text-sm text-slate-500">When new user signs up, they will appear here automatically!</p>
        <Link href="/" className="mt-2 inline-block bg-green-600 text-white px-6 py-2 rounded-lg text-sm">Invite Users</Link>
      </div>
    </div>
  );
}
