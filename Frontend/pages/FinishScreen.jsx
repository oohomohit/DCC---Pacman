import { useNavigate } from "react-router-dom";
import { useGame } from "../src/contexts/GameContext";
import Maze from "../src/components/Maze";
import axios from "axios";
import { useEffect, useState } from "react";
import "../src/styles/pages.css";

function FinishScreen() {
  const navigate = useNavigate();
  const {
    secondsRemaining,
    miliSecondsRemaining,
    inputString,
    currentMaze,
    mazeSize,
    difficulty,
    setSecondsRemaining,
    setUserName,
    setEnroll,
    setStatus,
    setMazeSize,
  } = useGame();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    axios.get("http://localhost:8000/api/v1/users/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      setUser(res.data.user);
    })
    .catch((err) => {
      console.error("Error fetching user:", err);
      navigate("/");
    });
  }, [navigate]);

  const handleSave = async () => {
    if (!user) return;
    
    try {
      await axios.post('http://localhost:8000/api/v1/scores', {
        difficulty,
        points,
        userId: user._id
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      alert("Score saved successfully!");
    } catch (err) {
      console.error("Error saving score:", err);
      alert("Failed to save score. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/api/v1/users/logout", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      localStorage.removeItem("token");
      setSecondsRemaining(30);
      setStatus("loading");
      setMazeSize(5);
      navigate("/");
    } catch (err) {
      console.error("Error during logout:", err);
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  let isCorrect = true;
  let row = currentMaze.Start[0];
  let col = currentMaze.Start[1];

  let points = 0;
  for (let i = 0; i < inputString.length; i++) {
    if (
      row < 0 ||
      col < 0 ||
      row >= mazeSize ||
      col >= mazeSize ||
      currentMaze.matrix[row][col] === 0
    ) {
      isCorrect = false;
      break;
    }

    if (inputString[i] !== 'U' && inputString[i] !== 'D' && inputString[i] !== 'L' && inputString[i] !== 'R') {
      isCorrect = false;
      break;
    }

    if (inputString[i] === "U") row--;
    if (inputString[i] === "D") row++;
    if (inputString[i] === "L") col--;
    if (inputString[i] === "R") col++;

    if (
      row < 0 ||
      col < 0 ||
      row >= mazeSize ||
      col >= mazeSize ||
      currentMaze.matrix[row][col] === 0
    ) {
      isCorrect = false;
      break;
    }
  }

  if (isCorrect && currentMaze.matrix[row][col] === "🚩") {
    points = secondsRemaining * 1000 + miliSecondsRemaining;
  }

  const emoji = points >= 30000 ? "🥇" :
               points >= 24000 ? "🥳" :
               points >= 15000 ? "🫠" :
               points > 0 ? "🤨" : "🤯";

  function handleRestart() {
    setSecondsRemaining(30);
    setStatus("loading");
    setMazeSize(5);
    setEnroll("");
    setUserName("");
    navigate("/start");
  }

  return (
    <div className="finish-screen">
      <div className="result-card">
        <p className="result-text">
          {emoji} You have scored <strong>{points}</strong> out of 30000
        </p>
        
        <div className="answer-section">
          <h3>Your Answer: {inputString}</h3>
          <h3>
            <span className="correct-answer">Correct Answer:</span>{" "}
            {currentMaze.Path}
          </h3>
        </div>

        <div className="button-group">
          <button className="button-primary" onClick={handleRestart}>
            Restart Game
          </button>
          <button className="button-primary" onClick={handleLogout}>
            Logout
          </button>
          <button className="button-primary" onClick={handleSave}>
            Save Score
          </button>
        </div>

        <div className="maze-display">
          <Maze />
        </div>
      </div>
    </div>
  );
}

export default FinishScreen;
