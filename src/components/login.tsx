import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";
import logo from "../assets/pos.png";

// ✅ Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_REACT_APP_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Login = () => {
  const [email, setEmail] = useState(""); // ✅ Changed to email-based login
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      // ✅ Authenticate using Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
      if (error) {
        throw error; // ✅ Ensure error is thrown for handling
      }
  
      // ✅ Fetch company details after successful login
      const { user } = data;
      if (user) {
        const { data: companyData, error: companyError } = await supabase
          .from("companies")
          .select("company_logo, company_username")
          .eq("company_email", email)
          .single();
  
        if (companyError) {
          console.error("Error fetching company details:", companyError);
          Swal.fire("Error", "Could not load company details.", "error");
          return;
        }
  
        // ✅ Store session and company details
        localStorage.setItem("username", companyData.company_username);
        localStorage.setItem("logo", companyData.company_logo);
  
        Swal.fire("Success", "Login successful!", "success").then(() => {
          navigate("/system"); // ✅ Redirect to dashboard
        });
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred"; // ✅ Safe error handling
  
      console.error("Login Error:", errorMessage);
      Swal.fire("Login Failed", errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <style>
        {`
          html, body { margin: 0; padding: 0; height: 100%; overflow: hidden; }
          #root { height: 100%; }
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
            Please login with your company credentials.
          </p>

          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <input
                type="email"
                placeholder="Company Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200 text-gray-700"
                required
              />
            </div>

            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200 text-gray-700"
                required
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
