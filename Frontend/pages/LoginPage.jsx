import React, { useEffect } from "react";
import { useGame } from "../src/contexts/GameContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const { userName, setUserName, enroll, setEnroll, phone, setPhone } =
    useGame();
  const navigate = useNavigate();

  useEffect(() => {
    axios.post("http://localhost:8000/api/loginUser", {
      userName, enroll, phone
    }).then((res) => {
      console.log("->* ", res);
    })
      .catch((err) => { console.log(err) });
  }, []);



  function handleSubmit(e) {
    e.preventDefault();
    if (userName.trim() === "" || enroll.trim() === "" || phone.trim() === "") {
      alert("Please fill all the fields");
      return;
    }
    axios.post("http://localhost:8000/api/login", {
      userName, enroll, phone
    },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withcredentials: true
      },

    ).then((res) => {
      console.log("->* ", res);
      localStorage.setItem("token", res.data.data.accessToken);
      navigate("start");
    }).catch((err) => {
      navigate('/')
    });

    //  navigate("start");
  }

  return (
    <section className="vh-100 w-100  " >
      <div className="container py-5 h-100 ">
        <div className="  row d-flex justify-content-center align-items-center h-100 ">
          <div className="col ">
            <div
              className="card"
              style={{
                borderRadius: "1rem",
                maxWidth: "800px",
                margin: "0 auto",
                backgroundColor: "#f5bb2a",
              }}
            >
              <div className="row">
                <div className="loginPage-imageIcon">
                  <img
                    src="https://imgs.search.brave.com/bgkyyiKg8U7hQzORqygYvLImsJ3AZ1hVtwRZg-nYjvY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9wbmdp/bWcuY29tL3VwbG9h/ZHMvcGFjbWFuL3Nt/YWxsL3BhY21hbl9Q/Tkc5OC5wbmc"
                    alt="pacmanimage"
                    style={{ borderRadius: "1rem" }}
                  />
                </div>
                <div className="w-100  col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i
                          className="fas fa-cubes fa-2x me-3"
                          style={{ color: "#ff6219" }}
                        ></i>
                      </div>

                      <h5
                        className=" w-full text-center"
                        style={{ fontSize: "2.5rem" }}
                      >
                        Enter Details to Play Game
                      </h5>

                      <label className="form-label" htmlFor="form2Example17">
                        <strong>Username</strong>
                      </label>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          required
                          id="form2Example17"
                          className="form-control form-control-lg "
                          value={userName}
                          onChange={(e) =>
                            setUserName(e.target.value.toUpperCase())
                          }
                          placeholder="Your Name"
                        />
                      </div>

                      <label className="form-label" htmlFor="form2Example27">
                        <strong> Enrollment</strong>
                      </label>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="form2Example27"
                          required
                          className="form-control form-control-lg"
                          placeholder="Your Enrollment No."
                          value={enroll}
                          onChange={(e) =>
                            setEnroll(e.target.value.toUpperCase())
                          }
                        />
                      </div>

                      <label className="form-label" htmlFor="form2Example17">
                        <strong>Phone No.</strong>
                      </label>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          required
                          id="form2Example17"
                          className="form-control form-control-lg"
                          value={phone}
                          onChange={(e) =>
                            setPhone(e.target.value.toUpperCase())
                          }
                          placeholder="xxxxxxxxxx"
                        />
                      </div>

                      <div className="buttonDiv ">
                        <button
                          className="btn  btn-dark btn-lg btn-block"
                          type="submit"
                          onClick={handleSubmit}
                        >
                          Enter
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
