import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Image from "../assets/bg.png";

type Props = {
  logo: string;
  illustration: string;
};

const Login: React.FC<Props> = ({ logo, illustration }) => {
  // Move useState hooks inside the component
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  // Navigation function
  const navigateToPage = () => {
    navigate("/system"); // Replace "/dashboard" with your target route
  };

  return (
    <>
      {/* Global Styles */}
      <style>
        {`
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden; /* Prevent scrolling */
          }
          #root {
            height: 100%; /* Ensure the root container fills the viewport */
          }
        `}
      </style>
      <div
        className="flex flex-col md:flex-row items-center justify-center h-screen overflow-hidden"
        style={{
          backgroundImage: "radial-gradient(circle, #000 -2px, transparent 2px)",
          backgroundSize: "20px 20px", // Controls the spacing between dots
        }}
      >
        {/* Form Section */}
        <div className="flex flex-col flex-1 max-w-md w-full bg-white shadow-lg rounded-lg p-6 sm:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src={logo} alt="Logo" className="w-48" />
          </div>

          {/* Welcome Text */}
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
            MINDKORE POS System
          </h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            Please login with your company information.
          </p>
          {/* Helper Text */}
          <p className="text-xs text-gray-500 text-center mb-4">
            Use <span className="font-bold text-red-600">Username: admin</span>{" "}
            and <span className="font-bold text-red-600">Password: admin</span>{" "}
            to log in.
          </p>

          {/* Form */}
          <form className="space-y-4">
            {/* Username Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Update state on input
                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200 text-gray-700"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update state on input
                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200 text-gray-700"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center space-x-2">
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

            {/* Buttons */}
            <button
              type="button"
              onClick={() => {
                if (username === "admin" && password === "admin") {
                  setErrorMessage(""); // Clear any previous error message
                  navigateToPage(); // Navigate to another page
                } else {
                  setErrorMessage("Invalid Username or Password"); // Show error message
                }
              }}
              className="w-full py-3 bg-primary-color text-white font-semibold rounded-lg shadow-md hover:bg-red-300 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Login Now
            </button>
            <button
              type="button"
              className="w-full py-3 border text-primary-color font-semibold rounded-lg shadow-md hover:bg-red-100 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Create Account
            </button>
          </form>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-sm text-red-500 text-center mt-4">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
