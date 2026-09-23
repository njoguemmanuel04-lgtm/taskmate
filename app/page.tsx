import Link from "next/link";
export default function Home(){
 return(
  <div className="min-h-screen bg-[#eef6ff]">
   <header className="bg-white border-b-2 border-black p-4 flex justify-between">
    <h1 className="font-black text-xl text-blue-700">TaskMate Kenya 🇰🇪</h1>
    <Link href="/workers" className="bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm border-2 border-black">👷 Workers</Link>
   </header>
   <div className="max-w-md mx-auto p-6 mt-6">
    <div className="bg-white rounded-[2rem] p-8 border-2 border-black shadow-[6px_6px_0px_0px_black]">
     <h1 className="text-4xl font-black">Find Trusted Workers in <span className="text-blue-600">Mwea & Kenya</span> 🇰🇪</h1>
     <p className="text-gray-600 mt-4 font-bold">Plumbers, Electricians, Cleaners - Pata fundi haraka!</p>
     <div className="mt-8 space-y-4">
      <Link href="/tasks/new" className="block bg-blue-600 text-white text-center py-4 rounded-full font-black text-lg border-2 border-black">➕ Post a Task - Free</Link>
      <Link href="/workers" className="block bg-yellow-400 text-black text-center py-4 rounded-full font-black text-lg border-2 border-black">🔍 Find Tasks - Pata Kazi</Link>
      <Link href="/become-worker" className="block bg-black text-white text-center py-4 rounded-full font-black text-lg border-2 border-black">👷 Join as Worker - Jiunge</Link>
     </div>
    </div>
   </div>
  </div>
 )
}
