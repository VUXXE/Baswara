-- 1. Profiles Table (Linked to Auth)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  phone_number text,
  address text,
  updated_at timestamp with time zone default now()
);

-- 2. Invitations Table (Generalized from Weddings)
create table invitations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  event_type text not null default 'wedding', -- 'wedding', 'birthday', 'seminar', etc.
  slug text unique not null,
  hashtag text,
  preset_design text default 'classic',
  data jsonb not null,
  qr_code_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 3. RSVPs / Guest List (Linked to Invitations)
create table rsvps (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid references invitations(id) on delete cascade not null,
  name text not null,
  phone_number text,
  guest_count integer default 1,
  status text check (status in ('hadir', 'berhalangan', 'pending')) default 'pending',
  message text,
  qr_token text unique default encode(gen_random_bytes(12), 'hex'),
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table profiles enable row level security;
alter table invitations enable row level security;
alter table rsvps enable row level security;

-- Policies
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

create policy "Users can manage own invitations" on invitations for all using (auth.uid() = user_id);
create policy "Public can view invitations by slug" on invitations for select using (true);

create policy "Users can view rsvps for their invitations" on rsvps for select 
  using (exists (select 1 from invitations where id = rsvps.invitation_id and user_id = auth.uid()));
create policy "Public can submit RSVPs" on rsvps for insert with check (true);
