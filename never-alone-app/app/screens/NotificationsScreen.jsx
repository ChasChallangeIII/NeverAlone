import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '../context/ThemeContext'
import MyText from '../components/textwrappers/MyText'
import BigText from '../components/textwrappers/BigText'

const NotificationsScreen = () => {
    const { customTheme } = useTheme()
    const styles = createStyles(customTheme)
  return (
    <SafeAreaView style={styles.screen}>
         <View style={styles.container}>
        <BigText>NotificationsScreen</BigText>
      </View>
    </SafeAreaView>
  )
}

export default NotificationsScreen

const createStyles = (theme) => StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background50,
  },
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20
  },
})