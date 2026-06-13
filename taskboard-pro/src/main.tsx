import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // ← 追加

import './index.css'
import App from './App.tsx'

const queryClient = new QueryClient(); // ← 追加(アプリ全体で使う管理センター=QueryClient を1つ作る)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>  {/* ← 追加 */}
      <App />
    </QueryClientProvider>                       {/* ← 追加 */}
  </StrictMode>,
)
