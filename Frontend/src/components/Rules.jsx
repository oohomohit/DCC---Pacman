function Rules() {
  return (
    <div className="rules-container">
      <h1 className="rules-title">Game Rules</h1>
      <div>
        <h4 className="rules-heading">Controls:</h4>
        <p>
          Press <span className="key-command">"U"</span> to move up,{" "}
          <span className="key-command">"D"</span> for down,{" "}
          <span className="key-command">"L"</span> for left,{" "}
          <span className="key-command">"R"</span> for right.
        </p>

        <h4 className="rules-heading">Goal:</h4>
        <p>Navigate through the maze to reach the end point.</p>

        <h4 className="rules-heading">Progression:</h4>
        <p>
          Pass the levels as: <span className="key-command">Easy</span>{" "}
          &rarr; <span className="key-command">Medium</span> &rarr;{" "}
          <span className="key-command">Hard</span>.
        </p>

        <h4 className="rules-heading">How to Play:</h4>
        <p>
          Enter directional commands (<span className="key-command">R</span>,{" "}
          <span className="key-command">L</span>,{" "}
          <span className="key-command">U</span>,{" "}
          <span className="key-command">D</span>) to guide Pacman's movement
          through the maze.
        </p>

        <h4 className="rules-heading">Scoring:</h4>
        <p>Your score is based on the number of moves and time taken.</p>

        <h4 className="rules-heading">Tips:</h4>
        <p>Plan your route carefully to minimize moves and complete levels faster.</p>
      </div>
    </div>
  );
}

export default Rules;
