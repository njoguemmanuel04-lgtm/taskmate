"use client";
import {useState} from "react";
export default function Plans(){
const [pay,setPay]=useState<any>(null);
const mpesa="0116982197";
const plans=[
{t:"Daily Try",p:50,d:"1 Day",c:["Visible 24hrs","2-3 Calls"],bg:"white",b:""},
{t:"Weekly Hustle",p:250,d:"7 Days",c:["Visible 7 days","TOP in search","15-20 Calls","Mwea+Ngurubani"],bg:"#e0f0ff",b:"2px solid blue"},
{t:"Monthly CEO",p:799,d:"30 Days",c:["Visible 30 days","ALWAYS TOP","80+ Calls","Verified badge","All Kirinyaga"],bg:"#fff9db",b:"2px solid gold"},
];
return(
<div style={{minHeight:"100vh",background:"#f5f7fa",padding:16,paddingBottom:80}}>
<div style={{display:"flex",alignItems:"center",gap:8}}><button onClick={()=>location.href='/'}>←</button><h1>💰 Plans</h1></div>
<p style={{marginTop:4}}>M-PESA: <b>{mpesa}</b></p>

{plans.map((x,i)=>(
<div key={i} style={{background:x.bg,border:x.b||"1px solid #eee",borderRadius:16,padding:16,marginTop:12}}>
<h2 style={{fontWeight:"bold"}}>{x.t} - KES {x.p}</h2><p style={{fontSize:12,color:"gray"}}>{x.d}</p>
<div style={{marginTop:8}}>{x.c.map((c,j)=><p key={j}>✓ {c}</p>)}</div>
<button onClick={()=>setPay(x)} style={{width:"100%",background:"#0a1931",color:"white",padding:12,borderRadius:20,marginTop:10,fontWeight:"bold"}}>Pay KES {x.p} via M-Pesa</button>
</div>
))}

{pay && (
<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",display:"grid",placeItems:"center",padding:16,zIndex:50}}>
<div style={{background:"white",borderRadius:20,padding:20,width:"100%",maxWidth:360}}>
<h2 style={{fontWeight:"bold",textAlign:"center"}}>Pay KES {pay.p}</h2>
<div style={{background:"#f5f7fa",borderRadius:12,padding:12,marginTop:12,textAlign:"center"}}>
<p style={{fontSize:12}}>Send to</p><h1 style={{fontWeight:"bold",fontSize:22}}>{mpesa}</h1>
<p style={{fontSize:12}}>Name: Emmanuel Njogu</p>
<button onClick={()=>{navigator.clipboard.writeText(mpesa);alert('Copied '+mpesa)}} style={{background:"#e0f0ff",padding:"6px 12px",borderRadius:20,marginTop:8,fontSize:12}}>📋 Copy Number</button>
</div>
<div style={{marginTop:12,fontSize:13,lineHeight:1.6}}>
<p>1. M-Pesa → Send Money</p>
<p>2. Enter: <b>{mpesa}</b></p>
<p>3. Amount: <b>{pay.p}</b></p>
<p>4. Enter PIN → Send</p>
</div>
<button onClick={()=>{window.open(`https://wa.me/254116982197?text=Hi, I paid KES ${pay.p} for ${pay.t}. My M-Pesa code is: `)}} style={{width:"100%",background:"#25D366",color:"white",padding:12,borderRadius:20,marginTop:12,fontWeight:"bold"}}>✅ I Have Paid - Verify on WhatsApp</button>
<button onClick={()=>setPay(null)} style={{width:"100%",padding:10,marginTop:8,color:"gray"}}>Cancel</button>
</div>
</div>
)}
</div>
)
}
