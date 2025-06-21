import GameBoard from "./components/GameBoard/GameBoard";
import appStyles from "./App.module.css";

function App() {
  return (
    <div className={appStyles.container}>
      <GameBoard />
    </div>
  );
}

export default App;
