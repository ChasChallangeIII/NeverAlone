import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import TabNavigation from "./TabNavigation";
import { useUser } from "../context/UserContext";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const { username } = useUser();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {},
      }}
    >
      {!username ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <Stack.Screen name="Home" component={TabNavigation} />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
