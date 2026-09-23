"use client";
export default function Jobs(){
 const go = (p:string) => location.href=p;
 const handleApply = (job:string) => {
   const sub = localStorage.getItem("subscribed");
   if(sub !== "true"){
     if(confirm("To apply for "+job+"\n\nYou need subscription KES 50/week\n\nGo to subscription?")){
       go('/subscription');
     }
     return;
   }
   alert("✅ Applied for "+job+"\nClient will contact you!");
 };
 return(
 <div className="min-h-screen bg-[#eef2f7] p-5">
   <div className="flex gap-3 mb-4">
     <button onClick={()=>go('/')} className="bg-white w-9 h-9 rounded-full">←</button>
     <h1 className="font-bold text-xl">Available Jobs</h1>
   </div>
   <div className="bg-white rounded-xl p-4 mb-3">
     <p className="font-bold">House Cleaning - Westlands</p>
     <p className="text-xs text-gray-500">KES 2,500 • 2 hrs ago</p>
     <button onClick={()=>handleApply('House Cleaning')} className="mt-2 bg-[#0a1f44] text-white px-4 py-2 rounded-full text-xs">Apply</button>
   </div>
   <div className="bg-white rounded-xl p-4 mb-3">
     <p className="font-bold">Plumbing Fix - Karen</p>
     <p className="text-xs text-gray-500">KES 1,500 • 5 hrs ago</p>
     <button onClick={()=>handleApply('Plumbing Fix')} className="mt-2 bg-[#0a1f44] text-white px-4 py-2 rounded-full text-xs">Apply</button>
   </div>
   <div className="bg-white rounded-xl p-4">
     <p className="font-bold">Delivery - CBD</p>
     <p className="text-xs text-gray-500">KES 800 • 1 day ago</p>
     <button onClick={()=>handleApply('Delivery')} className="mt-2 bg-[#0a1f44] text-white px-4 py-2 rounded-full text-xs">Apply</button>
   </div>
 </div>
 );
}
