"use client";
export default function Home(){
const go=(p:string)=>{location.href=p};
return(
<div style={{minHeight:"100vh",background:"#eef2f7"}}>
<div style={{background:"#0a1931",padding:16,borderRadius:"0 0 24px 24px"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",color:"white"}}>
<div><h1 style={{fontWeight:"bold",fontSize:20}}>TaskMate</h1><p style={{fontSize:12,opacity:.7}}>Kirinyaga • Find help. Get it done.</p></div>
<div style={{display:"flex",gap:8,alignItems:"center"}}>
<button onClick={()=>go('/subscription')} style={{background:"white",color:"black",padding:"8px 12px",borderRadius:20,fontWeight:"bold",fontSize:12}}>KES 50</button>
<span>🔔</span>
</div>
</div>

<div style={{background:"white",borderRadius:24,padding:8,display:"flex",marginTop:16}}>
<input placeholder="Search..." style={{flex:1,border:"none",outline:"none",paddingLeft:12}}/>
<button style={{background:"#0a1931",color:"white",padding:"8px 16px",borderRadius:20}}>Search</button>
</div>

<div style={{background:"#2f6bff",borderRadius:16,padding:16,marginTop:16,color:"white"}}>
<h2 style={{fontWeight:"bold"}}>Trusted Services Across Kenya</h2>
<p style={{fontSize:12}}>Skilled workers • Secure payments</p>
<button onClick={()=>go('/post')} style={{background:"white",color:"black",padding:"6px 12px",borderRadius:20,marginTop:8,fontWeight:"bold"}}>+ Post a Job</button>
</div>
</div>

<div style={{padding:16}}>
<div style={{display:"flex",justifyContent:"space-between"}}><h3 style={{fontWeight:"bold"}}>Popular Categories</h3><span onClick={()=>go('/jobs')} style={{color:"blue",fontSize:12}}>See All</span></div>

<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginTop:12}}>
<div onClick={()=>go('/jobs')} style={{background:"white",borderRadius:16,padding:16,textAlign:"center"}}><div style={{background:"#00d26a",width:40,height:40,borderRadius:12,margin:"0 auto",display:"grid",placeItems:"center",color:"white"}}>C</div><p style={{fontSize:12,fontWeight:"bold",marginTop:8}}>Cleaning</p></div>
<div onClick={()=>go('/jobs')} style={{background:"white",borderRadius:16,padding:16,textAlign:"center"}}><div style={{background:"#ff6a00",width:40,height:40,borderRadius:12,margin:"0 auto",display:"grid",placeItems:"center",color:"white"}}>D</div><p style={{fontSize:12,fontWeight:"bold",marginTop:8}}>Delivery</p></div>
<div onClick={()=>go('/jobs')} style={{background:"white",borderRadius:16,padding:16,textAlign:"center"}}><div style={{background:"#ff2e2e",width:40,height:40,borderRadius:12,margin:"0 auto",display:"grid",placeItems:"center",color:"white"}}>R</div><p style={{fontSize:12,fontWeight:"bold",marginTop:8}}>Repairs</p></div>
<div onClick={()=>go('/jobs')} style={{background:"white",borderRadius:16,padding:16,textAlign:"center"}}><div style={{background:"#2f80ff",width:40,height:40,borderRadius:12,margin:"0 auto",display:"grid",placeItems:"center",color:"white"}}>P</div><p style={{fontSize:12,fontWeight:"bold",marginTop:8}}>Plumbing</p></div>
<div onClick={()=>go('/jobs')} style={{background:"white",borderRadius:16,padding:16,textAlign:"center"}}><div style={{background:"#a855f7",width:40,height:40,borderRadius:12,margin:"0 auto",display:"grid",placeItems:"center",color:"white"}}>C</div><p style={{fontSize:12,fontWeight:"bold",marginTop:8}}>Construction</p></div>
<div onClick={()=>go('/jobs')} style={{background:"white",borderRadius:16,padding:16,textAlign:"center"}}><div style={{background:"#eab308",width:40,height:40,borderRadius:12,margin:"0 auto",display:"grid",placeItems:"center",color:"white"}}>O</div><p style={{fontSize:12,fontWeight:"bold",marginTop:8}}>Outside Catering</p></div>
</div>

<div onClick={()=>go('/land')} style={{background:"white",border:"2px solid green",borderRadius:16,padding:16,marginTop:16,textAlign:"center"}}>
<span style={{background:"#dcfce7",padding:"4px 8px",borderRadius:8,fontSize:10}}>LAND</span>
<h3 style={{fontWeight:"bold",marginTop:4}}>Selling Land</h3>
<p style={{fontSize:10}}>TILL 1754910 • Seller 500 | Buyer 300 | Broker FREE</p>
</div>
</div>

<div style={{position:"fixed",bottom:0,left:0,right:0,background:"white",display:"flex",justifyContent:"space-around",padding:12,borderTop:"1px solid #eee"}}>
<span onClick={()=>go('/')}>🏠 Home</span><span onClick={()=>go('/jobs')}>💼 Jobs</span><span onClick={()=>go('/post')} style={{background:"#0a1931",color:"white",width:40,height:40,borderRadius:20,display:"grid",placeItems:"center"}}>+</span><span onClick={()=>go('/messages')}>💬</span><span onClick={()=>go('/profile')}>👤</span>
</div>
</div>
)
}
