"use client";
export default function Page(){
 const pay=(a)=>{
  const p=prompt("Mpesa 07?");
  if(p){alert("Pay "+a+" to 0116982197");}
 };
 return(
  <div style={{padding:16,background:"white",minHeight:"100vh",color:"black"}}>
   <h2>M-PESA: 0116982197</h2>
   <div style={{border:"2px solid black",padding:12,marginBottom:12,borderRadius:12}}>
    <b>Daily - 50</b><br/>
    <button onClick={()=>pay(50)} style={{background:"black",color:"white",padding:12,width:"100%",borderRadius:20}}>Pay 50</button>
   </div>
   <div style={{border:"2px solid blue",padding:12,marginBottom:12,borderRadius:12}}>
    <b>Weekly - 250</b><br/>
    <button onClick={()=>pay(250)} style={{background:"blue",color:"white",padding:12,width:"100%",borderRadius:20}}>Pay 250</button>
   </div>
   <div style={{border:"2px solid gold",padding:12,borderRadius:12}}>
    <b>Monthly - 799</b><br/>
    <button onClick={()=>pay(799)} style={{background:"#0a1f44",color:"white",padding:12,width:"100%",borderRadius:20}}>Pay 799</button>
   </div>
  </div>
 )
}
