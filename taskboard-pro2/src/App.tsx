import { Board } from "./components/Board";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1>TaskBoard Pro</h1>
      </header>
      <main className="app__main">
        <Board />
      </main>
    </div>
  );
}

export default App;