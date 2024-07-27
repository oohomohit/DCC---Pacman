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

  // const { LeaderBoard } = useGame();

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
      <h1 style={{ width: "100%", display: "flex",  justifyContent: "center" ,backgroundColor:"#e85e0e" ,marginBottom:"20px" }}>Leaderboard</h1>
      <div style={{ width: "100%", display: "flex",flexDirection:"column",  justifyContent: "center" }}>
        <div >
          <div style={{ fontSize: "3rem", fontWeight: "bold",color:"green"  }}>Easy Level</div>
          <table style={{ borderCollapse: "separate", borderSpacing: "30px" }}>
            <thead>
              <tr style={{fontSize:"2rem"}}>
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
        </div>
        <div >
          <div style={{ fontSize: "3rem", fontWeight: "bold",color:"green" }}>Medium Level</div>
          <table style={{ borderCollapse: "separate", borderSpacing: "30px" }}>
            <thead>
              <tr style={{fontSize:"2rem"}}>
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
        </div>
        <div >
          <div style={{ fontSize: "3rem", fontWeight: "bold",color:"green" }}>Hard Level</div>
          <table style={{ borderCollapse: "separate", borderSpacing: "30px" }}>
            <thead>
              <tr style={{fontSize:"2rem"}} >
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

    </div>
  );
}

export default LeaderBoard;
