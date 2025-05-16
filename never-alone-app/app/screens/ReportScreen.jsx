import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import MyText from '../components/textwrappers/MyText'
import BigText from '../components/textwrappers/BigText'
import { useTheme } from '../context/ThemeContext'


const ReportScreen = () => {
  const { customTheme, isDark } = useTheme()
  const styles = createStyles(customTheme, isDark)
  return (
    <SafeAreaView style= {styles.screen} >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
      
        behavior= {Platform.OS==='ios'?'padding':'height'}
        keyboardVerticalOffset={100}
      >
        <ScrollView  contentContainerStyle={styles.container}>
          <MyText>Vad har hänt? Betätta - vi finns här, läser och lyssnar! ♡</MyText>
        
          <TextInput
            style={styles.textarea}
            multiline
            placeholder='Berätta..'
            placeholderTextColor={customTheme.colors.text}
            returnKeyType='go'
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ReportScreen

const createStyles = (theme, isDark) => StyleSheet.create({
  screen: {
    flex:1,
    backgroundColor: theme.colors.background50,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0

  },
  container: {
    padding: 20,
    gap: 30,
    // paddingBottom:40
  },
  textarea: {
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: isDark ? theme.colors.secondary700 : theme.colors.primary100,
    minHeight: 400,
    backgroundColor: isDark ? theme.colors.primary100 : theme.colors.secondary100,
    padding: 20,
    borderRadius: 9,
    fontFamily: theme.fonts.regular.fontFamily,
    textAlignVertical:'top'
  }
})