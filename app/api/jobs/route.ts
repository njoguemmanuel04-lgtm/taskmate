import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://tvgbluiespttqwptpwljs.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2Z2JsdWllc3B0dHF3cHRwd2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0NzA4MDcsImV4cCI6MjAwNTY0NjgwN30.Pmbgxx45ziJCtjrtt2eEzjDAbiVqzq4lqv0Qjn7iqoc'
)

export async function GET() {
  const { data } = await supabase.from('jobs').select('*').order('created_at', { ascending: false })
  return NextResponse.json(data || [])
}

export async function POST(req: Request) {
  const body = await req.json()
  const { error } = await supabase.from('jobs').insert([body])
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}
