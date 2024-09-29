import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

function Topnavigaton() {
  let navigate = useNavigate();
  let storeObj = useSelector((store) => {
    return store;
  });
  useEffect(() => {
    if (storeObj && storeObj.userDetails && storeObj.userDetails.email) {
    } else {
      navigate("/");
    }
  }, [storeObj, navigate]);
  return (
    <nav>
      <div className="nav-links">
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/editProfile">Edit Profile</NavLink>
        <NavLink to="/tasks">Tasks</NavLink>
        <NavLink to="/">Logout</NavLink>
      </div>
    </nav>
  );
}
export default Topnavigaton;
