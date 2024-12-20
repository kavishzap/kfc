import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import logo from "../assets/pos.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_REACT_APP_LOGIN_URL;

  const handleLogin = async () => {
    setLoading(true);
    try {
      console.log("url", `${API_URL}?company_username=eq.${username}`);
      const response = await axios.get(
        `${API_URL}?company_username=eq.${username}`,
        {
          headers: {
            apikey: import.meta.env.VITE_REACT_APP_ANON_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_ANON_KEY}`,
          },
        }
      );

      const data = response.data;

      if (data.length > 0) {
        const user = data[0];
        if (user.company_password === password) {
          localStorage.setItem("username", username);
          localStorage.setItem("logo", user.company_logo);
          console.log("Login successful for", username);
          navigate("/system");
        } else {
          Swal.fire({
            title: "Login Failed",
            text: "Invalid Password",
            icon: "error",
            confirmButtonText: "Try Again",
          });
        }
      } else {
        Swal.fire({
          title: "Login Failed",
          text: "Username not found",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while logging in. Please try again later.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>
        {`
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden; 
          }
          #root {
            height: 100%; 
          }
        `}
      </style>
      <div
        className="flex items-center justify-center min-h-screen overflow-hidden bg-gray-100"
        style={{
          backgroundImage:
            "radial-gradient(circle, #000 -2px, transparent 2px)",
          backgroundSize: "20px 20px",
        }}
      >
        <div className="flex flex-col max-w-xs sm:max-w-sm lg:max-w-md w-full bg-white shadow-lg rounded-lg p-6 space-y-4">
          <div className="flex justify-center">
            <img src={logo} alt="Logo" className="w-24 sm:w-32" />
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-gray-800 text-center">
            MINDKORE POS System
          </h2>
          <p className="text-sm text-gray-600 text-center">
            Please login with your company information.
          </p>

          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200 text-gray-700"
              />
            </div>

            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200 text-gray-700"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
              >
                {passwordVisible ? (
                  <FaEyeSlash size={18} />
                ) : (
                  <FaEye size={18} />
                )}
              </button>
            </div>

            <div className="flex justify-between items-center text-xs">
              <label className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  className="form-checkbox rounded text-blue-500 focus:ring focus:ring-blue-200"
                />
                <span>Remember Me</span>
              </label>
              <a href="#" className="text-red-500 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="button"
              onClick={handleLogin}
              className="w-full py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200 flex justify-center items-center"
            >
              {loading ? (
                <svg
                  className="w-5 h-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                "Login Now"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
