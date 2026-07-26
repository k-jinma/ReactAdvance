-- =====================================================================
-- 既存DBを第4.5回教材の仕様に合わせる移行SQL
-- Supabase の SQL Editor で実行してください
--
-- 背景:
--   既存の tasks テーブルは priority に 'medium' を使っており、
--   CHECK制約 tasks_priority_check も ('low','medium','high') を許可しています。
--   第4.5回以降の教材コードは 'mid' を使うため、このままだと
--   タスクの新規作成が CHECK制約違反で失敗します。
-- =====================================================================

-- 1) 旧CHECK制約を外す
alter table public.tasks drop constraint if exists tasks_priority_check;

-- 2) 既存データの 'medium' を 'mid' に変換する
update public.tasks set priority = 'mid' where priority = 'medium';

-- 3) 教材仕様('low','mid','high')でCHECK制約を付け直す
alter table public.tasks
  add constraint tasks_priority_check
  check (priority in ('low', 'mid', 'high'));
