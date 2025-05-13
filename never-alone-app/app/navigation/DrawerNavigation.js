import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SettingsScreen from "../screens/SettingsScreen";
import AboutScreen from "../screens/AboutScreen";
import TabNavigation from "./TabNavigation";
import CustomDrawerContent from "./CustomDrawerContent";
import BLEScreen from "../screens/BLEScreen";

const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator drawerContent={(props)=> CustomDrawerContent({...props})}>
      <Drawer.Screen name="Startsida" component={TabNavigation} />
      <Drawer.Screen name="Om oss" component={AboutScreen} />
      <Drawer.Screen name="Intsällningar" component={SettingsScreen} />
      <Drawer.Screen name="Bluetooth" component={BLEScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({});
