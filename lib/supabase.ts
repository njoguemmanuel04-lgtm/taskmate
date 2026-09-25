import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://tvgbluiespttqwptpwljs.supabase.co'
export const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2Z2JsdWllc3B0dHF3cHRwd2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0NzA4MDcsImV4cCI6MjAwNTY0NjgwN30.Pmbgxx45ziJCtjrtt2eEzjDAbiVqzq4lqv0Qjn7iqoc'

export const supabase = createClient(supabaseUrl, supabaseKey)
