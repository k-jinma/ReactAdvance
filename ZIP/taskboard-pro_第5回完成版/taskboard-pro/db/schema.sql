-- =====================================================================
-- TaskBoard Pro : tasks テーブル定義(第3回で作成したもの)
-- Supabase の SQL Editor で実行してください
-- =====================================================================

create table if not exists public.tasks (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null,
  title       text not null,
  assignee    text not null,
  priority    text not null default 'mid',
  status      text not null default 'todo',
  due_date    date,
  created_at  timestamptz not null default now()
);

-- 開発用のサンプルデータ(任意)
insert into public.tasks (project_id, title, assignee, priority, status)
values
  ('00000000-0000-0000-0000-000000000001', '要件を整理する', '田中', 'high', 'todo'),
  ('00000000-0000-0000-0000-000000000001', '画面のモックを作る', '鈴木', 'mid', 'doing'),
  ('00000000-0000-0000-0000-000000000001', 'DB設計をレビューする', '佐藤', 'low', 'review');

-- 注意:
-- このサンプルは学習用です。本番運用では Row Level Security (RLS) の設定など、
-- 適切なアクセス制御を行ってください(認証は第5回で扱います)。

-- =====================================================================
-- 第5回で追加:作成者(created_by)列
-- Supabase の SQL Editor で実行してください
-- =====================================================================

-- auth.users は Supabase Auth が自動で用意しているテーブル
-- default auth.uid() により、insert 時に「いまログイン中の本人のID」がDB側で自動で入る
alter table tasks
  add column created_by uuid references auth.users (id) default auth.uid();

-- 注意:
-- この時点では、ログイン済みユーザーであれば誰のタスクでも読み書きできます。
-- 行単位のアクセス制御(Row Level Security)は第6回で設定します。
