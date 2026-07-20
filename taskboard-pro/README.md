# TaskBoard Pro ― React発展 第4.5回 完成版

カンバン方式のタスク管理アプリです。**TanStack Query** による
**一覧（Read）・作成（Create）・更新（Update）・削除（Delete）** に加えて、
**@dnd-kit によるドラッグ&ドロップ** と **楽観的更新（Optimistic UI）** まで実装した、
第4.5回の完成版です。

> 注: **認証（Supabase Auth）** は次回（第5回）で追加します。
> このプロジェクトにはまだ含まれておらず、URLを知っていれば誰でもボードを操作できます。

## 技術スタック

- Vite + React + TypeScript
- TanStack Query（サーバー状態管理）
- Supabase（PostgreSQL）
- @dnd-kit/core（ドラッグ&ドロップ）
- react-hook-form + Zod（フォーム入力・検証）

## ディレクトリ構成

```
src/
├── components/
│   ├── Board.tsx        ボード本体（useQuery + useMutation + DndContext）
│   ├── Column.tsx       レーン（useDroppable でドロップ先になる）
│   ├── TaskCard.tsx     カード（useDraggable でドラッグできる + 削除ボタン）
│   └── TaskForm.tsx     追加フォーム
├── hooks/
│   ├── useTasks.ts            一覧取得（useQuery）
│   ├── useCreateTask.ts       追加（useMutation）
│   ├── useUpdateTaskStatus.ts ステータス更新（楽観的更新つき）
│   └── useDeleteTask.ts       削除（useMutation）
├── lib/
│   ├── supabase.ts         Supabase 接続口
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

Supabase 側では、`db/schema.sql` を SQL Editor で実行してテーブルを用意してください。

## 第4回からの変更点

- `Board.tsx` … `DndContext` でレーン全体を囲み、`onDragEnd` でステータスを更新する
- `Column.tsx` … `useDroppable` でドロップ先になり、重なると `column--over` で光る
- `TaskCard.tsx` … `useDraggable` で掴めるようになり、ステータス変更セレクトを廃止。
  削除ボタンは `onPointerDown` で伝播を止め、ドラッグに吸われないようにしている
- `useUpdateTaskStatus.ts` … `onMutate` / `onError` / `onSettled` の3点セットで楽観的更新に変更
- `App.css` … 末尾にドラッグ用のスタイルを追記

> 第4回で使っていた `.task-card__status`（セレクト用のCSS）は、セレクトを外したため
> 使われなくなっています。残していても害はありません。
