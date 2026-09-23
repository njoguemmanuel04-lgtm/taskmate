"use client"
import { useState } from 'react';
import Link from 'next/link';

export default function JoinPage() {
  const [name, setName] = useState('');
  const [skill, setSkill] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Mwea');
  const [done, setDone] = useState(false);

  const handleJoin = () => {
    if (!name || !skill || !phone) {
      alert('Fill all fields!');
      return;
    }
    // Save REAL fundi to localStorage
    const fundis = JSON.parse(localStorage.getItem('real_fundis') || '[]');
    fundis.push({ name, skill, phone, location, joined: new Date().toLocaleDateString() });
    localStorage.setItem('real_fundis', JSON.stringify(fundis));
    setDone(true);
  };

  if (done) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-8 text-center max-w-sm w-full border">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="font-bold text-xl">Karibu {name}!</h2>
          <p className="text-sm text-slate-600 mt-2">You are now a REAL fundi in TaskMate!</p>
          <p className="text-sm mt-4 bg-green-100 p-3 rounded-lg">Skill: {skill}<br/>Phone: {phone}<br/>Location: {location}</p>
          <Link href="/workers" className="mt-6 block bg-slate-900 text-white py-3 rounded-lg font-bold">See Workers → Now 1 REAL!</Link>
          <Link href="/" className="mt-2 block text-sm text-slate-500">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] p-4 text-white">
      <Link href="/" className="text-sm bg-white/10 px-4 py-2 rounded-lg">← Home</Link>
      <h1 className="text-2xl font-bold mt-6">Join as Fundi 👷</h1>
      <p className="text-sm text-white/60">Mwea to Kenya - Get jobs daily!</p>

      <div className="mt-6 space-y-4 bg-white/5 p-5 rounded-xl border border-white/10">
        <div>
          <label className="text-sm">Your Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="John Kamau" className="w-full mt-1 bg-white text-black px-4 py-3 rounded-lg"/>
        </div>
        <div>
          <label className="text-sm">Your Skill</label>
          <select value={skill} onChange={e=>setSkill(e.target.value)} className="w-full mt-1 bg-white text-black px-4 py-3 rounded-lg">
            <option value="">Select skill</option>
            <option>Plumber</option>
            <option>Electrician</option>
            <option>Carpenter</option>
            <option>Mason</option>
            <option>Painter</option>
            <option>Cleaner</option>
            <option>Gardener</option>
          </select>
        </div>
        <div>
          <label className="text-sm">Phone (M-Pesa)</label>
          <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="0712345678" className="w-full mt-1 bg-white text-black px-4 py-3 rounded-lg"/>
        </div>
        <div>
          <label className="text-sm">Location</label>
          <input value={location} onChange={e=>setLocation(e.target.value)} className="w-full mt-1 bg-white text-black px-4 py-3 rounded-lg"/>
        </div>
        <button onClick={handleJoin} className="w-full bg-green-600 py-3 rounded-lg font-bold mt-4">✅ Join TaskMate - REAL</button>
        
        <p className="text-xs text-white/40 text-center mt-3">Real data - No demo. Your data will show in Workers (0 real) → 1 real</p>
      </div>
    </div>
  );
}
