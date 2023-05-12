import { useEffect } from "react";
import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);

  const checkLogin = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      console.log(token)
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }
  };
useEffect(()=>{
    checkLogin()
},[])


  const [isLoggedIn, setIsLoggedIn] = useState(null);
  console.log(isLoggedIn)
  const login = (user, token) => {
    setUser(user);
    setIsLoggedIn(true);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider
      value={{isLoggedIn ,setIsLoggedIn, login, logout,userName }}
    >
      {children}
    </UserContext.Provider>
  );
};
