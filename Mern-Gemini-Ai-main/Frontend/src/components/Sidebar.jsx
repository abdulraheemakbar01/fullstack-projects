import React, { useContext } from "react";
import { MdLogout } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import axios from 'axios'
import { Navigate } from "react-router-dom";
import User_Logo from '../assets/User.png'

const Sidebar = () => {
  const { Logout } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/logout`,{},{withCredentials:true});
      Logout(); // localStorage clear + context update
      Navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="p-5  border-gray-700">
        <div className=" mt-10 md:mt-0 text-xl font-bold text-white">Google Gemini</div>
      </div>

      {/* container 2 */}

      <div className=" flex-1 space-y-2 px-4 py-3 overflow-scroll-auto ">
        <button className="w-full bg-blue-900 text-white px-4 py-2 rounded-xl mb-4">
Learn with AI        </button>
        <div className=" text-center text-sm mt text-gray-500">Gemini can make mistakes. Check important info.
</div>
      </div>

      {/* container 3 */}

      <div className="p-4 border-t border-gray-700">
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-center cursor-pointer">
            <img
              className="rounded-full w-8 h-8"
              src={User_Logo}
              alt="User_Logo"
            />
            <span className="text-gray-300">
              {user ? user.firstName : "My profile"}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className=" flex items-center text-sm px-4 py-2 text-white rounded-lg gap-2 hover:bg-gray-700"
          >
            <MdLogout />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
