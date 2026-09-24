"use client";
export default function Page(){
 const pay = (a)=>{
   const p = prompt("Enter Mpesa 07...");
   if(p){ alert("Pay KES "+a+" to 0116982197 from "+p); }
 };
 return(
  <div style={{padding:16, background:"white", minHeight:"100vh", color:"black"}}>
    <h2>M-PESA: 0116982197</h2>
    <div style={{border:"2px solid black", padding:16, marginBottom:12, borderRadius:12}}>
      <b>Daily Try - KES 50</b><br/>
      <button onClick={()=>pay(50)} style={{background:"black", color:"white", padding:12, width:"100%", borderRadius:20, marginTop:10}}>Pay KES 50 via M-Pesa</button>
    </div>
    <div style={{border:"2px solid blue", padding:16, marginBottom:12, borderRadius:12}}>
      <b>Weekly Hustle - KES 250</b><br/>
      <button onClick={()=>pay(250)} style={{background:"blue", color:"white", padding:12, width:"100%", borderRadius:20, marginTop:10}}>Pay KES 250 via M-Pesa</button>
    </div>
    <div style={{border:"2px solid gold", padding:16, borderRadius:12}}>
      <b>Monthly CEO - KES 799</b><br/>
      <button onClick={()=>pay(799)} style={{background:"#0a1f44", color:"white", padding:12, width:"100%", borderRadius:20, marginTop:10}}>Pay KES 799 via M-Pesa</button>
    </div>
  </div>
 )
}
