import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import DrawerNavigation from "./DrawerNavigation";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import TabNavigation from "./TabNavigation";
import { StatusBar } from "expo-status-bar";

const AppNavigation = () => {

  return (
    <ThemeProvider>
      <NavigationContainer>

        <TabNavigation />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});
