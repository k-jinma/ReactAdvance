import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";          // ← 追加
import { AuthProvider } from "./contexts/AuthContext";     // ← 追加
import "./index.css";
import App from "./App.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>                                           {/* ← 追加 */}
        <BrowserRouter> 
          <App />
        </BrowserRouter>
      </AuthProvider>                                          {/* ← 追加 */}
    </QueryClientProvider>
  </StrictMode>
);
