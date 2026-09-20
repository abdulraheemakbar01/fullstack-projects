import React, { useState } from "react";
import axios from "axios";
import Google_Gemini_poster from "../assets/Gemini_Poster.jpg";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
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

  const HandleSingup = async () => {
    setloading(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/signup`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );

      alert(response.data.Message);
      navigate("/login");
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
        <div className="w-1/2 hidden md:flex  p-14">
          <img
            src={Google_Gemini_poster}
            alt="Google_Gemini_poster"
            className="object-cover h-full w-full rounded-2xl"
          />
        </div>

        {/* Right side (signup form) */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-2">Sign Up</h2>
          <p className="text-gray-400 mb-6">Create your account to join us</p>

          <form   onSubmit={(e)=>{
            e.preventDefault();
            HandleSingup()
          }}  className="flex flex-col gap-4" >
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              className="bg-[#222] rounded-lg px-4 py-3 focus:outline-none"
              value={formData.firstName}
              onChange={HandleChange}
            />

            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              className="bg-[#222] rounded-lg px-4 py-3 focus:outline-none"
              value={formData.lastName}
              onChange={HandleChange}
            />
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
{loading? "Signing...":"Signup"}
            </button>
          </form>

          <p className="text-sm text-gray-400 mt-6 text-center">
            Already a member?{" "}
            <a href="/login" className="text-white hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
