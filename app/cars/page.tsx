"use client";
import { useState, useEffect } from "react";
export default function CarsPage(){
  const [make,setMake]=useState("");
  const [price,setPrice]=useState("");
  const [phone,setPhone]=useState("");
  const [loc,setLoc]=useState("");
  const [image,setImage]=useState("");
  const [cars,setCars]=useState<any[]>([]);
  const [showMpesaFor,setShowMpesaFor]=useState<number|null>(null);
  useEffect(()=>{
    const s=JSON.parse(localStorage.getItem("taskmate_cars")||"[]");
    setCars(s);
  },[]);
  const handleImage=(e:any)=>{
    const file=e.target.files[0];
    if(file){
      const reader=new FileReader();
      reader.onload=(ev:any)=>setImage(ev.target.result);
      reader.readAsDataURL(file);
    }
  };
  const submit=()=>{
    if(!make||!price||!phone||!image){alert("Add Picture, Car Name, Price, Phone"); return;}
    const newCar={id:Date.now(),make,price,phone,loc,image,status:"locked"};
    const updated=[newCar,...cars];
    localStorage.setItem("taskmate_cars",JSON.stringify(updated));
    setCars(updated);
    setMake("");setPrice("");setPhone("");setLoc("");setImage("");
    alert("✅ Car Posted FREE! Locked 🔒");
  };
  const requestUnlock=(id:number)=>{
    const updated=cars.map((c:any)=>c.id===id?{...c,status:"pending"}:c);
    localStorage.setItem("taskmate_cars",JSON.stringify(updated));
    setCars(updated);
    const car = cars.find((c:any)=>c.id===id);
    const msg = `CAR PAYMENT - I PAID!%0ACar: ${car?.make} - ${car?.price}%0ALocation: ${car?.loc}%0APlease check M-Pesa 0116982197%0ATime: ${new Date().toLocaleString()}`;
    window.open(`https://wa.me/254116982197?text=${msg}`, '_blank');
    setShowMpesaFor(null);
    alert("✅ Sent to Admin!");
  };
  return(
    <div className="max-w-md mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="font-black text-xl text-center">🚗 Cars For Sale - Embu</h1>
      <p className="text-center text-xs text-gray-500">Post FREE - Buyer pays 500 to unlock</p>
      <div className="bg-white p-4 rounded-xl border mt-4">
        <label className="font-bold">📸 Picture of Car</label>
        <input type="file" accept="image/*" onChange={handleImage} className="w-full mt-2 border rounded-lg p-2"/>
        {image && <img src={image} className="mt-2 w-full h-48 object-cover rounded-lg border"/>}
        <input value={make} onChange={e=>setMake(e.target.value)} placeholder="Car e.g Toyota Probox 2015" className="w-full border rounded-lg p-3 mt-3"/>
        <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price e.g Ksh 850,000" className="w-full border rounded-lg p-3 mt-3"/>
        <input value={loc} onChange={e=>setLoc(e.target.value)} placeholder="Location e.g Embu Town" className="w-full border rounded-lg p-3 mt-3"/>
        <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Owner Phone e.g 07..." className="w-full border rounded-lg p-3 mt-3"/>
        <button onClick={submit} className="w-full bg-[#0A1F44] text-white py-3 rounded-xl font-bold mt-4">Post Car FREE</button>
      </div>
      {cars.map((c:any)=>{
        const isLocked = c.status==="locked" ||!c.status;
        const isPending = c.status==="pending";
        const isUnlocked = c.status==="unlocked";
        return(
          <div key={c.id} className="border rounded-xl overflow-hidden bg-white mt-4 shadow-sm">
            <img src={c.image} className="w-full h-64 object-cover"/>
            <div className="p-3">
              <p className="font-bold">🚗 {c.make}</p>
              <p className="font-black text-green-700">{c.price}</p>
              <p className="text-xs text-gray-500">📍 {c.loc}</p>
              {isLocked && (
                <div className="mt-3 border-2 border-dashed border-black p-3 rounded-xl text-center">
                  <p className="font-black text-lg">🔒 NUMBER LOCKED 🔒</p>
                  {showMpesaFor===c.id?(
                    <div className="bg-yellow-50 p-3 rounded-lg mt-3 border border-yellow-300">
                      <p className="font-bold text-center">SEND MONEY</p>
                      <p className="font-black text-center text-xl text-green-700">Ksh 500 to 0116982197</p>
                      <button onClick={()=>requestUnlock(c.id)} className="w-full bg-green-600 text-white py-3 rounded-lg font-black mt-3">✅ I HAVE PAID - VERIFY ME</button>
                      <button onClick={()=>setShowMpesaFor(null)} className="w-full bg-gray-200 py-2 rounded-lg mt-2 text-sm">Cancel</button>
                    </div>
                  ):(
                    <button onClick={()=>setShowMpesaFor(c.id)} className="w-full bg-[#0A1F44] text-white py-3 rounded-xl font-black mt-3">🔓 Unlock Number - Pay 500</button>
                  )}
                </div>
              )}
              {isPending && (
                <div className="mt-3 bg-orange-100 p-3 rounded-xl text-center border border-orange-300">
                  <p className="font-bold text-orange-700">⏳ WAITING FOR ADMIN</p>
                </div>
              )}
              {isUnlocked && (
                <div className="mt-3 bg-green-50 p-3 rounded-xl border border-green-300">
                  <a href={`tel:${c.phone}`} className="block bg-green-600 text-white text-center py-3 rounded-xl font-black">📞 Call Owner: {c.phone}</a>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
