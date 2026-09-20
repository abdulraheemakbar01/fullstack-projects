import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children   }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

    const loginSuccess = () => {
    setIsAuthenticated(true);
  };


  const Logout = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false)
    
  }

  return (
    <div>
      <AuthContext.Provider value={{ isAuthenticated ,Logout,loginSuccess}}>{children  }</AuthContext.Provider>
    </div>
  );
};
