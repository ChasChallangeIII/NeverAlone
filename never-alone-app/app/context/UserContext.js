import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "./ThemeContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
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
      const storedUsername = await AsyncStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const saveUsername = async (name) => {
    try {
      setUsername(name);
      await AsyncStorage.setItem("username", name);
    } catch (error) {
      setError(error.message);
    }
  };

  const clearUsername = async (name) => {
    try {
      setUsername(null);
      await AsyncStorage.removeItem("username", name);
    } catch (error) {
      setError(error.message);
    }
  };
  const clearError = () => setError(false);

  const value = {
    username,
    isLoading,
    error,
    saveUsername,
    clearUsername,
    clearError,
    setError,
    prefersDark,
    togglePrefersDark,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
