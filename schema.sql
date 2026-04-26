-- 1. Profiles Table (Linked to Auth)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  phone_number text,
  address text,
  updated_at timestamp with time zone default now()
);

-- 2. Weddings Table (Updated with user_id)
create table weddings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  slug text unique not null,
  hashtag text,
  preset_design text default 'classic',
  data jsonb not null,
  qr_code_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 3. RSVPs / Guest List (Updated with phone and QR)
create table rsvps (
  id uuid primary key default gen_random_uuid(),
  wedding_id uuid references weddings(id) on delete cascade not null,
  name text not null,
  phone_number text,
  guest_count integer default 1,
  status text check (status in ('hadir', 'berhalangan', 'pending')) default 'pending',
  message text,
  qr_token text unique default encode(gen_random_bytes(12), 'hex'), -- Unique token for QR check-in
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table profiles enable row level security;
alter table weddings enable row level security;
alter table rsvps enable row level security;

-- Policies
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

create policy "Users can manage own weddings" on weddings for all using (auth.uid() = user_id);
create policy "Public can view weddings by slug" on weddings for select using (true);

create policy "Users can view rsvps for their weddings" on rsvps for select 
  using (exists (select 1 from weddings where id = rsvps.wedding_id and user_id = auth.uid()));
create policy "Public can submit RSVPs" on rsvps for insert with check (true);

-- Storage Buckets (Run in Supabase Dashboard)
-- insert into storage.buckets (id, name, public) values ('images', 'images', true);
