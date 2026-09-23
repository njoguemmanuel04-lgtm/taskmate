"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
export default function Subscription(){
const router=useRouter()
const [loading,setLoading]=useState("")
const mpesaNumber="0116982197"
const plans=[
{id:"daily",name:"Daily Try",price:50,days:"1 Day",color:"bg-gray-100 border",btn:"bg-gray-800",features:["Visible 24hrs","2-3 Calls"]},
{id:"weekly",name:"Weekly Hustle",price:250,days:"7 Days",color:"bg-blue-50 border-2 border-blue-500",btn:"bg-blue-600",features:["Visible 7 days","TOP in search","15-20 Calls","Mwea+Ngurubani"],pop:true},
{id:"monthly",name:"Monthly CEO",price:799,days:"30 Days",color:"bg-yellow-50 border-2 border-yellow-500",btn:"bg-[#0f2a54]",features:["Visible 30 days","ALWAYS TOP","80+ Calls","Verified badge","All Kirinyaga"],best:true},
]
const pay=(plan:any)=>{
setLoading(plan.id)
setTimeout(()=>{
alert(`Lipa KES ${plan.price} to ${mpesaNumber}\nPlan: ${plan.name}\nAfter paying send screenshot to WhatsApp ${mpesaNumber}`)
setLoading("")
},600)
}
return(
<div className="min-h-screen bg-[#f5f7fa] p-4">
<div className="flex gap-3 items-center"><button onClick={()=>router.back()} className="bg-white p-2 rounded-full">←</button><h1 className="font-black text-xl">💰 Plans</h1></div>
<p className="text-xs text-gray-500 mt-2">M-PESA: <b>{mpesaNumber}</b></p>
<div className="space-y-4 mt-6">
{plans.map((p:any)=>(
<div key={p.id} className={`${p.color} rounded-3xl p-5`}>
<div className="flex justify-between"><div><h3 className="font-black">{p.name}</h3><p className="text-xs text-gray-500">{p.days}</p></div><div className="text-right"><p className="font-black text-xl">KES {p.price}</p></div></div>
<div className="mt-3">{p.features.map((f:string,i:number)=><p key={i} className="text-xs">✓ {f}</p>)}</div>
<button onClick={()=>pay(p)} className={`w-full mt-4 ${p.btn} text-white p-3 rounded-full font-bold`}>{loading===p.id?"...":`Pay KES ${p.price} via M-Pesa`}</button>
</div>
))}
</div>
</div>
)
}
