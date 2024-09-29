import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Editprofile from "./components/Editprofile";
import Logout from "./components/Logout";
import Home from "./components/Home";
import Tasks from "./components/Tasks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>} />
        <Route
          path="/editprofile"
          element={<Editprofile></Editprofile>}
        ></Route>
        <Route path="/" element={<Logout></Logout>} />
        <Route path="/home" element={<Home></Home>} />
        <Route path="/tasks" element={<Tasks></Tasks>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
