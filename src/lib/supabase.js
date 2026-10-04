// Supabase dimuat secara lazy agar bundle awal tetap ringan.
// Hanya anon key yang dipakai (aman di frontend, dilindungi RLS).
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY
let clientPromise

export const isSupabaseConfigured = Boolean(url && key)

export function getClient() {
  if (!isSupabaseConfigured) return Promise.resolve(null)
  clientPromise ??= import('@supabase/supabase-js').then(({ createClient }) =>
    createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } }),
  )
  return clientPromise
}
