"use client";
export default function Page(){
return(
<div>
<div style={{background:"#0a1f44",padding:"20px",borderRadius:"0 0 30px 30px"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<b style={{color:"white",fontSize:22}}>TaskMate</b>
<div style={{display:"flex",gap:8,alignItems:"center"}}>
<span style={{background:"white",padding:"6px 12px",borderRadius:20,fontWeight:"bold"}}>KES 50 ⭐</span>
<span style={{fontSize:22}}>🔔</span>
</div>
</div>
<p style={{color:"#a0aec0",marginTop:20,marginBottom:0}}>Good morning,</p>
<h1 style={{color:"white",fontSize:32,marginTop:0,fontWeight:"bold"}}>Emmanuel</h1>
</div>

<div style={{padding:20}}>
<div onClick={()=>location.href="/land"} style={{background:"white",border:"2px solid #0a1f44",padding:20,borderRadius:16,textAlign:"center",cursor:"pointer"}}>
<div style={{fontSize:30}}>🌍</div>
<b>Selling Land - Fast</b>
<div style={{color:"green",fontSize:12,marginTop:6,fontWeight:"bold"}}>TILL 1754910 | Seller 500 Buyer 300 Broker FREE</div>
<div style={{background:"#0a1f44",color:"white",padding:10,borderRadius:10,marginTop:10,fontWeight:"bold"}}>POST LAND NOW</div>
</div>

<p style={{textAlign:"center",marginTop:20,color:"gray",fontSize:12}}>More categories coming after this works ✅</p>
</div>
</div>
)
}
