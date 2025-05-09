import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import DrawerNavigation from "./DrawerNavigation";

const AppNavigation = () => {
  return (
    <NavigationContainer>
      {/* <TabNavigation />
       */}
      <DrawerNavigation />
    </NavigationContainer>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});
