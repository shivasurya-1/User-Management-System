import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Login() {
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let onLogin = async () => {
    let dataToSend = new FormData();

    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);

    let reqOptions = {
      method: "POST",
      body: dataToSend,
    };
    let JsonData = await fetch("http://localhost:4567/login", reqOptions);
    let JsData = await JsonData.json();
    if (JsData.status === "success") {
      dispatch({ type: "login", data: JsData.data });
      navigate("/home");
    } else {
      alert(JsData.msg);
    }

    console.log(JsData);
  };

  return (
    <div className="auth-container-login">
      <div className="auth-form">
        <h2>Login</h2>
        <form>
          <div className="input-group">
            <label>
              <b>Email Id</b>
            </label>
            <input ref={emailInputRef} placeholder="Enter Your Email"></input>
          </div>
          <div className="input-group">
            <label>
              <b>Password</b>
            </label>
            <input
              type="password"
              ref={passwordInputRef}
              placeholder="Enter Your Password"
            ></input>
          </div>
          <button
            className="auth-btn"
            type="button"
            onClick={() => {
              onLogin();
            }}
          >
            Login
          </button>
          <p className="auth-link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
