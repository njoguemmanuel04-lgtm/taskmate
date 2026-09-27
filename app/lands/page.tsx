"use client";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Link from "next/link";

export default function LandsPage() {
  const [lands, setLands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchLands(); }, []);

  async function fetchLands() {
    setLoading(true);
    const { data } = await supabase.from("lands").select("*").order("created_at", { ascending: false });
    if (data) setLands(data);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#eef2f7] pb-20">
      <div className="bg-[#0a1931] text-white p-5 flex items-center gap-3">
        <Link href="/" className="text-2xl">←</Link>
        <h1 className="text-xl font-black">Lands - Send Money 0116982197</h1>
      </div>

      <div className="p-4">
        <div className="bg-green-50 border-2 border-green-600 rounded-[15px] p-4 text-center mb-4">
          <p className="font-black text-green-800 text-lg">🏞️ Selling Land in Kirinyaga</p>
          <p className="text-xs mt-1 font-bold">Send Money 0116982197 • Seller 500 | Buyer 300 | Broker FREE</p>
        </div>

        {loading? <p className="text-center mt-10">Loading from cloud...</p> : lands.length === 0? (
          <div className="text-center mt-10 bg-white p-10 rounded-[20px]">
            <p className="text-5xl">🏞️</p>
            <p className="font-bold mt-3">No lands yet - Cloud is empty</p>
            <p className="text-sm opacity-60 mt-1">Go to Supabase → lands table → Insert first land. It will be CLOUD forever!</p>
            <Link href="/" className="bg-[#0a1931] text-white px-6 py-3 rounded-full inline-block mt-4 font-bold">Back Home</Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {lands.map((land) => (
              <div key={land.id} className="bg-white rounded-[20px] overflow-hidden shadow-sm">
                {land.image_url && <img src={land.image_url} className="w-full h-48 object-cover" />}
                <div className="p-4">
                  <h3 className="font-black text-lg">{land.title || land.location}</h3>
                  <p className="text-sm opacity-70 mt-1">{land.location} • {land.size}</p>
                  <p className="font-black text-green-700 text-xl mt-2">KES {land.price}</p>
                  <a href={`tel:${land.phone}`} className="bg-green-600 text-white w-full block text-center py-3 rounded-full font-black mt-3">📞 Call {land.phone}</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center py-3">
        <Link href="/" className="flex flex-col items-center"><span>🏠</span><span className="text-xs">Home</span></Link>
        <Link href="/cars" className="flex flex-col items-center"><span>🚗</span><span className="text-xs">Cars</span></Link>
        <Link href="/lands" className="flex flex-col items-center font-bold"><span>🏞️</span><span className="text-xs">Lands</span></Link>
      </div>
    </div>
  );
}
