import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '../context/ThemeContext'

const LogoInHeader = () => {
    const { customTheme, isDark } = useTheme()
    const styles = createStyles(customTheme)
    return (
        <Image
            source={isDark ? require("../assets/images/darkLogo2.png") : require("../assets/images/logo2.png")}

            style={styles.logo}

        />
    )
}

export default LogoInHeader

const createStyles = (theme) => StyleSheet.create({
    logo: {
        width: 60,
        height: 60,
        resizeMode: "cover"
    }
})