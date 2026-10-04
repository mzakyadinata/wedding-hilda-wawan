import { getClient } from "../lib/supabase";

const COLS = "id,name,message,created_at";

// export async function fetchWishes(limit = 50) {
//   const client = await getClient()
//   if (!client) throw new Error('NOT_CONFIGURED')
//   const { data, error } = await client
//     .from('wishes').select(COLS).eq('is_published', true)
//     .order('created_at', { ascending: false }).limit(limit)
//   if (error) throw error
//   return data
// }

export async function fetchWishes(page = 1, limit = 5) {
  const client = await getClient();

  if (!client) throw new Error("NOT_CONFIGURED");

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, count, error } = await client
    .from("wishes")
    .select(COLS, { count: "exact" })
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;

  return {
    data,
    count: count ?? 0,
  };
}

export async function submitWish({ name, message }) {
  const client = await getClient();
  if (!client) throw new Error("NOT_CONFIGURED");
  const { data, error } = await client
    .from("wishes")
    .insert({ name, message })
    .select(COLS)
    .single();
  if (error) throw error;
  return data;
}
