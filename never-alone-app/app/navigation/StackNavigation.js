import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import TabNavigation from "./TabNavigation";
import { useAuth } from "../context/AuthContext";
import OngoingCallScreen from "../screens/OngoingCallScreen";
import IncomingCallScreen from "../screens/IncomingCallScreen";
import ReportScreen from "../screens/ReportScreen";
import PostScreen from "../screens/PostScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SignUpScreen from "../screens/SignUpScreen";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const { userToken } = useAuth();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {},
      }}
    >
      {!userToken ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <>
          <Stack.Screen name="Main" component={TabNavigation} />
          <Stack.Screen
            name="IncomingCallScreen"
            component={IncomingCallScreen}
            options={{
              presentation: "modal",
              animation: "fade_from_bottom",
            }}
          />
          <Stack.Screen
            name="OngoingCallScreen"
            component={OngoingCallScreen}
            options={{
              presentation: "modal",
              animation: "fade_from_bottom",
            }}
          />
          <Stack.Screen
            name="ReportScreen"
            component={ReportScreen}
            options={{
              presentation: "modal",
              animation: "fade_from_bottom",
            }}
          />
          <Stack.Screen
            name="PostScreen"
            component={PostScreen}
            options={{
              presentation: "modal",
              animation: "fade_from_bottom",
            }}
          />
          <Stack.Screen
            name="SettingsScreen"
            component={SettingsScreen}
            options={{
              presentation: "modal",
              animation: "fade_from_bottom",
            }}
          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={{
              presentation: "modal",
              animation: "fade_from_bottom",
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
