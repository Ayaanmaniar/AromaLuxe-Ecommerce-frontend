// Login.jsx

import React, { useState } from "react";
import "./Login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {

  // ==========================================
  // STATES
  // ==========================================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  // ==========================================
  // CHECK IF USER IS ALREADY LOGGED IN
  // ==========================================

  let user = null;

  try {

    const savedUser =
      localStorage.getItem("loginUser");

    user = savedUser
      ? JSON.parse(savedUser)
      : null;

  } catch (error) {

    console.error(
      "Login user parsing error:",
      error
    );

    user = null;

  }


  // If user is already logged in
  if (user) {

    return <Navigate to="/" replace />;

  }


  // ==========================================
  // LOGIN FUNCTION
  // ==========================================

  const loginUser = async (event) => {

    event.preventDefault();


    // ========================================
    // LOGIN DATA
    // ========================================

    const loginData = {
      email: email,
      password: password
    };


    console.log(
      "Login Data:",
      loginData
    );


    // ========================================
    // API REQUEST
    // ========================================

    try {

      const response = await axios.post(
        "http://localhost:3000/login",
        loginData
      );


      // ======================================
      // SUCCESS MESSAGE
      // ======================================

      alert(
        response.data.message
      );


      // ======================================
      // SAVE USER
      // ======================================

      localStorage.setItem(
        "loginUser",
        JSON.stringify(response.data.user)
      );


      // ======================================
      // IMPORTANT
      // ======================================
      // Tell Header that loginUser changed.
      // This makes the username appear
      // immediately without refreshing.

      window.dispatchEvent(
        new Event("loginUserUpdated")
      );


      // ======================================
      // REDIRECT HOME
      // ======================================

      navigate("/");

    } catch (error) {

      // ======================================
      // ERROR MESSAGE
      // ======================================

      alert(
        error.response?.data?.message ||
        "Login failed. Please try again."
      );


      console.log(
        "Login Error:",
        error.message
      );


      console.log(
        "Server Error:",
        error.response?.data
      );

    }

  };


  // ==========================================
  // RETURN
  // ==========================================

  return (

    <div className="login-container">


      {/* ======================================
          LEFT SIDE
      ====================================== */}

      <div className="login-left">

        <div className="login-box">


          {/* TITLE */}

          <h1>
            Login
          </h1>


          {/* DESCRIPTION */}

          <p>
            Welcome back! Please login to continue.
          </p>


          {/* ==================================
              LOGIN FORM
          ================================== */}

          <form
            onSubmit={loginUser}
          >


            {/* =================================
                EMAIL
            ================================= */}

            <div className="input-group">

              <label>
                Email
              </label>


              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

            </div>


            {/* =================================
                PASSWORD
            ================================= */}

            <div className="input-group">

              <label>
                Password
              </label>


              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

            </div>


            {/* =================================
                LOGIN BUTTON
            ================================= */}

            <button
              type="submit"
              className="login-btn"
            >

              Login

            </button>


            {/* =================================
                FORGOT PASSWORD
            ================================= */}

            <button
              type="button"
              className="forgot-btn"
              onClick={() =>
                alert(
                  "Forgot password feature"
                )
              }
            >

              Forgotten Password?

            </button>


            {/* =================================
                CREATE ACCOUNT
            ================================= */}

            <Link to="/register">

              <button
                type="button"
                className="account-btn"
              >

                Create an Account

              </button>

            </Link>


          </form>

        </div>

      </div>


      {/* ======================================
          RIGHT SIDE
      ====================================== */}

      <div className="login-right">

        <img
          src="https://static.vecteezy.com/system/resources/previews/015/189/456/large_2x/vertical-view-of-a-bottle-of-women-s-perfume-or-toilet-water-on-a-marble-background-and-peonies-a-copy-space-presentation-of-a-cosmetic-product-photo.jpg"
          alt="Perfume"
        />

      </div>


    </div>

  );

};


export default Login;
