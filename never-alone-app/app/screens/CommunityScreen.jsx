import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MyText from '../components/textwrappers/MyText'
import { useTheme } from '../context/ThemeContext'
import BigText from '../components/textwrappers/BigText'

const CommunityScreen = () => {
    const { customTheme } = useTheme()
      const styles = createStyles(customTheme)
  return (
    < >
      
      <SafeAreaView style={styles.screen}>
        <View style={styles.container}>
          <BigText>CommunityScreen</BigText>
        </View>
      </SafeAreaView>
    </>
  )
}

export default CommunityScreen

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