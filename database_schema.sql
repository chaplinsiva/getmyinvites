-- Create a table for public profiles
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS) for profiles
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Create a trigger that automatically creates a profile when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if exists so we can safely recreate it
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Browse groupings for the invitations gallery (optional FK on templates)
create table if not exists public.template_categories (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  name text not null,
  sort_order integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.template_categories enable row level security;

create policy "Template categories are viewable by everyone."
  on public.template_categories for select
  using ( true );

-- Create a templates table to store metadata for Cloudflare R2 templates
create table if not exists public.templates (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  name text not null,
  description text,
  r2_path text not null, -- Path/Prefix inside Cloudflare R2 (e.g. templates/wedding-classic)
  thumbnail_url text, -- URL to the preview image from R2
  price decimal default 0.0,
  category_id uuid references public.template_categories(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists templates_category_id_idx on public.templates (category_id);

-- Older databases: templates row may exist without category_id
alter table public.templates
  add column if not exists category_id uuid references public.template_categories(id) on delete set null;

alter table public.templates enable row level security;

create policy "Templates are viewable by everyone."
  on templates for select
  using ( true );
-- Only service role (server) can insert/update templates, so we don't need additional policies for users.

-- Create user_invitations table (for users storing their customized templates)
create table if not exists public.user_invitations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  template_id uuid references public.templates(id) on delete restrict not null,
  title text not null default 'My Wedding Invitation',
  customized_data jsonb default '{}'::jsonb, -- Store selected positions, texts, colors
  r2_uploaded_url text, -- If we generate an overarching output that gets uploaded to R2 (e.g., pdf or image)
  custom_domain text unique, -- Multi-tenant subdomain string (e.g., 'sophia-and-jackson')
  status text default 'draft', -- 'draft', 'published'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.user_invitations enable row level security;

create policy "Users can view own invitations."
  on user_invitations for select
  using ( auth.uid() = user_id );

create policy "Users can create own invitations."
  on user_invitations for insert
  with check ( auth.uid() = user_id );

create policy "Users can update own invitations."
  on user_invitations for update
  using ( auth.uid() = user_id );

create policy "Users can delete own invitations."
  on user_invitations for delete
  using ( auth.uid() = user_id );

-- Create rsvps table (for guests responding to invitations)
create table if not exists public.rsvps (
  id uuid default gen_random_uuid() primary key,
  invitation_id uuid references public.user_invitations(id) on delete cascade not null,
  guest_name text not null,
  guest_email text,
  attending boolean not null default true,
  dietary_requirements text,
  plus_ones integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.rsvps enable row level security;

-- Policy to allow anyone to insert an RSVP (since invitation links are public)
create policy "Anyone can insert RSVPs."
  on rsvps for insert
  with check ( true );

-- Policy to allow users to view RSVPs for their own invitations
create policy "Users can view RSVPs for their own invitations."
  on rsvps for select
  using ( 
    exists (
      select 1 from public.user_invitations
      where id = rsvps.invitation_id and user_id = auth.uid()
    )
  );

-- Create payments table to track Razorpay transactions
create table if not exists public.payments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete set null,
  razorpay_order_id text not null unique,
  razorpay_payment_id text unique,
  razorpay_signature text,
  amount integer not null, -- amount in paise (e.g. 4900 for ₹49, 9900 for ₹99)
  currency text not null default 'INR',
  status text not null default 'created', -- 'created', 'captured', 'failed'
  item_type text not null, -- 'poster', 'video'
  item_title text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.payments enable row level security;

create policy "Users can view their own payments."
  on public.payments for select
  using ( auth.uid() = user_id );

create policy "Anyone can insert payment records."
  on public.payments for insert
  with check ( true );

