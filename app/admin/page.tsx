"use client"
import { useState } from 'react';

export default function SuperAdminDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  const stats = [
    { label: "Total Users", value: "1,250", growth: "12% from last month", color: "bg-blue-500", icon: "👥" },
    { label: "Workers", value: "750", growth: "15% from last month", color: "bg-green-600", icon: "👷" },
    { label: "Clients", value: "500", growth: "10% from last month", color: "bg-purple-600", icon: "👤" },
    { label: "Active Jobs", value: "185", growth: "18% from last month", color: "bg-orange-500", icon: "💼" },
    { label: "Today's Revenue", value: "KSh 24,500", growth: "22% from yesterday", color: "bg-green-500", icon: "$" },
    { label: "Monthly Revenue", value: "KSh 680,000", growth: "16% from last month", color: "bg-slate-900", icon: "📈" },
    { label: "Subscriptions", value: "820", growth: "14% from last month", color: "bg-pink-600", icon: "📦" },
    { label: "Completed Jobs", value: "1,430", growth: "20% from last month", color: "bg-blue-500", icon: "✅" },
  ];

  const counties = [
    { county: "Kirinyaga", workers: 85, clients: 120, jobs: 45, revenue: "KSh 92,500" },
    { county: "Nairobi", workers: 210, clients: 280, jobs: 120, revenue: "KSh 245,000" },
    { county: "Murang'a", workers: 70, clients: 95, jobs: 50, revenue: "KSh 68,000" },
    { county: "Nyeri", workers: 65, clients: 90, jobs: 42, revenue: "KSh 58,000" },
    { county: "Kiambu", workers: 120, clients: 160, jobs: 80, revenue: "KSh 130,000" },
    { county: "Nakuru", workers: 95, clients: 130, jobs: 65, revenue: "KSh 98,000" },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* MOBILE TOP BAR */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#0f172a] text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button onClick={()=>setMenuOpen(!menuOpen)} className="text-2xl">☰</button>
          <span className="font-bold">🤝 TaskMate</span>
        </div>
        <span className="text-sm">Emmanuel 👑</span>
      </div>

      {/* SIDEBAR */}
      <div className={`w-[280px] bg-[#0f172a] text-white border-r border-white/10 p-4 flex flex-col fixed lg:static inset-y-0 left-0 z-40 transform transition-transform lg:translate-x-0 ${menuOpen? 'translate-x-0' : '-translate-x-full'} lg:flex`}>
        <div className="flex items-center gap-2 mb-8 px-2 mt-12 lg:mt-0">
          <div className="text-3xl">🤝</div>
          <div>
            <h1 className="font-bold text-xl leading-none">TaskMate</h1>
            <p className="text-xs text-white/60">Work Made Easy</p>
          </div>
        </div>
        <div className="space-y-1 overflow-y-auto">
          <div className="bg-blue-600 rounded-lg px-4 py-3 flex items-center gap-3 font-medium">🏠 Dashboard</div>
          <div className="px-4 py-2.5 text-white/70 hover:bg-white/5 rounded-lg cursor-pointer">👥 Users</div>
          <div className="px-4 py-2.5 text-white/70 hover:bg-white/5 rounded-lg cursor-pointer">👷 Workers (750)</div>
          <div className="px-4 py-2.5 text-white/70 hover:bg-white/5 rounded-lg cursor-pointer">💼 Jobs (185)</div>
          <div className="px-4 py-2.5 text-white/70 hover:bg-white/5 rounded-lg cursor-pointer">📍 Counties</div>
          <div className="px-4 py-2.5 text-white/70 hover:bg-white/5 rounded-lg cursor-pointer">➕ Subscriptions</div>
          <div className="px-4 py-2.5 text-white/70 hover:bg-white/5 rounded-lg cursor-pointer">💳 Payments</div>
          <div className="px-4 py-2.5 text-white/70 hover:bg-white/5 rounded-lg cursor-pointer">💸 Payouts</div>
          <div className="px-4 py-2.5 text-white/70 hover:bg-white/5 rounded-lg cursor-pointer">📊 Reports</div>
          <div className="px-4 py-2.5 text-white/70 hover:bg-white/5 rounded-lg cursor-pointer">⭐ Reviews</div>
          <div className="px-4 py-2.5 text-white/70 hover:bg-white/5 rounded-lg cursor-pointer">💬 Complaints</div>
          <div className="px-4 py-2.5 text-white/70 hover:bg-white/5 rounded-lg cursor-pointer flex justify-between">🔔 Notifications <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">3</span></div>
          <div className="px-4 py-2.5 text-white/70 hover:bg-white/5 rounded-lg cursor-pointer">⚙️ Settings</div>
          <button onClick={()=>setMenuOpen(false)} className="lg:hidden w-full mt-4 bg-white/10 py-2 rounded">✕ Close</button>
        </div>
        <div className="mt-auto bg-white/5 rounded-xl p-4 flex items-center gap-3">
          <img src="https://i.pravatar.cc/100?img=12" className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-bold text-sm">Emmanuel Njogu</p>
            <p className="text-xs text-white/60">CEO / Super Admin</p>
            <p className="text-[10px] text-green-400">● Online</p>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 bg-[#f8fafc] text-slate-900 p-4 lg:p-6 overflow-auto mt-16 lg:mt-0">
        <div className="mb-6">
          <h1 className="text-xl lg:text-2xl font-bold">Welcome back, Emmanuel 👋</h1>
          <p className="text-slate-500 text-sm">Here's what's happening with TaskMate today.</p>
        </div>

        {/* STATS - NOW RESPONSIVE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm border flex gap-3">
              <div className={`w-12 h-12 ${s.color} rounded-lg flex items-center justify-center text-white text-xl shrink-0`}>{s.icon}</div>
              <div className="min-w-0">
                <p className="text-xs text-slate-500">{s.label}</p>
                <p className="font-bold text-lg truncate">{s.value}</p>
                <p className="text-[11px] text-green-600">↑ {s.growth}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2 bg-white rounded-xl p-4 shadow-sm border">
            <h3 className="font-bold mb-4">Platform Growth</h3>
            <div className="h-[200px] bg-gradient-to-t from-blue-50 to-transparent rounded flex items-end gap-1 px-2">
              {[20,40,30,50,45,60,55,70,60,80,75,90,85,100,95,110].map((h,i)=>(
                <div key={i} style={{height: `${h}%`}} className="flex-1 bg-blue-500 rounded-sm"></div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <h3 className="font-bold text-sm mb-3">Money Flow</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between p-2 bg-green-50 rounded"><span>👤 Client Pays</span><b>KSh 299</b></div>
              <div className="flex justify-between p-2 bg-blue-50 rounded"><span>🤝 Your Cut (10%)</span><b>KSh 29.90</b></div>
              <div className="flex justify-between p-2 bg-purple-50 rounded"><span>👷 Worker Gets</span><b>KSh 269.10</b></div>
            </div>
            <div className="mt-4 p-3 bg-slate-900 text-white rounded-lg text-center">
              <p className="text-xs">Monthly Revenue</p><p className="text-xl font-bold">KSh 680,000</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border overflow-x-auto">
          <h3 className="font-bold text-sm mb-3">Counties Overview</h3>
          <div className="min-w-[500px]">
            <div className="grid grid-cols-5 font-bold text-slate-500 text-xs py-2 border-b"> <span>County</span><span>Workers</span><span>Clients</span><span>Jobs</span><span>Revenue</span></div>
            {counties.map((c,i)=>(
              <div key={i} className="grid grid-cols-5 py-3 border-b border-slate-100 text-sm"><span>📍{c.county}</span><span>{c.workers}</span><span>{c.clients}</span><span>{c.jobs}</span><span className="font-medium">{c.revenue}</span></div>
            ))}
          </div>
        </div>

        <p className="text-center text-[11px] text-slate-400 mt-6">CEO Dashboard for Emmanuel Njogu • TaskMate Kenya 🇰🇪 • Super Admin Mode • Mobile Optimized</p>
      </div>
    </div>
  );
}
