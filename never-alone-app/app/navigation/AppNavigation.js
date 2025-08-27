import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";

import StackNavigation from "./StackNavigation";

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});
