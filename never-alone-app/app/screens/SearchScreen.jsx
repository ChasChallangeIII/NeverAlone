import { SafeAreaView, StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { useTheme } from '../context/ThemeContext'
import MyText from '../components/textwrappers/MyText'
import BigText from '../components/textwrappers/BigText'


const SearchScreen = () => {
  const { customTheme } = useTheme()
  const styles = createStyles(customTheme)
  return (
    <SafeAreaView style={styles.screen} >
      <View style={styles.container}>
      <BigText>Sök vänner</BigText>
        <TextInput
          style={styles.searchBar}
          placeholder='sök..'
          placeholderTextColor={customTheme.colors.secondary700}
        />
      </View>
    </SafeAreaView>
  )
}

export default SearchScreen

const createStyles = (theme) => StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background50,
  },
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap:20
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