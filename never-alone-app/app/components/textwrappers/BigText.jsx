import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '../../context/ThemeContext'

const BigText = ({children, style=null}) => {
    const { customTheme } = useTheme()
     const styles = createStyles(customTheme)
     return (
 
         <Text style={[styles.text, style]}>{children}</Text>
 
     )
 }
 
export default BigText
 
 const createStyles = (theme) => StyleSheet.create({
     text: {
         fontFamily: theme.fonts.semibold.fontFamily,
         fontSize: theme.fonts.semibold.fontSize,
         color: theme.colors.text,


     }
 })