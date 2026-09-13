// src/main.tsx(置き換え)
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // ← 追加
import App from "./App";
import "./App.css";

const queryClient = new QueryClient(); // ← 管理センターを1つ作る

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>  {/* ← 追加 */}
      <App />
    </QueryClientProvider>                       {/* ← 追加 */}
  </StrictMode>
);