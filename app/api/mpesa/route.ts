import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { phone, amount } = await req.json()
  
  const SHORTCODE = "174379"
  const PASSKEY = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"
  const CONSUMER_KEY = "YOUR_KEY"
  const CONSUMER_SECRET = "YOUR_SECRET"

  try {
    const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64")
    
    const tokenRes = await fetch("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
      headers: { Authorization: `Basic ${auth}` }
    })
    
    const tokenData = await tokenRes.json()
    const token = tokenData.access_token

    const timestamp = new Date().toISOString().replace(/[^0-9]/g,"").slice(0,14)
    const password = Buffer.from(`${SHORTCODE}${PASSKEY}${timestamp}`).toString("base64")

    const stkRes = await fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        BusinessShortCode: SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount || 1,
        PartyA: phone,
        PartyB: SHORTCODE,
        PhoneNumber: phone,
        CallBackURL: "https://taskmate-ebon.vercel.app/api/callback",
        AccountReference: "TaskMate",
        TransactionDesc: "Unlock"
      })
    })

    const data = await stkRes.json()
    return NextResponse.json(data)

  } catch (err) {
    return NextResponse.json({ error: "Use Send Money 0116982197", fallback: true })
  }
}
