import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import MyText from '../components/textwrappers/MyText'
import BigText from '../components/textwrappers/BigText'
import { useTheme } from '../context/ThemeContext'


const ReportScreen = () => {
  const { customTheme } = useTheme()
  const styles = createStyles(customTheme)
  return (
    <SafeAreaView style= {styles.screen} >
      <View style={styles.container}>
        <BigText>Rapportera händelser</BigText>
        <MyText>Vad har hänt? Betätta - vi finns här, läser och lyssnar! ♡</MyText>
        
        <TextInput
          style={styles.textarea}
          multiline
          placeholder='Berätta..'
          placeholderTextColor={customTheme.colors.text}
          
        />
      </View>
    </SafeAreaView>
  )
}

export default ReportScreen

const createStyles = (theme) => StyleSheet.create({
  screen: {
    flex:1,
    backgroundColor: theme.colors.background50,
   
  },
  container: {
    padding: 20,
    gap: 30
  },
  textarea: {
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.secondary700,
    minHeight: 400,
    backgroundColor: theme.colors.background100,
    padding: 20,
    borderRadius: 9,
    fontFamily: theme.fonts.regular.fontFamily
  }
})