import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tvmpgydtayimfocjmymy.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2bXBneWR0YXlpbWZvY2pteW15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMTgzOTMsImV4cCI6MjA0ODg5NDM5M30.NU7qhg2XFJ_CTi9z4FbazCVQYAu8nJh_KYEe8qYgUIg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)