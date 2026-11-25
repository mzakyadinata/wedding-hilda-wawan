# Hilda & Wawan — Undangan Pernikahan Digital

React + Vite + Tailwind CSS v4 + Framer Motion + Supabase. Deploy ke Vercel.

## Menjalankan
```bash
npm install
cp .env.example .env     # isi VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY
npm run dev              # development
npm run build            # production build
```

## Yang perlu Anda ganti (semua di satu tempat)
| Apa | Di mana |
|---|---|
| Nama, orang tua, tanggal, acara, venue, alamat, **link Google Maps**, quote, gallery | `src/data/weddingData.js` |
| Foto mempelai / hero / gallery | taruh di `public/images/...`, lalu isi path di `weddingData.js` |
| Musik | timpa `public/audio/wedding-music.mp3`  |
| Gambar preview WhatsApp | timpa `public/images/og/og-image.jpg` (1200x630) |
| Judul / deskripsi preview | `index.html` |

Rekomendasi aset: foto WebP, hero maks 1600px, gallery sekitar 1000px, couple sekitar 800px, target 80-200 KB per foto. Musik MP3 128 kbps, maks 3 MB, 2-3 menit (di-loop).

## Supabase
1. Buat project di supabase.com.
2. SQL Editor: jalankan seluruh isi `supabase/schema.sql` (tabel `rsvps` dan `wishes`, RLS, hak akses kolom).
3. Settings > API: salin **Project URL** dan **anon public key** ke `.env`. Jangan pernah memakai service role key di frontend.
4. Lihat RSVP: Table Editor > `rsvps`. Sembunyikan ucapan: set `is_published = false` di `wishes`.

Keamanan: tamu hanya bisa INSERT RSVP (tidak bisa membaca/ubah/hapus), dan INSERT + membaca ucapan yang published. Tanpa UPDATE/DELETE.

## Deploy ke Vercel
1. Push ke GitHub, import di Vercel (preset Vite terdeteksi otomatis).
2. Environment Variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.
3. Open Graph memakai domain Vercel otomatis; untuk domain custom isi `VITE_SITE_URL=https://domain-anda.com`.
4. Redeploy setelah env diisi (env hanya dibaca saat build).
