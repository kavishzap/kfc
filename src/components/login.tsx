import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

type Props = {
  logo: string;
  illustration: string;
};

const Login: React.FC<Props> = ({ logo }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const navigateToPage = () => {
    navigate("/system");
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
        className="flex flex-col md:flex-row items-center justify-center min-h-screen overflow-hidden p-4 bg-gray-100"
        style={{
          backgroundImage: "radial-gradient(circle, #000 -2px, transparent 2px)",
          backgroundSize: "20px 20px",
        }}
      >
        <div className="flex flex-col flex-1 max-w-xs sm:max-w-sm lg:max-w-md w-full bg-white shadow-lg rounded-lg p-4 sm:p-6">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Logo" className="w-24 sm:w-32" />
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-gray-800 text-center mb-3">
            MINDKORE POS System
          </h2>
          <p className="text-sm text-gray-600 text-center mb-4">
            Please login with your company information.
          </p>
          <p className="text-xs text-gray-500 text-center mb-3">
            Use <span className="font-bold text-red-600">Username: admin</span> and
            <span className="font-bold text-red-600"> Password: admin</span> to log in.
          </p>

          <form className="space-y-3">
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
              onClick={() => {
                if (username === "admin" && password === "admin") {
                  navigateToPage();
                } else {
                  Swal.fire({
                    title: "Login Failed",
                    text: "Invalid Username or Password",
                    icon: "error",
                    iconColor: "#ff0000",
                    confirmButtonText: "Try Again",
                    confirmButtonColor: "#ff0000",
                  });
                }
              }}
              className="w-full py-2 bg-primary-color text-white font-semibold rounded-lg shadow-md hover:bg-red-300 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Login Now
            </button>

            <button
              type="button"
              onClick={() => {
                Swal.fire({
                  title: "Contact Us",
                  text: "Please visit our official page to contact us for service.",
                  icon: "info",
                  iconColor: "#ff0000",
                  showConfirmButton: false,
                  footer:
                    '<a href="https://yourwebsite.com" target="_blank">Visit Official Page</a>',
                });
              }}
              className="w-full py-2 border text-primary-color font-semibold rounded-lg shadow-md hover:bg-red-100 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
