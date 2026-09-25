"use client"
import { supabase } from "@/lib/supabase"
import { useState } from "react"
export default function Post(){
const [f,setF]=useState({title:"",location:"Mwea",price:"",phone:""})
async function post(){
if(!f.title||!f.price||!f.phone) return alert("Fill all fields")
const {error}=await supabase.from("jobs").insert({title:f.title,location:f.location,price:f.price,phone:f.phone})
if(error) alert(error.message)
else {alert("✅ Posted to CLOUD! ☁️"); location.href="/jobs"}
}
return(<div style={{padding:16,maxWidth:400,margin:"0 auto"}}>
<h1 style={{fontWeight:"bold",fontSize:20}}>Post Job - CLOUD ☁️</h1>
<input placeholder="Title e.g Plumbing" onChange={e=>setF({...f,title:e.target.value})} style={{width:"100%",padding:12,marginTop:10,border:"1px solid #ccc",borderRadius:8}}/>
<input placeholder="Location" defaultValue="Mwea" onChange={e=>setF({...f,location:e.target.value})} style={{width:"100%",padding:12,marginTop:10,border:"1px solid #ccc",borderRadius:8}}/>
<input placeholder="Price e.g 2000" onChange={e=>setF({...f,price:e.target.value})} style={{width:"100%",padding:12,marginTop:10,border:"1px solid #ccc",borderRadius:8}}/>
<input placeholder="Phone 07..." onChange={e=>setF({...f,phone:e.target.value})} style={{width:"100%",padding:12,marginTop:10,border:"1px solid #ccc",borderRadius:8}}/>
<button onClick={post} style={{background:"#0a1931",color:"white",padding:14,width:"100%",marginTop:12,borderRadius:20,fontWeight:"bold"}}>POST TO CLOUD ☁️</button>
</div>)
}
