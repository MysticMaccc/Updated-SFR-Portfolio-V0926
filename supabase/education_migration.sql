-- Education table
create table if not exists public.educations (
  id            uuid primary key default gen_random_uuid(),
  institution   text not null,
  degree        text not null,
  field_of_study text not null,
  start_year    text not null,
  end_year      text,
  is_current    boolean not null default false,
  description   text,
  order_index   int not null default 0,
  created_at    timestamptz not null default now()
);

-- RLS
alter table public.educations enable row level security;

create policy "Public can read educations"
  on public.educations for select using (true);

create policy "Authenticated users can manage educations"
  on public.educations for all using (auth.role() = 'authenticated');
