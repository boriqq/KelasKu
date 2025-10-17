import { supabase } from './lib/supabaseClient'

async function testConnection() {
  const { data, error } = await supabase.from('courses').select('*')
  if (error) console.error('❌ Error:', error)
  else console.log('✅ Data dari Supabase:', data)
}

testConnection()
