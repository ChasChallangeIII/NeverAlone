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
    gap: 10
  }
})