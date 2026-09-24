"use client";
export default function Page(){
return(
<div>
<div style={{background:"#0a1f44",padding:20}}>
<div style={{display:"flex",justifyContent:"space-between"}}>
<b style={{color:"white"}}>TaskMate</b>
<button style={{color:"white"}}>KES 50 ⭐ 🔔</button>
</div>
<p style={{color:"gray",marginTop:20}}>Good morning,</p>
<h1 style={{color:"white",fontSize:30}}>Emmanuel</h1>
</div>
<div style={{padding:20}}>
<div onClick={()=>location.href="/land"} style={{border:"1px solid black",padding:20,borderRadius:16,textAlign:"center"}}>
<div>🌍</div>
<b>Selling Land</b>
<div style={{color:"green",fontSize:12}}>TILL 1754910 Seller 500 | Buyer 300</div>
</div>
</div>
</div>
)
}
