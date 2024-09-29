import React, { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";

import "../App.css";
function Signup() {
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let ageInputRef = useRef();
  let genderInputRef = useRef();
  let mobileNoInputRef = useRef();
  let profilePicInputRef = useRef();
  let [profilePic, setProfilePic] = useState([]);

  let onSignUp = async () => {
    let dataToSend = new FormData();
    dataToSend.append("firstName", firstNameInputRef.current.value);
    dataToSend.append("lastName", lastNameInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("gender", genderInputRef.current.value);
    dataToSend.append("mobileNo", mobileNoInputRef.current.value);
    for (let i = 0; i <= profilePicInputRef.current.files.length; i++) {
      dataToSend.append("profilePic", profilePicInputRef.current.files[i]);
    }
    let reqOptions = {
      method: "POST",
      body: dataToSend,
    };
    let JsonData = await fetch("http://localhost:4567/register", reqOptions);
    let JsData = await JsonData.json();
    alert(JsData.msg);
    console.log(JsData);
  };
  return (
    <div className="auth-container-signup">
      <div className="auth-form">
        <h2>Sign Up</h2>

        <form>
          <div className="input-group">
            <label>First Name</label>
            <input ref={firstNameInputRef}></input>
          </div>
          <div className="input-group">
            <label>Last Name</label>
            <input ref={lastNameInputRef}></input>
          </div>
          <div className="input-group">
            <label>Email Id</label>
            <input ref={emailInputRef}></input>
          </div>
          <div className="input-group">
            <label>Password</label>
            <input ref={passwordInputRef} type="password"></input>
          </div>
          <div className="input-group">
            <label>Age</label>
            <input ref={ageInputRef}></input>
          </div>
          <div className="input-group">
            <label>Gender</label>
            <input ref={genderInputRef}></input>
          </div>
          <div className="input-group">
            <label>Mobile No</label>
            <input ref={mobileNoInputRef}></input>
          </div>
          <div className="input-group">
            <label>ProfilePic</label>
            <input
              type="file"
              ref={profilePicInputRef}
              onChange={(eo) => {
                let selectedProfilePic = URL.createObjectURL(
                  eo.target.files[0]
                );
                setProfilePic(selectedProfilePic);
              }}
            ></input>
            <br></br>

            <img alt="" src={profilePic} className="profile-preview"></img>
            <br></br>
          </div>

          <br></br>

          <button
            className="auth-btn"
            type="button"
            onClick={() => {
              onSignUp();
            }}
          >
            Sign Up
          </button>
          <p className="auth-link">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
