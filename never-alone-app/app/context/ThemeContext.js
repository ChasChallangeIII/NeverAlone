import React, { createContext, useContext, useEffect, useState } from "react";
import { darkTheme, lightTheme } from "../themes/colors";
import { buildCustomTheme } from "../themes/customTheme";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [isDark, setIsDark] = useState(true)
    const chosenTheme = isDark ? darkTheme : lightTheme
    const customTheme = buildCustomTheme(chosenTheme, isDark)
    const toggleTheme = () => setIsDark(prev => !prev)
    const [fontsLoaded, error] = useFonts({
      "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
      "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    });
    useEffect(() => {
        if (fontsLoaded || error) {
            SplashScreen.hideAsync()
        }
    }, [fontsLoaded, error])
    if (!fontsLoaded && !error) {
        return null
    }

    const value = {
      customTheme,
      toggleTheme,
      isDark
    };





    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
    
};


export const useTheme = () => useContext(ThemeContext)

