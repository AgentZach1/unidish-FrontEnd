import "./App.css";
import { checkDBConnection, getTableFromDB } from "./Axios/APICalls";
import Button from "@mui/material/Button";
import GetTableButton from "./GetTableButton";
import React, {useState} from 'react';
import Topbar from "./Components/Topbar";
import Sidebar from "./Components/Sidebar";
import DiningHall from "./Pages/DiningHall";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Pages/Signup";
import Login from "./Pages/Login";
import { useSelector } from "react-redux";
import Restaurant from "./Pages/Restaurant";
import Profile from "./Pages/Profile";

function App() {

  const isLoggedIn = useSelector((state) => state.user.userInfo);

  if (isLoggedIn) {
    return (
      <div className="App">
        <BrowserRouter>
          <Topbar />
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/unidish-test/DiningHalls" element={<DiningHall />} />
              <Route
                path="/unidish-test/restaurants/:restaurantId"
                element={<Restaurant />}
              />
              <Route path="/unidish-test/Profile" element={<Profile />} />
              {/* <Route path="/" element={<DiningHall />} /> */}
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/unidish-test/login" element={<Login />} />
        <Route path="/unidish-test/signup" element={<SignUp />} />
        {/* Redirect to /login by default if none of the above routes match */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
