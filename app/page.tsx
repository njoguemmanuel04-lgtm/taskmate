"use client";
import Link from "next/link";
export default function Home(){
return(
<div className="min-h-screen bg-[#eef6ff]">
<header className="bg-white border-b p-4 flex justify-between items-center">
<h1 className="font-black text-xl text-blue-700">TaskMate Kenya 🇰🇪</h1>
<div className="flex gap-2">
<Link href="/workers" className="bg-green-500 text-white px-3 py-2 rounded-lg font-bold text-sm">👷 Workers</Link>
<Link href="/auth/login" className="border-2 border-blue-600 text-blue-700 px-3 py-2 rounded-lg font-bold text-sm">Log in</Link>
<Link href="/auth/signup" className="bg-yellow-400 text-black px-3 py-2 rounded-lg font-bold text-sm">Sign up</Link>
</div>
</header>

<div className="text-center py-12 px-4">
<h2 className="text-4xl md:text-5xl font-black text-blue-900 leading-tight">Kenya's Trusted Job<br/>Marketplace</h2>
<p className="mt-4 text-gray-600 text-lg">Find skilled people • Get jobs done • Connect. Work. Earn. Thrive.</p>
<div className="flex gap-3 justify-center mt-8">
<Link href="/post-task" className="bg-blue-600 text-white px-8 py-4 rounded-full font-black text-lg">Post a Task</Link>
<Link href="/tasks" className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-full font-black text-lg">Find Tasks</Link>
</div>
</div>

<div className="max-w-5xl mx-auto p-4 space-y-4 pb-20">

<div className="bg-white rounded-3xl p-6 border-2 border-black">
<h3 className="font-black text-xl">① Get jobs done</h3>
<p className="text-gray-600 mt-2">Find skilled people in Nairobi, Mombasa, Kisumu, Mwea, Nakuru</p>
<Link href="/tasks" className="mt-4 block bg-blue-600 text-white text-center py-3 rounded-full font-bold">Browse Tasks →</Link>
</div>

<div className="bg-white rounded-3xl p-6 border-2 border-black">
<h3 className="font-black text-xl">② Categories</h3>
<div className="grid grid-cols-2 gap-3 mt-4">
<Link href="/workers?skill=Cleaning" className="bg-yellow-400 text-center py-3 rounded-full font-bold">Cleaning</Link>
<Link href="/workers?skill=Delivery" className="bg-yellow-400 text-center py-3 rounded-full font-bold">Delivery</Link>
<Link href="/workers?skill=Repairs" className="bg-yellow-400 text-center py-3 rounded-full font-bold">Repairs</Link>
<Link href="/workers?skill=Plumbing" className="bg-yellow-400 text-center py-3 rounded-full font-bold">Plumbing</Link>
<Link href="/workers?skill=Electric" className="bg-green-400 text-center py-3 rounded-full font-bold">👷 Electric</Link>
<Link href="/workers?skill=Cooking" className="bg-green-400 text-center py-3 rounded-full font-bold">👩‍🍳 Cooking</Link>
</div>
</div>

<div className="bg-white rounded-3xl p-6 border-2 border-black">
<h3 className="font-black text-xl">③ For Workers</h3>
<p className="text-gray-600 mt-2">Are you a skilled worker? Join TaskMate and get hired across Kenya!</p>
<div className="flex gap-3 mt-4">
<Link href="/workers" className="flex-1 bg-green-500 text-white text-center py-3 rounded-full font-bold">View Workers</Link>
<Link href="/admin" className="flex-1 bg-black text-white text-center py-3 rounded-full font-bold">🔒 Admin</Link>
</div>
</div>

</div>
<footer className="text-center p-6 text-gray-500 text-sm">TaskMate Kenya © 2026 - From Mwea to all Kenya 🇰🇪</footer>
</div>
)}
