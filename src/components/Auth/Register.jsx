import React, { useState } from "react";
import "./Register.css";
import { Link, Navigate,useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {

  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmpassword, setConfirmpassword] = useState("")
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem("loginUser"))
  if(user){
    return <Navigate to="/" />
  }

  const registerUser = async (event) => {

    event.preventDefault();

    let userData = {
      fullname: fullname,
      email: email,
      password: password,
      confirmpassword: confirmpassword,
    };

    console.log(userData);

    try {
      const response = await axios.post("http://localhost:3000/register", userData)
      alert("Registered successfully")
      navigate("/login")
    } catch (error) {
      alert("Something went wrong")
      console.log(error.message);
      // console.log(error.response?.data);

    }
  }
  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Register</h1>
        <p>Create your account to get started.</p>

        <form onSubmit={registerUser}>
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)} required
            />

          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)} required
            />
          </div>

          <button type="submit" className="register-btn">
            Create Account
          </button>

          <Link to="/login" className="login-link">
            Already have an account? Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;