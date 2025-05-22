import Rules from "../src/components/Rules";
import LeaderBoard from "../src/components/LeaderBoard";
import { DifficultyLevel } from "../src/components/DifficultyLevel";
import "../src/styles/pages.css";

function StartScreen() {
  return (
    <div className="start-screen">
      <div className="start-content">
        <h2 className="start-title">Welcome to the Pacman!</h2>
        <LeaderBoard />
        <Rules />
        <DifficultyLevel />
      </div>
    </div>
  );
}

export default StartScreen;
