import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import Logo from "../Assets/Logo.jpg";
import { useNavigate } from "react-router-dom";
import { addUser } from "../Axios/APICalls";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = () => {
    console.log(formData);
    addUser(formData);
    navigate("/unidish-test/login");
  };
  return (
    <div className="signup">
      <img id="signup_logo_img" src={Logo} alt="App Logo" />
      <div className="signup-logo">
        <h2>UniDish</h2>
      </div>
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <TextField
            className="signup_login_field"
            placeholder="firstname"
            required
            id="firstname"
            onChange={handleChange}
            name="firstname"
            value={formData.firstname}
          />
        </div>
        <div className="form-group">
          <TextField
            className="signup_login_field"
            placeholder="lastname"
            required
            id="lastname"
            onChange={handleChange}
            name="lastname"
            value={formData.lastname}
          />
        </div>
        <div className="form-group">
          <TextField
            className="signup_login_field"
            placeholder="email"
            type="email"
            required
            id="email"
            onChange={handleChange}
            name="email"
            value={formData.email}
          />
        </div>
        <div className="form-group">
          <TextField
            className="signup_login_field"
            placeholder="username"
            type="text"
            required
            id="username"
            onChange={handleChange}
            name="username"
            value={formData.username}
          />
        </div>
        <div className="form-group">
          <TextField
            className="signup_login_field"
            placeholder="password"
            required
            id="password"
            onChange={handleChange}
            name="password"
            value={formData.password}
            type="password"
          />
        </div>
        <div className="form-group">
          <TextField
            className="signup_login_field"
            placeholder="confirm password"
            required
            id="confirm_password"
            onChange={handleChange}
            name="confirmPassword"
            value={formData.confirmPassword}
            type="password"
          />
        </div>
        <div className="form-buttons">
          <Button variant="contained" color="primary" type="submit">
            Sign Up
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginLeft: "10px" }}
            onClick={() => navigate("/unidish-test/login")}
          >
            Go Back
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;