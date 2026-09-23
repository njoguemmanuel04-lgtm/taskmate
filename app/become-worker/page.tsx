import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#eef6ff]">
      {/* HEADER */}
      <header className="bg-white border-b-2 border-black p-4 flex justify-between items-center">
        <h1 className="font-black text-xl text-blue-700">TaskMate Kenya 🇰🇪</h1>
        <Link href="/workers" className="bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm border-2 border-black">
          👷 Workers
        </Link>
      </header>

      {/* HERO */}
      <div className="max-w-md mx-auto p-6 mt-8">
        <div className="bg-white rounded-[2rem] p-8 border-2 border-black shadow-[6px_6px_0px_0px_black]">
          <h1 className="text-4xl font-black leading-tight">
            Find Trusted Workers in <span className="text-blue-600">Mwea & Kenya</span> 🇰🇪
          </h1>
          <p className="text-gray-600 mt-4 font-medium">
            Plumbers, Electricians, Cleaners, Cooks - Pata fundi haraka!
          </p>

          {/* 3 BUTTONS */}
          <div className="mt-8 space-y-4">
            <Link href="/tasks/new" className="block bg-blue-600 text-white text-center py-4 rounded-full font-black text-lg border-2 border-black shadow-[4px_4px_0px_0px_black]">
              ➕ Post a Task - Free
            </Link>

            <Link href="/workers" className="block bg-yellow-400 text-black text-center py-4 rounded-full font-black text-lg border-2 border-black shadow-[4px_4px_0px_0px_black]">
              🔍 Find Tasks - Pata Kazi
            </Link>

            <Link href="/become-worker" className="block bg-black text-white text-center py-4 rounded-full font-black text-lg border-2 border-black shadow-[4px_4px_0px_0px_black]">
              👷 Join as Worker - Jiunge
            </Link>
          </div>

          <div className="mt-6 flex justify-center gap-2 text-sm font-bold">
            <span className="bg-green-100 px-3 py-1 rounded-full border border-black">✓ 4 Workers</span>
            <span className="bg-blue-100 px-3 py-1 rounded-full border border-black">✓ Mwea</span>
            <span className="bg-yellow-100 px-3 py-1 rounded-full border border-black">✓ M-Pesa</span>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="mt-6 bg-white rounded-2xl p-5 border-2 border-black">
          <h3 className="font-black">How it Works:</h3>
          <div className="mt-3 space-y-2 text-sm font-medium">
            <p>1️⃣ Post your task (plumbing, cleaning...)</p>
            <p>2️⃣ Workers in Mwea see it</p>
            <p>3️⃣ Call & Pay via M-Pesa 📱</p>
          </div>
        </div>
      </div>
    </div>
  );
}
