import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import HomeScreen from "../screens/HomeScreen";
import React from "react";
import CommunityScreen from "../screens/CommunityScreen";
import { Platform, StatusBar } from "react-native";
import SearchScreen from "../screens/SearchScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import CallMeButton from "../components/CallMeButton";
import { useTheme } from "../context/ThemeContext";
import LogoInHeader from "../components/LogoInHeader";
import { useFakeCall } from "../context/FakeCallContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FriendsScreen from "../screens/FriendsScreen";
import SettingsButton from "../components/SettingsButton";

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
          },
          headerLeft: () => <LogoInHeader />,
          headerRight: () => <SettingsButton />,
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
            tabBarAccessibilityLabel: reportNotification
              ? "Aviseringar, 1 oläst"
              : "Aviseringar, inga nya",
          }}
        />
        <Tab.Screen
          name="Fake call"
          component={HomeScreen}
          options={{
            tabBarButton: (props) => <CallMeButton props={props} />,
            tabBarAccessibilityLabel: "tryck här för att få ett falskt samtal",
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
          component={FriendsScreen}
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
