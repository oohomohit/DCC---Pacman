import StartScreen from "../pages/StartScreen";
import MazePage from "../pages/MazePage";
import FinishScreen from "../pages/FinishScreen";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="start" element={<StartScreen />} />
        <Route path="mazepage" element={<MazePage />} />
        <Route path="result" element={<FinishScreen />} />
      </Routes>
    </div>
  );
}

export default App;
