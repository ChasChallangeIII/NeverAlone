import { StyleSheet, Text, View } from "react-native";
import React, { createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {



  const value = {};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

const styles = StyleSheet.create({});
