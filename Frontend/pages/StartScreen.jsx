import Rules from "../src/components/Rules";
import LeaderBoard from "../src/components/LeaderBoard";
import { DifficultyLevel } from "../src/components/DifficultyLevel";

function StartScreen() {

  return (
    <div style={{background : "#341278" , padding : "100px"}}>
      <div style={{display: "flex", flexDirection: "column", alignItems : "center", gap : "50px"}}>
        <h2 style={{fontSize : "5rem"}}>Welcome to the Pacman!</h2>
        <LeaderBoard />
        <Rules />
        <DifficultyLevel/>
      </div>
    </div>
  );
}

export default StartScreen;
