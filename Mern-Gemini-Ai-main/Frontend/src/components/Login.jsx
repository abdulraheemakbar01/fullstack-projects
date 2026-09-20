import React from "react";
import Google_Gemini_poster from "../assets/Gemini_Poster.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { loginSuccess } = useContext(AuthContext);
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const [Error, setError] = useState("");
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  const HandleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setformData({
      ...formData,
      [name]: value,
    });

    console.log(formData);
  };

  const HandleLogin = async () => {
    setloading(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );

      alert(response.data.Message);

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.Token);
      loginSuccess();

      navigate("/");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.Error || "Something went wrong!");
        console.error("Server Error:", error.response.data);
      }
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#000000]">
      <div className="flex bg-[#000] text-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full">
        {/* Left side image */}
        <div className="w-1/2 hidden md:flex p-10">
          <img
            src={Google_Gemini_poster}
            alt="Gemini Poster"
            className="object-cover h-full w-full rounded-2xl"
          />
        </div>

        {/* Right side (login form) */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-2">Login</h2>
          <p className="text-gray-400 mb-6">
            Welcome back! Please log in to continue.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              HandleLogin();
            }}
            className="flex flex-col gap-4"
          >
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="bg-[#222] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 "
              value={formData.email}
              onChange={HandleChange}
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              className="bg-[#222] rounded-lg px-4 py-3 focus:outline-none focus:ring-2"
              value={formData.password}
              onChange={HandleChange}
            />
            {Error && <span className="text-red-900 text sm">{Error}</span>}
            <button
              type="submit"
              className="bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-800 transition duration-300"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-gray-400 mt-6 text-center">
            Don't have an account?{" "}
            <a href="/signup" className="text-white hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
