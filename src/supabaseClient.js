import { createClient } from '@supabase/supabase-js'


const supabaseUrl = 'https://srcgemmuyceqyxmwqdug.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyY2dlbW11eWNlcXl4bXdxZHVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyMzY4ODAsImV4cCI6MjA4MjgxMjg4MH0.Oa-P6cjgoM5ndwtsT6yOvA8rnY_7eg9w3174W7y0yo0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)