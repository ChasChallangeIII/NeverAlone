import React, { createContext, useContext, useEffect, useState } from "react";
import {
  deleteFromSecureStore,
  getFromSecureStore,
  saveToSecureStore,
} from "../services/securesStore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await getFromSecureStore("userToken");
      if (storedToken) {
        setUserToken(storedToken);
      }
      setIsLoading(false);
    };
    loadToken();
  }, []);

  const logIn = async (token) => {
    setUserToken(token);
    await saveToSecureStore("userToken", token);
  };
  const logOut = async () => {
    setUserToken(null);
    await deleteFromSecureStore("userToken");
  };

  const value = { logIn, logOut, isLoading, userToken };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
