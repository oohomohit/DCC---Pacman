function Rules() {
  return (
    <div style={{ width: "100%" }}>
      <h1 style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        Rules
      </h1>
      <ul
        style={{
          listStyleType: "square",
          paddingLeft: "20px",
          fontFamily: "Arial, sans-serif",
          lineHeight: "1.6",
        }}
      >
        <li>
          <h4 style={{ color: "#4CAF50", fontWeight: "bold" }}>
            Navigate the maze by typing{" "}
            <span style={{ color: "#FF5722" }}>"U"</span> to move up,{" "}
            <span style={{ color: "#FF5722" }}>"D"</span> for down,{" "}
            <span style={{ color: "#FF5722" }}>"L"</span> for left,{" "}
            <span style={{ color: "#FF5722" }}>"R"</span> for right.
          </h4>
        </li>
        <li>
          <h4 style={{ color: "#4CAF50", fontWeight: "bold" }}>
            Play in single mode or team mode with a maximum of 2 members.
          </h4>
        </li>
        <li>
          <h4 style={{ color: "#4CAF50", fontWeight: "bold" }}>
            Pass the levels as: <span style={{ color: "#FF5722" }}>Easy</span>{" "}
            &rarr; <span style={{ color: "#FF5722" }}>Medium</span> &rarr;{" "}
            <span style={{ color: "#FF5722" }}>Hard</span>.
          </h4>
        </li>
        <li>
          <h4 style={{ color: "#4CAF50", fontWeight: "bold" }}>
            Memorize the path of Pacman and input the string of directions (
            <span style={{ color: "#FF5722" }}>R</span>
            <span style={{ color: "#FF5722" }}>L</span>
            <span style={{ color: "#FF5722" }}>U</span>
            <span style={{ color: "#FF5722" }}>D</span>) to guide Pacman’s
            movement.
          </h4>
        </li>
        <li>
          <h4 style={{ color: "#4CAF50", fontWeight: "bold" }}>
            Each participant is allowed to participate in multiple slots
            throughout the event; however, they cannot participate in the same
            time slot more than once.
          </h4>
        </li>
        <li>
          <h4 style={{ color: "#4CAF50", fontWeight: "bold" }}>
            Any intentional violation or breaking of the established rules will
            result in immediate disqualification.
          </h4>
        </li>
      </ul>
    </div>
  );
}

export default Rules;
