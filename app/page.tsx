"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#eef6ff]">
      <header className="bg-white border-b p-4 flex justify-between items-center">
        <h1 className="font-black text-xl text-blue-600">TaskMate 🇰🇪</h1>
        <div className="flex gap-2">
          <Link href="/workers" className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold text-sm">👷 Workers</Link>
          <Link href="/admin" className="bg-black text-white px-4 py-2 rounded-lg text-sm">🔒 Admin</Link>
          <Link href="/auth/login" className="border-2 border-black px-4 py-2 rounded-lg text-sm">Login</Link>
        </div>
      </header>

      <div className="text-center py-16 px-4">
        <h2 className="text-5xl font-black text-blue-900">Find Help in Mwea</h2>
        <p className="mt-4 text-gray-600 text-lg">Post a job or hire skilled workers near you. Fast. Cheap. Trusted.</p>
        <div className="flex gap-4 justify-center mt-8">
          <Link href="/post-task" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-black text-lg">+ Post a Job</Link>
          <Link href="/workers" className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-black text-lg">👷 Hire Worker</Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 p-4 pb-20">
        <div className="bg-white rounded-2xl p-6 border-2 border-black">
          <h3 className="font-black text-xl">1. Post Job</h3>
          <p className="text-gray-600 mt-2">Tell us what you need - Electric, Cooking, Cleaning etc.</p>
          <Link href="/post-task" className="mt
