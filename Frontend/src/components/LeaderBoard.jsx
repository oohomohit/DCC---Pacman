import { useEffect, useState } from "react";
import { useGame } from "../contexts/GameContext";
import axios from "axios";

function LeaderBoard() {

  const [EasyDummydata, setEasyData] = useState([]);
  const [MediumDummydata, setMediumData] = useState([]);
  const [HardDummydata, setHardData] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/leaderboard").then((res) => {
      console.log("data at fronted for leaderboard ", res.data);
      setEasyData(res.data.data.easyScore);
      setMediumData(res.data.data.mediumScore);
      setHardData(res.data.data.hardScore);
      setReady(true);
    })
      .catch((err) => console.log(err));
    setReady(true);
  }, []);

  if (!ready) {
    return <div>Loading...</div>;
  }

  EasyDummydata?.sort((a, b) => {
    return b.points - a.points;
  });
  MediumDummydata?.sort((a, b) => {
    return b.points - a.points;
  });
  HardDummydata?.sort((a, b) => {
    return b.points - a.points;
  });
  console.log("easy data ", EasyDummydata);


  return (
    <div>
      <h1 className="leaderboard-title">Leaderboard</h1>
      <div className="leaderboard-container">
        <div className="level-title">Easy Level</div>
        <table className="leaderboard-table">
          <thead>
            <tr className="leaderboard-header">
              <th>Rank</th>
              <th>Username</th>
              <th>points</th>
              <th>EnrollMent No.</th>
              <th>Phone No. </th>
            </tr>
          </thead>
          <tbody>
            {EasyDummydata.slice(0,3).map((user, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{user.username}</td>
                <td>{user.points!==null? user.points : 0}</td>
                <td>{user.enroll}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="level-title">Medium Level</div>
        <table className="leaderboard-table">
          <thead>
            <tr className="leaderboard-header">
              <th>Rank</th>
              <th>Username</th>
              <th>points</th>
              <th>EnrollMent No.</th>
              <th>Phone No. </th>
            </tr>
          </thead>
          <tbody>
            {MediumDummydata.slice(0,3).map((user, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{user.username}</td>
                <td>{user.points!==null? user.points : 0}</td>
                <td>{user.enroll}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="level-title">Hard Level</div>
        <table className="leaderboard-table">
          <thead>
            <tr className="leaderboard-header">
              <th>Rank</th>
              <th>Username</th>
              <th>points</th>
              <th>EnrollMent No.</th>
              <th>Phone No. </th>
            </tr>
          </thead>
          <tbody>
            {HardDummydata.slice(0,3).map((user, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{user.username}</td>
                <td>{user.points!==null? user.points : 0}</td>
                <td>{user.enroll}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaderBoard;
