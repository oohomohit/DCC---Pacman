import { useNavigate } from "react-router-dom";
import { useGame } from "../src/contexts/GameContext";
import Maze from "../src/components/Maze";
import axios from "axios";
import { useEffect, useState } from "react";
// import { set } from "mongoose";

function FinishScreen() {
  const navigate = useNavigate();
  const {
    secondsRemaining,
    miliSecondsRemaining,
    inputString,
    currentMaze,
    mazeSize,
    difficulty,
    setDifficulty,
    setSecondsRemaining,
    setMiliSecondsRemaining,
    setUserName,
    setEnroll,
    setStatus,
    setMazeSize,
  } = useGame();

  const [uss, setUss] = useState(null);
  // const [points, setPoints] = useState(0);


  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token in fron  -> ", token);
    axios.post("http://localhost:5000/me", {
      token: token,
    }).then((res) => {
      console.log("->** ", res);
      setUss(res.data.user);
      // console.log("uss ", uss);
    }).catch((err) => {
      console.log(err);
    });
  }, []);


  const handleSave = () => {
    console.log("user at save ", uss, points, difficulty);
    const id = uss._id;
    axios.post('http://localhost:5000/update', {
      difficulty: difficulty,
      points: points,
      id: id,
    }).then((res) => {
      console.log("updated data ", res);
    }).catch((err) => {
      console.log("err at update ", err);

    });

  };

  const handleLogout = () => {
    axios.post("http://localhost:5000/logout", {
      id: uss._id,
    }).then((res) => {
      localStorage.setItem("token", "");
      console.log("logout successfully");
    })
    .catch((err) => {
      localStorage.setItem("token", "");
    });

      setSecondsRemaining(30);
      setStatus("loading");
      setMazeSize(5);
      navigate("/");
  };




  let Ans = true;
  let row = currentMaze.Start[0];
  let col = currentMaze.Start[1];

  let points = 0;
  // console.log("userGame ", useGame());
  for (let i = 0; i < inputString.length; i++) {
    if (
      row < 0 ||
      col < 0 ||
      row >= mazeSize ||
      col >= mazeSize ||
      currentMaze.matrix[row][col] === 0
    ) {
      Ans = false;
      break;
    }

    if (inputString[i] !== 'U' && inputString[i] !== 'D' && inputString[i] !== 'L' && inputString[i] !== 'R') {
      Ans = false;
      break;
    }

    if (inputString[i] === "U") {
      row--;
    }
    if (inputString[i] === "D") {
      row++;
    }
    if (inputString[i] === "L") {
      col--;
    }
    if (inputString[i] === "R") {
      col++;
    }
    if (
      row < 0 ||
      col < 0 ||
      row >= mazeSize ||
      col >= mazeSize ||
      currentMaze.matrix[row][col] === 0
    ) {
      Ans = false;
      break;
    }
  }




  let tmp = 0;
  if (Ans && currentMaze.matrix[row][col] === "🚩") {
    console.log("points -> ", "yes correct hai ");
    points += secondsRemaining * 1000;
    points += (miliSecondsRemaining);
    // setPoints(tmp);
  } else {
    // setPoints(0);
    points = 0;
  }


  // setPoints(tmp);
  const percentage = points;

  let emoji;
  if (percentage >= 100) emoji = "🥇";
  if (percentage < 100 && percentage >= 80) emoji = "🥳";
  if (percentage < 80 && percentage >= 50) emoji = "🫠";
  if (percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤯";

  function handleRestart() {
    setSecondsRemaining(30);
    setStatus("loading");
    setMazeSize(5);
    setEnroll("");
    setUserName("");
    navigate("/start");
  }

  return (
    <div style={{
      marginTop: "12rem",
      boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
      backgroundColor: "#f5bb2a",
      border: "1px solid #ccc",
      width: "50%",
      minHeight: "300px",
      borderRadius: "5px",
    }}>
      <p className="result">
        {emoji} You have scored <strong>{points}</strong> out of 30000
      </p>
      {1 && (
        <>
          <h3>Your Answer: {inputString} </h3>
          <h3>
            <strong style={{ color: "green" }}>Correct Answer:</strong>{" "}
            {currentMaze.Path}
          </h3>
        </>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "10px",
          marginTop: "10rem",
        }}
      >
        <button className="btn btn-ui" onClick={handleRestart}>
          Restart Game
        </button>
        <button
          style={{ marginLeft: "10px" }}
          className="btn btn-ui"
          onClick={handleLogout}
        >
          Logout
        </button>
        <button
          style={{ marginLeft: "10px" }}
          className="btn btn-ui"
          onClick={handleSave}
        >
          Save Score
        </button>
      </div>
      <Maze />
    </div>
  );
}
export default FinishScreen;
