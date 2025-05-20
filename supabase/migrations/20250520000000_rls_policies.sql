
-- RLS policies for GitFlash
-- Up migration

-- jobs ----------------------------------------------------------
alter table jobs enable row level security;
drop policy if exists "Anyone can view jobs" on jobs;
create policy "read jobs (owner|aktiv|admin)"
  on jobs for select
  using (
    auth.uid() = user_id
    or status = 'Aktiv'
    or auth.role() = 'admin'
  );
create policy "update jobs (owner|admin)"
  on jobs for update
  using (
    auth.uid() = user_id
    or auth.role() = 'admin'
  );

-- profiles ------------------------------------------------------
alter table profiles enable row level security;
drop policy if exists "Anyone can read profiles" on profiles;
create policy "read own profile or admin"
  on profiles for select
  using (
    auth.uid() = id
    or auth.role() = 'admin'
  );
create policy "update own profile or admin"
  on profiles for update
  using (
    auth.uid() = id
    or auth.role() = 'admin'
  );

-- Down migration
-- To rollback:
comment on table profiles is 'ROLLBACK: Drop RLS policies and disable RLS for this table';

-- Rollback for jobs table
drop policy if exists "read jobs (owner|aktiv|admin)" on jobs;
drop policy if exists "update jobs (owner|admin)" on jobs;
alter table jobs disable row level security;

-- Rollback for profiles table
drop policy if exists "read own profile or admin" on profiles;
drop policy if exists "update own profile or admin" on profiles;
alter table profiles disable row level security;
