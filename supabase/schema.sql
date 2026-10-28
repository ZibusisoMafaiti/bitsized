-- BitSized database schema
-- Reconstructed from the queries in src/ after the original Supabase project was lost.
-- Run this once in a new project: Supabase dashboard -> SQL Editor -> paste -> Run.

-- Contact form submissions (src/pages/Contact.jsx).
-- The table name is capitalised in the app, so it must stay quoted here.
create table if not exists public."Messages" (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  message     text not null
);

alter table public."Messages" enable row level security;

-- Anyone visiting the site can send a message, but nobody can read them
-- through the public API (read them in the dashboard instead).
create policy "Anyone can send a message"
  on public."Messages" for insert
  to anon, authenticated
  with check (true);

-- Student journal entries (src/pages/LessonPlayer.jsx, src/components/JournalInput.jsx).
create table if not exists public.student_submissions (
  id            bigint generated always as identity primary key,
  created_at    timestamptz not null default now(),
  user_id       uuid not null references auth.users (id) on delete cascade,
  lesson_id     text not null,
  problem_list  text not null
);

create index if not exists student_submissions_user_lesson_idx
  on public.student_submissions (user_id, lesson_id);

alter table public.student_submissions enable row level security;

-- Signed-in students can only save and read their own entries.
create policy "Students insert their own submissions"
  on public.student_submissions for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Students read their own submissions"
  on public.student_submissions for select
  to authenticated
  using (auth.uid() = user_id);
