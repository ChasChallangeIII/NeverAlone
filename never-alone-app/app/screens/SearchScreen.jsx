import { SafeAreaView, StyleSheet, Text, View, TextInput, Platform, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import MyText from '../components/textwrappers/MyText'
import BigText from '../components/textwrappers/BigText'
import { useUser } from '../context/UserContext'


const SearchScreen = () => {
  const { customTheme, isDark } = useTheme()
  const { username} = useUser()
  const styles = createStyles(customTheme)



  return (
    <SafeAreaView style={styles.screen} >
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={customTheme.colors.background}
      />
      <View style={styles.container}>
      <BigText>Sök vänner</BigText>
        <TextInput
          style={styles.searchBar}
          placeholder='sök..'
          placeholderTextColor={customTheme.colors.secondary700}
          returnKeyType='go'
        />

        <BigText>Hej { username}, vad vill du göra idag?</BigText>
      </View>
    </SafeAreaView>
  )
}

export default SearchScreen

const createStyles = (theme) => StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background50,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  


  },
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    
  },

  searchBar: {
    borderWidth: 1,
    borderColor: theme.colors.secondary800,
    color: theme.colors.secondary800,
    height: 50,
    fontSize: theme.fonts.regular.fontSize,
    fontFamily: theme.fonts.regular.fontFamily,
    paddingHorizontal: 15,
    backgroundColor: theme.colors.backgroundColor,
    width: 300,
    borderRadius: 50,
    textAlignVertical:'top'

  }
})