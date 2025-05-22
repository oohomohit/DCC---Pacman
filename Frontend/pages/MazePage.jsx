import Header from "../src/components/Header";
import Maze from "../src/components/Maze";
import Timer from "../src/components/Timer";
import SubmitButton from "../src/components/SubmitButton";
import Footer from "../src/components/Footer";
import Main from "../src/components/Main";
import { useGame } from "../src/contexts/GameContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../src/styles/pages.css";

function MazePage() {
  const navigate = useNavigate();
  const { status, inputString, setInputString, setStatus } = useGame();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    setInputString("");
  }, [setInputString, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    navigate("/result");
  }

  return (
    <div className="maze-container">
      <div className="maze-content">
        <Header />
        <div className="timer-container">
          <Timer />
        </div>
        <Main>
          <Maze />
          <div className="input-container">
            <Footer>
              <form onSubmit={handleSubmit}>
                <input
                  value={inputString}
                  className="maze-input"
                  type="text"
                  placeholder="Your Answer"
                  onChange={(e) => setInputString(e.target.value.toUpperCase())}
                  disabled={status !== "ready"}
                />
                <div className="submit-button-container">
                  <SubmitButton handleSubmit={handleSubmit} />
                </div>
              </form>
            </Footer>
          </div>
        </Main>
      </div>
    </div>
  );
}

export default MazePage;
