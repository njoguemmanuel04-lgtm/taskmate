import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(){
  const { data, error } = await supabase.from('jobs').select('*').order('created_at', {ascending:false})
  if(error) return NextResponse.json({error: error.message}, {status:500})
  return NextResponse.json(data || [])
}

export async function POST(req: Request){
  try{
    const body = await req.json()
    const { data, error } = await supabase.from('jobs').insert([body]).select()
    if(error) throw error
    return NextResponse.json({success:true, data})
  }catch(e:any){
    return NextResponse.json({error: e.message}, {status:500})
  }
}

export async function DELETE(req: Request){
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if(!id) return NextResponse.json({error:'id needed'}, {status:400})
  const { error } = await supabase.from('jobs').delete().eq('id', id)
  if(error) return NextResponse.json({error: error.message}, {status:500})
  return NextResponse.json({success:true})
}
