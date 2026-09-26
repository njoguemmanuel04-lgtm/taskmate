"use client"
import{useState,useEffect}from"react"
export default function Jobs(){
const[jobs,setJobs]=useState<any>([])
const[show,setShow]=useState<any>(null)
const[phone,setPhone]=useState("")
const[msg,setMsg]=useState("")
useEffect(()=>{fetch('/api/jobs?'+Date.now(),{cache:'no-store'}).then(r=>r.json()).then(setJobs)},[])
function clean(p:any){let s=String(p||""),t="";for(let c of s){if(c>='0'&&c<='9')t+=c}return t.slice(-10)}
function mask(p:any){let s=clean(p);return s?s.slice(0,4)+"***"+s.slice(-3):""}
async function pay(j:any){
if(!phone||phone.length<9){setMsg("Enter M-Pesa number");return}
await fetch('/api/jobs',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:j.id,pending:true,payerphone:phone})})
setMsg("Pending - Admin will verify")
setShow(null)
fetch('/api/jobs?'+Date.now(),{cache:'no-store'}).then(r=>r.json()).then(setJobs)
}
return(<div style={{padding:15}}><h3>Available Jobs - {msg}</h3>{jobs.map((j:any)=>{const ph=clean(j.phone);const nm=j.client_name||"Client";return(<div key={j.id} style={{border:'1px solid #ccc',padding:12,marginBottom:12,borderRadius:12}}><div>{j.title}</div><div>{j.location} - KES {j.budget}</div><div>Client: {j.paid?nm+" - "+ph:nm+"*** 🔒 "+mask(ph)}</div>{j.paid?<a href={`tel:${ph}`} style={{background:'green',color:'white',padding:10,display:'inline-block',marginTop:8,borderRadius:8,textDecoration:'none'}}>Call - {nm} - {ph}</a>:<><button onClick={()=>setShow(j)} style={{background:'orange',padding:10,marginTop:8,borderRadius:8}}>Unlock - KES 100</button>{j.pending&&<div style={{marginTop:8,color:'orange'}}>⏳ Pending verify 0116982197 - Wait Admin</div>}</>}{show?.id===j.id&&<div style={{background:'#fff3cd',padding:10,marginTop:8,borderRadius:8}}><div>Send 100 to 0116982197</div><input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="07xxxx" style={{width:'100%',padding:8,marginTop:6}}/><button onClick={()=>pay(j)} style={{width:'100%',background:'green',color:'white',padding:10,marginTop:6,borderRadius:8}}>I HAVE PAID 100</button></div>}</div>)})}</div>)}
