import axios from "axios";
import hacker from "./hacker.jpg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

// let url = "https://dummyjson.com/auth/login";

// Username - hbingley1 , password - CQutx25i8r
// Username - rshawe2 , password - OWsTbMUgFc

const Login = (prop) => {
  const navigator = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [details, setDetails] = useState({});

  function handleSubmit() {
    if (password == "" || username == "") {
      setMsg("All fields are mandatory");
      return;
    }
    setMsg("");
    setPassword(password);
    setUsername(username);
    axios
      .post("https://dummyjson.com/auth/login", {
        username: username.trim(),
        password: password.trim(),
      })
      .then((response) => {
        console.log(response.data);

        if (response.status == 200) {
          prop.setId(response.data.id);
          prop.setDetail(response.data);
          setDetails(response.data);

          localStorage.setItem("detail1", JSON.stringify(response.data));

          toast(`Welcome ${response.data.firstName},  succesfully logged in`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: false,
            style: {
              backgroundColor: `green`,
              color: "white",
            },
          });
          setTimeout(() => {
            navigator("/profile");
          }, 3000);
        } else {
          toast(
            `Status Code: ${response.status},  error is there please checkout`,
            {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              draggable: false,
              style: {
                backgroundColor: `red`,
                color: "white",
              },
            }
          );
        }
      })
      .catch((error) => {
        toast(`${error.message},  error is there please checkout`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: false,
          style: {
            backgroundColor: `red`,
            color: "white",
          },
        });
        console.log(error);
      });
  }

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("detail1")) || null;
    if (data) {
      if (data.token) {
        setPassword(password);
        setUsername(username);
        prop.setId(data.id);
        setTimeout(() => {
          navigator("./profile");
        }, 3000);
      }
    } else {
      console.log("working");
    }

    // console.log(data);
  }, []);

  return (
    <div id="login">
      {/* <h1 id="community">JOIN OUR WEB-3 COMMUNITY </h1> */}
      <h1>Login</h1>
      Username - rshawe2 , password - OWsTbMUgFc
      <img src={hacker} alt="" id="hackerimg" />
      <input
        type="text"
        placeholder="Username"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      {msg && <p id="pa">{msg}</p>}
      <button
        id="btn"
        onClick={() => {
          handleSubmit();
        }}
      >
        Submit
      </button>
      <ToastContainer />
    </div>
  );
};
export default Login;
