import { Routes, Route } from "react-router-dom";
import { Board } from "./components/Board";
import { LoginPage } from "./pages/LoginPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Header } from "./components/Header";
import "./App.css";

function App() {
  return (
    <Routes>

      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Header />
            <Board />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;
