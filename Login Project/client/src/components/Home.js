import React from "react";
import Topnavigaton from "./Topnavigaton";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  let storeObj = useSelector((store) => {
    return store;
  });

  let navigate = useNavigate();
  let deleteUser = async () => {
    let datatToSend = new FormData();
    datatToSend.append("email", storeObj.userDetails.email);

    let reqOptions = {
      method: "DELETE",

      body: datatToSend,
    };
    let JSONData = await fetch("http://localhost:4567/deleteUser", reqOptions);
    let JSData = await JSONData.json();
    console.log(JSData);
    alert(JSData.msg);
    if (JSData.status === "success") {
      navigate("/");
    }
  };

  return (
    <div className="home-container">
      <Topnavigaton></Topnavigaton>
      <h1>
        Welcome {storeObj.userDetails.firstName} {storeObj.userDetails.lastName}
      </h1>
      <img
        alt=""
        src={`http://localhost:4567/${storeObj.userDetails.profilePic}`}
      ></img>
      <div className="delete-btn-container">
        <button
          className="delete-btn"
          onClick={() => {
            deleteUser();
          }}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default Home;
