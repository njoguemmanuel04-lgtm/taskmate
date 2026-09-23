"use client"
import { useState } from 'react';

export default function SuperAdminDashboard() {
  const stats = [
    { label: "Total Users", value: "1,250", growth: "12% from last month", color: "bg-blue-500", icon: "👥" },
    { label: "Workers", value: "750", growth: "15% from last month", color: "bg-green-600", icon: "👷" },
    { label: "Clients", value: "500", growth: "10% from last month", color: "bg-purple-600", icon: "👤" },
    { label: "Active Jobs", value: "185", growth: "18% from last month", color: "bg-orange-500", icon: "💼" },
    { label: "Today's Revenue", value: "KSh 24,500", growth: "22% from yesterday", color: "bg-green-500", icon: "$" },
    { label: "Monthly Revenue", value: "KSh 680,000", growth: "16% from last month", color: "bg-blue-900", icon: "📈" },
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
    { county: "Mombasa", workers: 60, clients: 85, jobs: 40, revenue: "KSh 72,000" },
    { county: "Others", workers: 45, clients: 60, jobs: 25, revenue: "KSh 40,000" },
  ];

  const services = [
    { name: "Cleaning", jobs: "320 jobs", percent: "17%", color: "bg-teal-500" },
    { name: "Delivery", jobs: "280 jobs", percent: "15%", color: "bg-orange-400" },
    { name: "Repairs", jobs: "210 jobs", percent: "11%", color: "bg-red-500" },
    { name: "Plumbing", jobs: "180 jobs", percent: "10%", color: "bg-blue-400" },
    { name: "Construction", jobs: "160 jobs", percent: "9%", color: "bg-purple-500" },
    { name: "Other", jobs: "140 jobs", percent: "8%", color: "bg-gray-500" },
  ];

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">
      {/* SIDEBAR */}
      <div className="w-[280px] bg-[#0f172a] border-r border-white/10 p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="text-3xl">🤝</div>
          <div>
            <h1 className="font-bold text-xl leading-none">TaskMate</h1>
            <p className="text-xs text-white/60">Work Made Easy</p>
          </div>
        </div>

        <div className="space-y-1">
          <div className="bg-blue-600 rounded-lg px-4 py-3 flex items-center gap-3 font-medium">🏠 Dashboard</div>
          <div className="px-4 py-2.5 text-white/70 hover:bg-white/5 rounded-lg cursor-pointer flex justify-between">👥 Users <span className="text-xs"></span></div>
          <div className="px-4 py-2.5 text-white/70 hover:bg-white/5 rounded-lg cursor-pointer">👷 Workers</div>
          <div className="px-4 py-2.5 text-white/70 hover:bg-white/5 rounded-lg cursor-pointer">💼 Jobs</div>
          <div className="px-4 py-2.5 text-white/70 hover:bg-white/5 rounded-lg cursor-pointer">📍 Counties</div>
          <div className="px-4 py-2.5 text-white/70 hover:bg-white/5 rounded-lg cursor-pointer">➕ Subscriptions</div>
          <div className="px-4 py-2.5 text-white/70 hover:bg-white/5 rounded-lg cursor-pointer">💳 Payments</div>
          <div className="px-4 py-2.5 text-white/70 hover:bg-white/5 rounded-lg cursor-pointer">💸 Payouts</div>
          <div className="px-4 py-2.5 text-white/70 hover:bg-white/5 rounded-lg cursor-pointer">📊 Reports</div>
          <div className="px-4 py-2.5 text-white/70 hover:bg-white/5 rounded-lg cursor-pointer">⭐ Reviews</div>
          <div className="px-4 py-2.5 text-white/70 hover:bg-white/5 rounded-lg cursor-pointer">💬 Complaints</div>
          <div className="px-4 py-2.5 text-white/70 hover:bg-white/5 rounded-lg cursor-pointer flex justify-between">🔔 Notifications <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">3</span></div>
          <div className="px-4 py-2.5 text-white/70 hover:bg-white/5 rounded-lg cursor-pointer">⚙️ Settings</div>
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
      <div className="flex-1 bg-[#f8fafc] text-slate-900 p-6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, Emmanuel 👋</h1>
            <p className="text-slate-500 text-sm">Here's what's happening with TaskMate today.</p>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span>🔔<sup className="bg-red-500 text-white rounded-full px-1 text-[10px]">3</sup></span>
            <span>⚙️</span>
            <span>⤴️</span>
            <span>Tue, 23 Sep 2025<br/>10:24 AM</span>
          </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {stats.map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm border flex gap-3">
              <div className={`w-12 h-12 ${s.color} rounded-lg flex items-center justify-center text-white text-xl`}>{s.icon}</div>
              <div>
                <p className="text-xs text-slate-500">{s.label}</p>
                <p className="font-bold text-lg">{s.value}</p>
                <p className="text-[11px] text-green-600">↑ {s.growth}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* PLATFORM GROWTH */}
          <div className="col-span-2 bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex justify-between mb-4">
              <h3 className="font-bold">Platform Growth</h3>
              <div className="flex gap-2 text-xs">
                <button className="px-2 py-1 rounded bg-slate-100">Today</button>
                <button className="px-2 py-1 rounded bg-slate-100">7 Days</button>
                <button className="px-3 py-1 rounded bg-blue-600 text-white">30 Days</button>
                <button className="px-2 py-1 rounded bg-slate-100">6 Months</button>
                <button className="px-2 py-1 rounded bg-slate-100">1 Year</button>
              </div>
            </div>
            <div className="h-[200px] bg-gradient-to-t from-blue-50 to-transparent rounded flex items-end gap-1 px-2">
              {[20,40,30,50,45,60,55,70,60,80,75,90,85,100,95,110,105,120,115,130].map((h,i)=>(
                <div key={i} className="flex-1 flex flex-col justify-end gap-1">
                  <div style={{height: `${h*0.6}%`}} className="bg-blue-500 rounded-sm"></div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 text-[11px] mt-2">
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500 rounded-full"></span>Users</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full"></span>Jobs</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-purple-500 rounded-full"></span>Revenue (KSh)</span>
            </div>
          </div>

          {/* TOP SERVICES & COUNTIES */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <div className="flex justify-between mb-3"><h3 className="font-bold text-sm">Top Service Categories</h3><span className="text-xs text-blue-600">View all →</span></div>
              <div className="space-y-2">
                {services.map((sv, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs bg-slate-50 p-2 rounded">
                    <div className="flex items-center gap-2"><span className={`w-6 h-6 ${sv.color} rounded flex items-center justify-center text-white text-[10px]`}>•</span>{sv.name}</div>
                    <span>{sv.jobs}</span>
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px]">{sv.percent}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <h3 className="font-bold text-sm mb-2">Counties Overview</h3>
            <div className="text-[11px]">
              <div className="grid grid-cols-5 font-bold text-slate-500 py-1 border-b"> <span>County</span><span>Workers</span><span>Clients</span><span>Jobs</span><span>Revenue</span></div>
              {counties.map((c,i)=>(
                <div key={i} className="grid grid-cols-5 py-2 border-b border-slate-100"><span className="flex gap-1">📍{c.county}</span><span>{c.workers}</span><span>{c.clients}</span><span>{c.jobs}</span><span className="font-medium">{c.revenue}</span></div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <h3 className="font-bold text-sm">Money Flow</h3>
              <p className="text-[11px] text-slate-500 mb-3">Client payment → TaskMate → Worker</p>
              <div className="flex justify-between items-center text-xs">
                <div className="text-center"><div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto">👤</div><p className="mt-1">Client Pays<br/><b>KSh 299</b><br/><span className="text-[10px] text-slate-500">(in-app)</span></p></div>
                <span>→</span>
                <div className="text-center"><div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto">🤝</div><p className="mt-1">TaskMate Commission<br/><b>10%</b><br/><span className="text-[10px]">KSh 29.90</span></p></div>
                <span>→</span>
                <div className="text-center"><div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto">👷</div><p className="mt-1">Worker Gets<br/><b>KSh 269.10</b></p></div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <h3 className="font-bold text-sm">Revenue Breakdown</h3>
              <div className="flex items-center gap-4 mt-2">
                <div className="w-20 h-20 rounded-full border-[8px] border-blue-500 border-t-orange-400 border-r-green-500 flex items-center justify-center text-[10px] font-bold">KSh 680k<br/>Total</div>
                <div className="text-xs space-y-1"><p>🔵 Subscriptions 62%</p><p>🟢 Commission 24%</p><p>🟠 Other 14%</p></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <h3 className="font-bold text-sm mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <button className="bg-blue-600 text-white text-xs py-2.5 rounded-lg">👤 Add New User →</button>
              <button className="bg-green-600 text-white text-xs py-2.5 rounded-lg">💼 Manage Jobs →</button>
              <button className="bg-purple-600 text-white text-xs py-2.5 rounded-lg">📊 View Reports →</button>
              <button className="bg-orange-500 text-white text-xs py-2.5 rounded-lg">🔔 Send Notification →</button>
            </div>
          </div>
        </div>

        <p className="text-center text-[11px] text-slate-400 mt-6">CEO Dashboard for Emmanuel Njogu • TaskMate Kenya 🇰🇪 • Super Admin Mode</p>
      </div>
    </div>
  );
}
