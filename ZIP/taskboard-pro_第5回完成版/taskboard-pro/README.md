# TaskBoard Pro ― React発展 第5回 完成版

カンバン方式のタスク管理アプリです。**TanStack Query** による
**一覧（Read）・作成（Create）・更新（Update）・削除（Delete）** に加えて、
**ドラッグ&ドロップ + 楽観的更新**（第4.5回）と、
**Supabase Auth による認証**（第5回）まで実装した状態です。

## 技術スタック

- Vite + React + TypeScript
- TanStack Query（サーバー状態管理）
- Supabase（PostgreSQL + Auth）
- @dnd-kit/core（ドラッグ&ドロップ）
- React Router（ページの切り替えとログインチェック）
- react-hook-form + Zod（フォーム入力・検証）

## ディレクトリ構成

```
src/
├── components/
│   ├── Board.tsx           ボード本体（useQuery + useMutation + DndContext）
│   ├── Column.tsx          レーン（useDroppable でドロップ先になる）
│   ├── TaskCard.tsx        カード（useDraggable でドラッグできる + 削除ボタン）
│   ├── TaskForm.tsx        追加フォーム
│   ├── Header.tsx          【第5回】メール表示 + ログアウト
│   └── ProtectedRoute.tsx  【第5回】ログインチェック
├── contexts/
│   └── AuthContext.tsx     【第5回】ログイン状態の共有 + useAuth
├── pages/
│   └── LoginPage.tsx       【第5回】ログイン / 新規登録画面
├── hooks/
│   ├── useTasks.ts            一覧取得（useQuery）
│   ├── useCreateTask.ts       追加（useMutation）
│   ├── useUpdateTaskStatus.ts ステータス更新（楽観的更新つき）
│   └── useDeleteTask.ts       削除（useMutation）
├── lib/
│   ├── supabase.ts         Supabase 接続口（DB操作と認証の両方に使う）
│   ├── database.types.ts   DBの型（本来は gen:db で自動生成）
│   ├── mapTask.ts          境界変換（行 <-> Task）
│   └── tasksApi.ts         CRUD の4関数
├── schemas/
│   └── task.ts             型と Zod スキーマ
├── App.tsx / App.css / index.css / main.tsx
```

## セットアップ

```bash
npm install
cp .env.local.example .env.local   # 自分のSupabaseの値に書き換える
npm run dev
```

Supabase 側では、`db/schema.sql` を SQL Editor で実行してください
（第3回のテーブル作成 + 第5回の `created_by` 列追加）。
あわせて Authentication → Sign In / Providers で **Email を有効化**し、
授業用に **Confirm email をオフ**にしておきます。

## 動作の流れ

1. 未ログインでアクセスすると、`ProtectedRoute` が `/login` へ送り返す
2. メールアドレスとパスワードで新規登録またはログインすると、ボードが表示される
3. カードをドラッグしてレーン間を移動すると、画面は即座に変わり、裏でDBが更新される
4. タスクを追加すると、`created_by` に自分のユーザーIDがDB側で自動記録される
5. ログアウトすると、`onAuthStateChange` → `ProtectedRoute` の連動で `/login` に戻る

## 補足

- `src/lib/database.types.ts` は第5回時点では **第4回のまま**です。`created_by` 列を
  型にも反映したい場合は `npm run gen:db`（`supabase gen types typescript`）で再生成してください。
  フロントは `created_by` を送らない（DBのデフォルト値に任せる）ため、未反映でも動作します。
- 画面としてはログインしないと見えませんが、**DB自体はまだ無防備**です。
  ログイン済みであれば他人のタスクも読み書きできます。この穴は第6回の
  **Row Level Security (RLS)** で塞ぎます。
