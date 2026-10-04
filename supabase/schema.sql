-- Jalankan di Supabase Dashboard → SQL Editor.

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 2 and 80),
  attendance text not null check (attendance in ('hadir', 'tidak_hadir')),
  guest_count int not null default 1 check (guest_count between 0 and 10),
  message text check (message is null or char_length(message) <= 500),
  created_at timestamptz not null default now()
);

create table if not exists public.wishes (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 2 and 80),
  message text not null check (char_length(btrim(message)) between 2 and 500),
  is_published boolean not null default true,  -- set false di dashboard untuk menyembunyikan ucapan
  created_at timestamptz not null default now()
);
create index if not exists wishes_created_idx on public.wishes (created_at desc);

alter table public.rsvps  enable row level security;
alter table public.wishes enable row level security;

-- Hak akses level kolom: tamu (anon) tidak bisa mengisi id/created_at/is_published sendiri.
revoke all on public.rsvps  from anon, authenticated;
revoke all on public.wishes from anon, authenticated;
grant insert (name, attendance, guest_count, message) on public.rsvps to anon;
grant insert (name, message) on public.wishes to anon;
grant select (id, name, message, created_at) on public.wishes to anon;

-- RSVP: tamu hanya boleh INSERT (tidak bisa baca / ubah / hapus).
drop policy if exists "rsvps insert" on public.rsvps;
create policy "rsvps insert" on public.rsvps for insert to anon with check (true);

-- Ucapan: tamu boleh INSERT dan membaca yang published. Tanpa UPDATE/DELETE.
drop policy if exists "wishes insert" on public.wishes;
drop policy if exists "wishes read published" on public.wishes;
create policy "wishes insert" on public.wishes for insert to anon with check (true);
create policy "wishes read published" on public.wishes for select to anon using (is_published);
