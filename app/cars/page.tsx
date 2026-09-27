"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function CarsPage(){
  const [make,setMake]=useState("");
  const [price,setPrice]=useState("");
  const [phone,setPhone]=useState("");
  const [loc,setLoc]=useState("");
  const [file,setFile]=useState<any>(null);
  const [cars,setCars]=useState<any[]>([]);
  const [showMpesaFor,setShowMpesaFor]=useState<number|null>(null);
  const [loading,setLoading]=useState(false);

  const fetchCars=async()=>{
    const {data}=await supabase.from("taskmate_cars").select("*").order("created_at",{ascending:false});
    if(data) setCars(data);
  }
  useEffect(()=>{fetchCars()},[]);

  const submit=async()=>{
    if(!make||!price||!phone||!file){alert("Add Picture, Car, Price, Phone"); return;}
    setLoading(true);
    try{
      const fileName = Date.now()+"_"+file.name.replace(/[^a-zA-Z0-9.]/g,"_");
      const {error:upErr}=await supabase.storage.from("cars-images").upload(fileName,file);
      if(upErr) throw upErr;
      const {data}=supabase.storage.from("cars-images").getPublicUrl(fileName);
      const {error}=await supabase.from("taskmate_cars").insert([{make,price,phone,loc,image:data.publicUrl,status:"locked"}]);
      if(error) throw error;
      setMake("");setPrice("");setPhone("");setLoc("");setFile(null);
      (document.getElementById("fileInput") as any).value="";
      fetchCars();
      alert("✅ Car Posted to CLOUD! Never disappears!");
    }catch(e:any){alert(e.message)}
    setLoading(false);
  };

  const requestUnlock=async(id:number)=>{
    await supabase.from("taskmate_cars").update({status:"pending"}).eq("id",id);
    fetchCars();
    const car = cars.find((c:any)=>c.id===id);
    const msg = `CAR PAYMENT - I PAID Ksh 500! Car: ${car?.make} Price: ${car?.price} Check M-Pesa 0116982197`;
    window.open(`https://wa.me/254116982197?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return(
    <div className="max-w-md mx-auto p-4 bg-gray-50 min-h-screen pb-20">
      <h1 className="font-black text-xl text-center">🚗 Cars - CLOUD SAVED</h1>
      <p className="text-center text-xs text-green-600 font-bold">Pictures saved forever in cloud ✅</p>
      <div className="bg-white p-4 rounded-xl border mt-4 shadow-sm">
        <input id="fileInput" type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0])} className="w-full border p-2 rounded"/>
        <input value={make} onChange={e=>setMake(e.target.value)} placeholder="Car e.g Toyota Probox" className="w-full border p-3 rounded mt-3"/>
        <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price Ksh e.g 850,000" className="w-full border p-3 rounded mt-3"/>
        <input value={loc} onChange={e=>setLoc(e.target.value)} placeholder="Location e.g Embu" className="w-full border p-3 rounded mt-3"/>
        <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone e.g 07..." className="w-full border p-3 rounded mt-3"/>
        <button onClick={submit} disabled={loading} className="w-full bg-[#0A1F44] text-white py-3 rounded-xl font-black mt-4">{loading?"Uploading to Cloud...":"Post to Cloud - FREE"}</button>
      </div>

      <div className="mt-6">
        <h2 className="font-bold">Available Cars ({cars.length})</h2>
        {cars.map((c:any)=>(
          <div key={c.id} className="border rounded-xl overflow-hidden bg-white mt-4 shadow-sm">
            <img src={c.image} className="w-full h-64 object-cover"/>
            <div className="p-3">
              <p className="font-bold text-lg">{c.make}</p>
              <p className="font-black text-green-700 text-xl">{c.price}</p>
              <p className="text-xs text-gray-500">📍 {c.loc}</p>
              {c.status==="locked" && (showMpesaFor===c.id?(
                <div className="bg-yellow-50 p-3 rounded-xl mt-3 border-2 border-yellow-400">
                  <p className="font-black text-center">Lipa Na M-PESA</p>
                  <p className="font-black text-center text-green-700 text-lg">Ksh 500 to 0116982197</p>
                  <p className="text-xs text-center">Paybill? Use Send Money</p>
                  <button onClick={()=>requestUnlock(c.id)} className="w-full bg-green-600 text-white py-3 rounded-xl font-black mt-2">✅ I HAVE PAID - Unlock</button>
                  <button onClick={()=>setShowMpesaFor(null)} className="w-full text-xs mt-2">Cancel</button>
                </div>
              ):<button onClick={()=>setShowMpesaFor(c.id)} className="w-full bg-[#0A1F44] text-white py-3 rounded-xl font-black mt-3">🔓 Unlock Contact - Pay 500</button>)}
              {c.status==="pending" && <p className="text-orange-600 font-bold mt-3 text-center bg-orange-50 py-2 rounded">⏳ Waiting Admin to Verify Payment</p>}
              {c.status==="unlocked" && <a href={`tel:${c.phone}`} className="block bg-green-600 text-white text-center py-3 rounded-xl font-black mt-3 animate-pulse">📞 Call Seller: {c.phone}</a>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
