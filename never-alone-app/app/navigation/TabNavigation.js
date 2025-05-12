import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import HomeScreen from "../screens/HomeScreen";
import React, { useState } from "react";
import CommunityScreen from "../screens/CommunityScreen";
import { Button, Modal, Pressable, Text } from "react-native";
import ReportScreen from "../screens/ReportScreen";
import * as Location from "expo-location";
import SearchScreen from "../screens/SearchScreen";
import { handleFakeCall } from "../services/fakeCall";
import PhoneCall from "../components/PhoneCall";

const Tab = createBottomTabNavigator();
const TabNavigation = ({ }) => {
  
  const[isModalShown, setIsModalShown] = useState(false)
  

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
            <>
              <Pressable
                {...props}
                onPress={() => {
                  // handleFakeCall();
                  setIsModalShown(true)
                }}
              >
                <MaterialIcons name="phone" size={24} color={"hotpink"} />
                <Text>RING MIG</Text>
              </Pressable>
              <PhoneCall visible={isModalShown} onClose={()=>setIsModalShown(false)}/>
              {/* <Modal visible={isModalShown}>
                        <Text>Hej!!</Text>
                <Button onPress={() => setIsModalShown(false)}
                  title="hejdå" />
                
                    </Modal> */}
            </>
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
