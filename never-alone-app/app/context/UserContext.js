import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "./ThemeContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isDark } = useTheme();
  const [prefersDark, setPrefersDark] = useState(isDark);

  const togglePrefersDark = async () => {
    setPrefersDark(isDark);
    await AsyncStorage.setItem("prefersDark", isDark);
  };
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUsername(storedUser);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const saveUser = async (user) => {
    try {
      setUser(user);
      await AsyncStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      setError(error.message);
    }
  };

  const clearUser = async (user) => {
    try {
      setUser(null);
      await AsyncStorage.removeItem("user", user);
    } catch (error) {
      setError(error.message);
    }
  };
  const clearError = () => setError(false);

  const value = {
    user,
    isLoading,
    error,
    saveUser,
    clearUser,
    clearError,
    setError,
    prefersDark,
    togglePrefersDark,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
