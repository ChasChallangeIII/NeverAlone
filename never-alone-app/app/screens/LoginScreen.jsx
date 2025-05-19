import { Button, ScrollView, Platform, SafeAreaView, StyleSheet, TextInput, View, StatusBar, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import MyText from '../components/textwrappers/MyText'
import BigText from '../components/textwrappers/BigText'
import { useNavigation } from '@react-navigation/native'
import { useUser } from '../context/UserContext'
import { useTheme } from '../context/ThemeContext'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAuth } from '../context/AuthContext'


const LoginScreen = () => {
  const { customTheme, isDark } = useTheme()
  const { logIn, isLoading } = useAuth()
  const { username, saveUsername, error, clearError, setError } = useUser()

  const [inputUsername, setInputUsername] = useState('')
  const [inputPassword, setInputPassword] = useState('')

  const onChangeInputUsername = (text) => {
    clearError()
    setInputUsername(text)
  }
  const onChangeInputPassword = (text) => {
    clearError()
    setInputPassword(text)
  }
  const handleSubmit = async () => {

    if (!inputUsername || !inputPassword) {
      setError('Du har inte fyllt i både fälten')
      return
    }

    try {
      const response = await fetch('https://neveralone.onrender.com/auth/signin?admin=false', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: inputUsername,
          password: inputPassword
        })
      })
      alert(response.status);

      if (!response.ok) {
        if (response.status === 400 || response.status === 404) {
          throw new Error('Fel användarnamn eller lösenord')
        } else if (response.status === 500) {
          throw new Error('Det gick inte att kontakta servern. Försök igen senare')
        } else {
          throw new Error('Inloggningen misslyckades')
        }
      }

      const data = await response.json()
      const token = data.token
      await saveUsername(inputUsername)
      logIn(token)

    } catch (error) {
      setError(error.message)
    }

  }


  const styles = createStyles(customTheme)

  return (
    <SafeAreaView style={styles.screen} >
      <ScrollView >
        <View style={styles.container}>
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
                placeholder='användarnamn...'
                placeholderTextColor={customTheme.colors.text}
                style={styles.input}
                returnKeyType='go'
                value={inputUsername}
                onChangeText={onChangeInputUsername}
              />
            </View>
            <View style={styles.field}>
              <MyText>Lösenord</MyText>
              <TextInput
                placeholder='******'
                placeholderTextColor={customTheme.colors.text}
                secureTextEntry
                value={inputPassword}
                onChangeText={onChangeInputPassword}
                style={styles.input}
                returnKeyType='go'
              />
            </View>
            <Pressable
              onPress={handleSubmit}
              style={styles.button}
            >
              <MyText style={{ color: customTheme.colors.primary50 }}>
                Logga in
              </MyText>
            </Pressable>
            {isLoading && (<MyText> laddar...</MyText>)}

            {error && (
              <View style={styles.errorView}>
                <AntDesign name="frowno" style={styles.icon} />
                <MyText style={styles.error}>{error}</MyText>
              </View>

            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default LoginScreen

const createStyles = (theme) => StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: theme.colors.background,
  },
  container: {
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
    width: 200,
    alignItems: 'center'
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