import { createContext, useContext, useState } from "react";
import { EasyData } from "../data/EasyData";
import { MediumData } from "../data/MediumData";
import { HardData } from "../data/HardData";
const GameContext = createContext();

function GameProvider({ children }) {
  const [status, setStatus] = useState("loading");
  const [secondsRemaining, setSecondsRemaining] = useState(29);
  const [miliSecondsRemaining, setMiliSecondsRemaining] = useState(1000);
  const [userName, setUserName] = useState("");
  const [enroll, setEnroll] = useState("");
  const [phone, setPhone] = useState("");
  const [highScore, setHighScore] = useState(0);
  const [mazeSize, setMazeSize] = useState(5);
  const [inputString, setInputString] = useState("");
  const [leaderBoard, setLeaderBoard] = useState({});
  const [currentMaze, setCurrentMaze] = useState();
  const[difficulty,setDifficulty]=useState(5);

  function MazeInput() {
    const V = [];

    for (let i = 0; i < mazeSize; i++) {
      const row = Array(mazeSize).fill(0);
      V.push(row);
    }
    const randomData =
      mazeSize === 5
        ? EasyData
        : mazeSize === 7
        ? MediumData
        : mazeSize === 9
        ? HardData
        : "";
    let Idx = Math.floor(Math.random() * randomData.length);
    for (let i = 0; i < randomData[Idx].Coordinates.length; i++) {
      V[randomData[Idx].Coordinates[i][0]][
        randomData[Idx].Coordinates[i][1]
      ] = 1;
    }
    V[randomData[Idx].Start[0]][randomData[Idx].Start[1]] = "🐰";
    V[randomData[Idx].End[0]][randomData[Idx].End[1]] = "🚩";
    const M = { ...randomData[Idx], matrix: V };
    return M;
  }

  return (
    <GameContext.Provider
      value={{
        secondsRemaining,
        miliSecondsRemaining,
        currentMaze,
        highScore,
        inputString,
        mazeSize,
        leaderBoard,
        status,
        userName,
        enroll,
        phone,
        difficulty,
        setDifficulty,
        setPhone,
        setEnroll,
        setUserName,
        MazeInput,
        setHighScore,
        setStatus,
        setSecondsRemaining,
        setMiliSecondsRemaining,
        setCurrentMaze,
        setLeaderBoard,
        setMazeSize,
        setInputString,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("AuthContext was used outside AuthProvider");
  }
  return context;
}

export { useGame, GameProvider };
