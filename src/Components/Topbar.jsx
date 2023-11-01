import { Button } from "@mui/material";
import * as React from "react";
import Logo from "../Assets/Logo.jpg";
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/userActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { persistStore } from "redux-persist";
import store from "../Redux/store";
const Topbar = () => {
  // let currUser;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.user.userInfo);
  const handleLogout = () => {
    localStorage.removeItem("token");
    const persistor = persistStore(store);
    persistor.purge(); // This will purge the persisted state
    dispatch(logout()); // Dispatch the logout action to clear user-related state
    navigate("/unidish-test/login");
  };
  const handleHome = () => {
    navigate(`/unidish-test/DiningHalls`);
  };
  const handleProfile = () => {
    navigate(`/unidish-test/Profile`);
  };
  return (
    <div className="topbar">
      <div className="topbar-left">
        <Button
        className="topbar-button"
        onClick={handleHome}
        >
          <img className="topbar-logo" src={Logo} alt="App Logo" />
        </Button>
        
        <h3 className="topbar-title">UniDish</h3>
        <h3 className="topbar-welcome">
          Welcome {currUser ? currUser.user.firstname : ":P"}
        </h3>
      </div>
      <div className="topbar-buttons">
        <Button
          className="topbar-button"
          variant="contained"
            onClick={handleProfile}
        >
          Profile
        </Button>
        <Button
          className="topbar-button"
          variant="contained"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Topbar;