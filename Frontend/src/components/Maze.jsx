import { useGame } from "../contexts/GameContext";
import styles from "./Maze.module.css";

function Maze() {
  const { currentMaze, status } = useGame();
  return (
    <div style={{ display: "flex", justifyContent: "center", 
    // opacity: status === "ready" ? "1" : "" 
    }}>
      <ul style={{ listStyleType: "none" }} className={styles.container}>
        {currentMaze.matrix.map((row, rowIndex) => (
          <li key={rowIndex}>
            {row.map((cell, colIndex) => (
              <span
                className={styles.item}
                key={colIndex}
                style={{
                  background:status==="ready"? "#1A1E68":(cell === 1 ? '#A0153E' : cell === 0 ? '#1A1E68' : '#212121')
                }}
              >
               {status==='ready'?(cell===1?'*':cell===0?'*':cell):(cell === 1 ? '🐾' : cell === 0 ? '‎' : cell)}

              </span>

            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Maze;
