import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ekdmzsoyyfgvlyzahvkc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrZG16c295eWZndmx5emFodmtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MzIxODcsImV4cCI6MjA3NjIwODE4N30.e4DoWT1QkzPtXzWhEsbemGKxII33vTyWL2HjBMwDcK0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
