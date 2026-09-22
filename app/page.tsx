"use client";
import Link from "next/link";
export default function Home() {
return (
<div className="min-h-screen bg-[#eef6ff]">
<header className="bg-white border-b p-4 flex justify-between items-center">
<h1 className="font-black text-xl text-blue-900">TaskMate Kenya 🇰🇪</h1>
<div className="flex gap-2">
<Link href="/auth/login" className="border-2 border-blue-900 px-4 py-2 rounded-full font-bold text-sm">Log in</Link>
<Link href="/auth/signup" className="bg-yellow-400 px-4 py-2 rounded-full font-black text-sm">Sign up</Link>
</div>
</header>

<div className="text-center py-10 px-4">
<h2 className="text-4xl font-black text-blue-900 leading-tight">Kenya's Trusted Job Marketplace</h2>
<p className="mt-3 text-gray-600">Find skilled people • Get jobs done • Connect. Work. Earn. Thrive.</p>
<div className="flex gap-3 justify-center mt-6">
<Link href="/post-task" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold">Post a Task</Link>
<Link href="/tasks" className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-full font-black">Find Tasks</Link>
</div>
</div>

<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
<div className="bg-white rounded-2xl p-5 border"><h3 className="font-black">① Get jobs done</h3><p className="text-sm mt-2">Find skilled people in Nairobi, Mombasa, Kisumu</p><Link href="/tasks" className="block mt-4 bg-blue-600 text-white text-center py-2 rounded-full font-bold">Browse Tasks →</Link></div>
<div className="bg-blue-50 rounded-2xl p-5 border"><h3 className="font-black">② Categories</h3><div className="grid grid-cols-2 gap-2 mt-3"><Link href="/tasks" className="bg-yellow-300 p-2 rounded-full text-center font-bold text-xs">Cleaning</Link><Link href="/tasks" className="bg-yellow-300 p-2 rounded-full text-center font-bold text-xs">Delivery</Link><Link href="/tasks" className="bg-yellow-300 p-2 rounded-full text-center font-bold text-xs">Repairs</Link><Link href="/tasks" className="bg-yellow-300 p-2 rounded-full text-center font-bold text-xs">Plumbing</Link></div></div>
<div className="bg-white rounded-2xl p-5 border"><h3 className="font-black">③ Post a Job</h3><input placeholder="Job Title" className="w-full border rounded-lg p-2 mt-3"/><input placeholder="Location - e.g Nairobi" className="w-full border rounded-lg p-2 mt-2"/><Link href="/post-task" className="block mt-3 bg-yellow-400 text-center py-2 rounded-full font-black">Post Job →</Link></div>
<div className="bg-white rounded-2xl p-5 border"><h3 className="font-black">④ Skilled People Ready</h3><p className="text-xs bg-yellow-400 rounded-full text-center py-1 mt-3 font-bold">Verified • Experienced • Ready to Work</p><Link href="/workers" className="block mt-3 bg-blue-900 text-white text-center py-2 rounded-full font-bold">View Workers</Link></div>
<div className="bg-white rounded-2xl p-5 border"><h3 className="font-black">⑤ Reliable Workers</h3><p className="text-xs mt-2">Background-checked • Trusted • Professional</p><Link href="/workers" className="block mt-3 bg-green-600 text-white text-center py-2 rounded-full font-bold">Hire Now</Link></div>
<div className="bg-blue-50 rounded-2xl p-5 border"><h3 className="font-black">⑥ Available Jobs</h3><div className="bg-white p-2 rounded-lg mt-2 flex justify-between text-xs"><span>House Cleaning - KSH 1,800</span><Link href="/tasks" className="bg-yellow-400 px-3 py-1 rounded-full font-bold">Apply</Link></div><div className="bg-white p-2 rounded-lg mt-2 flex justify-between text-xs"><span>Delivery - KSH 950</span><Link href="/tasks" className="bg-yellow-400 px-3 py-1 rounded-full font-bold">Apply</Link></div></div>
<div className="bg-white rounded-2xl p-5 border"><h3 className="font-black">⑦ Earn Money</h3><p className="text-xs mt-2">Flexible shifts • Paid via M-Pesa</p><Link href="/auth/signup" className="block mt-3 bg-yellow-400 text-center py-2 rounded-full font-black">Start Earning →</Link></div>
<div className="bg-blue-900 rounded-2xl p-5 text-white"><h3 className="font-black text-xl">⑧ Download Now</h3><p className="text-xs mt-2 opacity-80">Safe • Local Jobs • Fast & Easy</p><div className="mt-4 bg-black py-2 rounded-lg text-center text-xs font-bold">Google Play & App Store Soon</div><p className="text-[10px] mt-3 text-center">Join 50,000+ Kenyans • 4.8★ Rating</p></div>
</div>
</div>
);
}
