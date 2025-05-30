import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '../../context/ThemeContext'

const MyText = ({ children, style = null, ...props }) => {
    const { customTheme } = useTheme()
    const styles = createStyles(customTheme)
    return (

        <Text
            style={[styles.text, style]}
            {...props}>
            {children}
        </Text>

    )
}

export default MyText

const createStyles = (theme) => StyleSheet.create({
    text: {
        fontFamily: theme.fonts.regular.fontFamily,
        fontSize: theme.fonts.regular.fontSize,
        color: theme.colors.text,
    }
})