// import { useGame } from "../src/contexts/GameContext";
import { useNavigate } from "react-router-dom";
import { useGame } from "../contexts/GameContext";

export const DifficultyLevel = () => {
  const { difficulty, setMazeSize, MazeInput, setCurrentMaze, setStatus ,setDifficulty} =
    useGame();



  const navigate = useNavigate();
  function handleDifficultyLevel(e) {
    setMazeSize(Number(e.target.value));
    setDifficulty(Number(e.target.value));
  }
  function handleClick() {
    const V = MazeInput();
    setCurrentMaze(V);
    setStatus("active");
    navigate("/mazepage");
  }

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <label
          htmlFor="difficulty"
          style={{ fontSize: "20px", fontWeight: "bold" }}
        >
          Difficulty Level:
        </label>
        <select
          id="difficulty"
          style={{
            fontSize: "20px",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            outline: "none",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
          value={difficulty}
          onChange={handleDifficultyLevel}
        >
          <option value="5">Easy</option>
          <option value="7">Medium</option>
          <option value="9">Hard</option>
        </select>
      </div>

      <button
        className="btn btn-ui"
        // style={{ marginTop: "10px" }}
        onClick={handleClick}
      >
        Let's Start
      </button>
    </>
  );
};
