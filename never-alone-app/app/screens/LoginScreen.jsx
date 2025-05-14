import { Button, Platform, SafeAreaView, StyleSheet, TextInput, View, StatusBar, Image, Pressable } from 'react-native'
import React from 'react'
import MyText from '../components/textwrappers/MyText'
import BigText from '../components/textwrappers/BigText'
import { useNavigation } from '@react-navigation/native'
import { useUser } from '../context/UserContext'
import { useTheme } from '../context/ThemeContext'
import AntDesign from '@expo/vector-icons/AntDesign';


const LoginScreen = () => {
  const { customTheme, isDark } = useTheme()
  const styles = createStyles(customTheme)
  const navigation = useNavigation()

  const { username, saveUsername, error, isLoading } = useUser()

  const login = () => {
    // saveUsername()
    navigation.navigate('Home')
  }
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <Image source={
        isDark ?
          require('../assets/images/darkLogo2.png') :
          require('../assets/images/logo.png')
      }
        style={styles.logo} />
      <View
        style={styles.form}
      >
        <BigText>Logga in</BigText>

        <View style={styles.field}>
          <MyText>Användarnamn</MyText>
          <TextInput
            placeholder='Rim'
            placeholderTextColor={customTheme.colors.text}
            style={styles.input}
            returnKeyType='next'
          />
        </View>

        <View style={styles.field}>
          <MyText>Lösenord</MyText>
          <TextInput
            placeholder='******'
            placeholderTextColor={customTheme.colors.text }
            secureTextEntry
            style={styles.input}
            returnKeyType='previous'


          />
        </View>

        <Pressable
          onPress={login}
          style={styles.button}
        >
          <MyText style={{ color: customTheme.colors.primary50 }}>
            Logga in
          </MyText>
        </Pressable>


        {error && (
          <View style={styles.errorView}>
            <AntDesign name="frowno" style={styles.icon} />
            <MyText style={styles.error}>{error}</MyText>
          </View>
        )}

      </View>
    </SafeAreaView>
  )
}

export default LoginScreen

const createStyles = (theme) => StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: theme.colors.background,
    // justifyContent: 'center',
    alignItems: 'center',
    gap: 60,
    paddingHorizontal: 10
  },
  logo: {
    width: 150,
    height: 150,
    paddingTop: 30,
    resizeMode: 'cover'
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    backgroundColor: theme.colors.primary50,
    padding: 20,
    width: 300,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: theme.colors.secondary600
  },
  field: {
    justifyContent: 'center',
    // alignItems: 'center',
    gap: 5

  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    borderColor: theme.colors.secondary600,
    color: theme.colors.text,
    width: 200,
    
  },
  button: {
    backgroundColor: theme.colors.primary600,
    padding: 8,
    borderRadius: 10,
  },
  errorView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: theme.colors.primary200,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 5
  },
  error: {
    color: theme.colors.primary800
  },
  icon: {
    fontSize: 60,
    color: theme.colors.primary800
  }
})