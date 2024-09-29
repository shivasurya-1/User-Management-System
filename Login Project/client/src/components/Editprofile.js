import React, { useEffect, useRef, useState } from "react";

import Topnavigaton from "./Topnavigaton";
import { useSelector } from "react-redux";

function Editprofile() {
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let emailInputRef = useRef();
  let ageInputRef = useRef();
  let genderInputRef = useRef();
  let mobileNoInputRef = useRef();
  let profileInputRef = useRef();
  let [profilePic, setProfilePic] = useState();
  let storeObj = useSelector((store) => {
    return store;
  });

  useEffect(() => {
    firstNameInputRef.current.value = storeObj.userDetails.firstName;
    lastNameInputRef.current.value = storeObj.userDetails.lastName;
    ageInputRef.current.value = storeObj.userDetails.age;
    mobileNoInputRef.current.value = storeObj.userDetails.mobileNo;
    emailInputRef.current.value = storeObj.userDetails.email;
    genderInputRef.current.value = storeObj.userDetails.gender;
    setProfilePic(`http://localhost:4567/${storeObj.userDetails.profilePic}`);
  }, [storeObj]);

  let dataToUpdate = async () => {
    let datatToSend = new FormData();
    datatToSend.append("firstName", firstNameInputRef.current.value);
    datatToSend.append("lastName", lastNameInputRef.current.value);
    datatToSend.append("email", emailInputRef.current.value);
    datatToSend.append("mobileNo", mobileNoInputRef.current.value);
    datatToSend.append("age", ageInputRef.current.value);
    datatToSend.append("gender", genderInputRef.current.value);

    for (let i = 0; i <= profileInputRef.current.files.length; i++) {
      datatToSend.append("profilePic", profileInputRef.current.files[i]);
    }

    let reqOptions = {
      method: "PUT",

      body: datatToSend,
    };
    let JSONData = await fetch(
      "http://localhost:4567/updateDetails",
      reqOptions
    );
    let JSData = await JSONData.json();
    console.log(JSData);
    alert(JSData.msg);
  };
  return (
    <div>
      {" "}
      <Topnavigaton></Topnavigaton>
      <div className="auth-container-signup">
        <div className="auth-form">
          <h1>EDIT PROFILE</h1>
          <form>
            <div className="input-group">
              <label> First Name</label>
              <input ref={firstNameInputRef}></input>
            </div>
            <div className="input-group">
              <label>Last Name</label>
              <input ref={lastNameInputRef}></input>
            </div>
            <div className="input-group">
              <label>Email Id</label>
              <input ref={emailInputRef} readOnly></input>
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
                ref={profileInputRef}
                type="file"
                onChange={(eo) => {
                  let selectedProfilePic = URL.createObjectURL(
                    eo.target.files[0]
                  );
                  setProfilePic(selectedProfilePic);
                }}
              ></input>
              <br></br>
              <img alt="" src={profilePic} className="profile-preview"></img>
            </div>
            <div>
              <button
                className="auth-btn"
                type="button"
                onClick={() => {
                  dataToUpdate();
                }}
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Editprofile;
