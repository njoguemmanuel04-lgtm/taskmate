"use client";
export default function Plans(){
return(<div style={{padding:16,background:"#f5f7fa",minHeight:"100vh"}}>
<div><button onClick={()=>location.href='/'}>← Home</button><h1>💰 Plans</h1></div>
<p>M-PESA: <b>0116982197</b></p>

<div style={{background:"white",borderRadius:16,padding:16,marginTop:12}}>
<h2>Daily Try - KES 50</h2><p>1 Day</p>
<p>✓ Visible 24hrs</p><p>✓ 2-3 Calls</p>
<button onClick={()=>alert('Pay 50 to 0116982197')} style={{width:"100%",background:"#0a1931",color:"white",padding:12,borderRadius:20,marginTop:8}}>Pay KES 50 via M-Pesa</button>
</div>

<div style={{background:"#e0f0ff",border:"2px solid blue",borderRadius:16,padding:16,marginTop:12}}>
<h2>Weekly Hustle - KES 250</h2><p>7 Days</p>
<p>✓ Visible 7 days</p><p>✓ TOP in search</p><p>✓ 15-20 Calls</p><p>✓ Mwea+Ngurubani</p>
<button onClick={()=>alert('Pay 250 to 0116982197')} style={{width:"100%",background:"blue",color:"white",padding:12,borderRadius:20,marginTop:8}}>Pay KES 250 via M-Pesa</button>
</div>

<div style={{background:"#fff9db",border:"2px solid gold",borderRadius:16,padding:16,marginTop:12}}>
<h2>Monthly CEO - KES 799</h2><p>30 Days</p>
<p>✓ Visible 30 days</p><p>✓ ALWAYS TOP</p><p>✓ 80+ Calls</p><p>✓ Verified badge</p><p>✓ All Kirinyaga</p>
<button onClick={()=>alert('Pay 799 to 0116982197')} style={{width:"100%",background:"#0a1931",color:"white",padding:12,borderRadius:20,marginTop:8}}>Pay KES 799 via M-Pesa</button>
</div>

</div>)
}
