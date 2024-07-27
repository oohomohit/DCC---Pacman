import { useNavigate } from "react-router-dom";
import { useGame } from "../contexts/GameContext";

function SubmitButton({handleSubmit}) {
  const { status, setStatus } = useGame();
  const navigate = useNavigate();

  // function handleSubmit() {
  //   setStatus("loading")
  //   navigate("/result");
  // }

  return (
    <div>
      {status === "active" && (
        <button className="btn btn-ui" onClick={() => setStatus("ready")}>
          Ready
        </button>
      )}
      {status === "ready" && (
        <button className="btn btn-ui" onClick={handleSubmit}>
          Submit
        </button>
      )}
    </div>
  );
}

export default SubmitButton;
