// import { useEffect } from "react";
// import { useGame } from "../contexts/GameContext";

// function Timer() {
//   const { secondsRemaining, setSecondsRemaining, status, setStatus } =
//     useGame();
//   const mins = Math.floor(secondsRemaining / 60);
//   const seconds = secondsRemaining % 60;
//   useEffect(
//     function () {
//       if (status === "ready") return;
//       if (secondsRemaining === 0) {
//         setStatus("ready");
//       }
//       const id = setInterval(function () {
//         setSecondsRemaining((cur) => cur - 1);
//       }, 1000);
//       return () => clearInterval(id);
//     },
//     [status, secondsRemaining, setStatus, setSecondsRemaining]
//   );

//   return (
//     <div className="timer">
//       {mins < 10 ? "0" : ""}
//       {mins}:{seconds < 10 ? "0" : ""}
//       {seconds}
//     </div>
//   );
// }

// export default Timer;



import React, { useEffect, useState } from "react";
import { useGame } from "../contexts/GameContext";

function Timer() {
  const { secondsRemaining, setMiliSecondsRemaining, miliSecondsRemaining, setSecondsRemaining, status, setStatus } = useGame();
  // const [miliSecondsRemaining, setMiliSecondsRemaining] = useState(0);

  useEffect(() => {
    if (status === "ready") return;

    const id = setInterval(() => {
      if (secondsRemaining === 0 && miliSecondsRemaining === 0) {
        clearInterval(id);
        setStatus("ready");
      } else {
        if (miliSecondsRemaining === 0) {
          setSecondsRemaining((prevSeconds) => prevSeconds - 1);
          setMiliSecondsRemaining(999);
        } else {
          setMiliSecondsRemaining((prevMillis) => prevMillis - 1);
        }
      }
    }, 1); // Update every millisecond

    return () => clearInterval(id);
  }, [status, secondsRemaining, miliSecondsRemaining, setStatus, setSecondsRemaining]);

  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  return (
    <div className="timer">
      {mins < 10 ? "0" : ""}
      {mins}:{seconds < 10 ? "0" : ""}
      {seconds}:{miliSecondsRemaining < 100 ? "0" : ""}
      {miliSecondsRemaining < 10 ? "0" : ""}
      {miliSecondsRemaining}
    </div>
  );
}

export default Timer;

