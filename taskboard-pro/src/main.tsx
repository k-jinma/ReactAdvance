import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {z} from 'zod'

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

const TitleSchema = z.string().min(1).max(80);

console.log(TitleSchema.parse("会議資料の作成"));  // ✓ "会議資料の作成" と表示
try {
  TitleSchema.parse("");  // ✗ 例外
} catch (e) {
  console.log("空文字は弾かれました:", e);
}
try {
  TitleSchema.parse(12345);  // ✗ 例外
} catch (e) {
  console.log("数値は弾かれました:", e);
}