import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import DrawerNavigation from "./DrawerNavigation";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import TabNavigation from "./TabNavigation";
import { StatusBar } from "expo-status-bar";
import StackNavigation from "./StackNavigation";

const AppNavigation = () => {

  return (
   
      <NavigationContainer>

        <StackNavigation/>
        {/* <TabNavigation /> */}
      </NavigationContainer>
   
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});
