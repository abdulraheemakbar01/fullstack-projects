import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Home, CreatePost } from "./pages/index.js";
import logo from "./assets/logo.svg";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <header className="w-full flex justify-between items-center bg-white sm:px-8  px-4 py-4 border-b border-b-[#e6ebf4] ">
          <Link to="/">
            {" "}
            <img src={logo} alt="logo" className="w-28 object-contain" />{" "}
          </Link>
          <Link
            to="/CreatePost"
            className="font-medium text-white bg-[#6769ff]  px-4 py-2 rounded-md "
          >
            {" "}
            Create{" "}
          </Link>
        </header>

        <main className="w-full px-4 py-8 bg-[#f9fafe]  min-h-[calc(100vh-73px)]  ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createPost" element={<CreatePost />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
