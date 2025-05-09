import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import HomeScreen from "../screens/HomeScreen";
import React from "react";
import CommunityScreen from "../screens/CommunityScreen";
import { Pressable, Text } from "react-native";
import ReportScreen from "../screens/ReportScreen";
import * as Location from "expo-location";
import SearchScreen from "../screens/SearchScreen";

const handleFakeCall = () => {
  alert("Fake samta på g");
  alertLocation();
};
const alertLocation = async () => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert(status);
      return;
    }
    const location = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = location;

    alert(latitude);
  } catch (error) {
    alert(error);
  }
};

const Tab = createBottomTabNavigator();
const TabNavigation = ({}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        // headerRight: {},
      }}
    >
      {/* <Tab.Screen
        name="Hem"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="notifications" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Fake call"
        component={HomeScreen}
        options={{
          tabBarButton: (props) => (
            <Pressable {...props} onPress={() => handleFakeCall()}>
              <MaterialIcons name="phone" size={24} color={"hotpink"} />
              <Text>RING MIG</Text>
            </Pressable>
          ),
        }}
      />

      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="people" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Rapport"
        component={ReportScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="report" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
