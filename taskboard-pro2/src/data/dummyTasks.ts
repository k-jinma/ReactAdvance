import type { Task } from "../types/task";

//export ： 外部から読み込める
export const dummyTasks: Task[] = [
  {
    id: "t-1",
    title: "要件ヒアリングシートの作成",
    description: "顧客から聴き取った要件を整理する",
    status: "todo",
    priority: "high",
    assignee: "鈴木",
    createdAt: "2026-04-01",
  },
  {
    id: "t-2",
    title: "アーキテクチャ図のドラフト",
    description: "フロント・バック・DBの構成を図にする",
    status: "doing",
    priority: "high",
    assignee: "山田",
    createdAt: "2026-04-02",
  },
  {
    id: "t-3",
    title: "開発環境のセットアップ手順書",
    description: "新メンバーがスムーズに入れるように",
    status: "review",
    priority: "medium",
    assignee: "佐藤",
    createdAt: "2026-04-03",
  },
  {
    id: "t-4",
    title: "API仕様書のレビュー",
    description: "エンドポイント群の命名規則確認",
    status: "review",
    priority: "low",
    assignee: "鈴木",
    createdAt: "2026-04-03",
  },
  {
    id: "t-5",
    title: "ロゴファイルの設計",
    description: "そのまま使える状態で完了",
    status: "done",
    priority: "low",
    assignee: "山田",
    createdAt: "2026-03-28",
  },
];