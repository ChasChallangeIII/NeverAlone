import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '../context/ThemeContext'
import MyText from '../components/textwrappers/MyText'
import BigText from '../components/textwrappers/BigText'

const SearchScreen = () => {
  const { customTheme } = useTheme()
  const styles = createStyles(customTheme)
  return (
    <SafeAreaView>
    <View>
      <BigText>Rimi</BigText>
      <MyText style={styles.text}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint minus ipsam nam harum inventore iusto commodi dolorum nisi dolorem rerum corporis, ea optio incidunt quia. Sed sunt fugiat voluptates eum deleniti, dolorem atque molestiae, arores earum accusantium similique commodi!</MyText>
      </View>
    </SafeAreaView>
  )
}

export default SearchScreen

const createStyles = (theme) => StyleSheet.create({
  
})