import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import HomeScreen from "../screens/HomeScreen";
import React, { useState } from "react";
import CommunityScreen from "../screens/CommunityScreen";
import {
  Button,
  Image,
  Modal,
  Platform,
  Pressable,
  StatusBar,
  Text,
} from "react-native";
import ReportScreen from "../screens/ReportScreen";
import * as Location from "expo-location";
import SearchScreen from "../screens/SearchScreen";

import NotificationsScreen from "../screens/NotificationsScreen";
import MyText from "../components/textwrappers/MyText";
import CallMeButton from "../components/CallMeButton";
import { useTheme } from "../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import Settings from "../components/Settings";
import LogoInHeader from "../components/LogoInHeader";
import Entypo from "@expo/vector-icons/Entypo";
import { useFakeCall } from "../context/FakeCallContext";
import BigText from "../components/textwrappers/BigText";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const Tab = createBottomTabNavigator();
const TabNavigation = ({}) => {
  const { customTheme, isDark } = useTheme();
  const { reportNotification } = useFakeCall();

  return (
    <>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={customTheme.colors.background}
      />
      <Tab.Navigator
        screenOptions={{
          headerShown: true,
          headerTitleStyle: {
            fontFamily: customTheme.fonts.regular.fontFamily,
          },
          headerTitleAlign: "left",
          headerTintColor: customTheme.colors.text,
          headerRightContainerStyle: { paddingRight: 10 },

          headerStyle: {
            backgroundColor: customTheme.colors.background,
            height: Platform.OS === "ios" ? 120 : 100,
            paddingRight: 40,
          },
          headerLeft: () => <LogoInHeader />,
          headerRight: () => <Settings />,
          tabBarStyle: {
            backgroundColor: customTheme.colors.background,
            overflow: "visible",
            position: "absolute",
          },
          tabBarLabelStyle: {
            fontFamily: customTheme.fonts.regular.fontFamily,
          },
          tabBarActiveTintColor: customTheme.colors.primary,
          tabBarInactiveTintColor: customTheme.colors.text800,

          animation: "shift",
        }}
      >
        <Tab.Screen
          name="Search"
          // headerTitle='kko'
          component={SearchScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="search" size={size} color={color} />
            ),
            headerTitle: "Hitta vänner",
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{
            tabBarIcon: ({ color, size }) =>
              reportNotification ? (
                <>
                  <MaterialIcons
                    name="notifications-active"
                    size={size}
                    color={color}
                  />
                </>
              ) : (
                <MaterialIcons name="notifications" size={size} color={color} />
              ),

            tabBarBadge: reportNotification ? 1 : null,
            tabBarBadgeStyle: {
              backgroundColor: customTheme.colors.secondary400,
              color: customTheme.colors.text,
              left: "90%",
            },
            headerTitle: "Aviseringar",
          }}
        />
        <Tab.Screen
          name="Fake call"
          component={HomeScreen}
          options={{
            tabBarButton: (props) => <CallMeButton props={props} />,
          }}
        />

        <Tab.Screen
          name="Community"
          component={CommunityScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="flower" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Friends"
          component={ReportScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6
                name="hand-holding-heart"
                size={size}
                color={color}
              />
            ),
            headerTitle: "Rapportera händelse",
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default TabNavigation;
