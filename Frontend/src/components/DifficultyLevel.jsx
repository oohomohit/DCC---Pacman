// import { useGame } from "../src/contexts/GameContext";
import { useNavigate } from "react-router-dom";
import { useGame } from "../contexts/GameContext";

export const DifficultyLevel = () => {
  const { difficulty, setMazeSize, MazeInput, setCurrentMaze, setStatus, setDifficulty } =
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
      <div className="difficulty-option">
        <label htmlFor="difficulty" className="difficulty-label">
          Difficulty Level:
        </label>
        <select
          id="difficulty"
          className="difficulty-select"
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
        onClick={handleClick}
      >
        Let's Start
      </button>
    </>
  );
};
