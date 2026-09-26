import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  const { data, error } = await supabase.from('jobs').select('*').order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { data, error } = await supabase.from('jobs').insert([body]).select()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data[0])
}

export async function PUT(req: Request) {
  const body = await req.json()
  const { id, payerphone, pending, paid, pay } = body

  const updateData: any = {}
  if (payerphone!== undefined) updateData.payerphone = payerphone
  if (pending!== undefined) updateData.pending = pending
  if (paid!== undefined) updateData.paid = paid
  if (pay!== undefined) updateData.pay = pay

  const { data, error } = await supabase.from('jobs').update(updateData).eq('id', id).select()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data[0])
}
