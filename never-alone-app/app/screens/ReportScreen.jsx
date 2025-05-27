import { ActivityIndicator, Button, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native'
import React, { useState } from 'react'
import MyText from '../components/textwrappers/MyText'
import BigText from '../components/textwrappers/BigText'
import { useTheme } from '../context/ThemeContext'
import { useFakeCall } from '../context/FakeCallContext'
import { useUser } from '../context/UserContext'
import { useAuth } from '../context/AuthContext'
import AntDesign from '@expo/vector-icons/AntDesign';


const ReportScreen = ({ navigation }) => {
  const { customTheme, isDark } = useTheme()
  const styles = createStyles(customTheme, isDark)
  const {
    message,
    setMessage,
    cause,
    setCause,
    fakeCallLatitude,
    fakeCallLongitude,
  } = useFakeCall()
  const { user } = useUser()
  const { userToken } = useAuth()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [feedback, setFeedback] = useState(false)
  const { setReportNotification } = useFakeCall()


  const onChangeMessageText = (text) => {
    setError(false)
    setMessage(text)
  }
  const onChangeTitleText = (text) => {
    setError(false)
    setCause(text)
  }
  const handleSubmit = async () => {
    try {
      if (!message.trim() || !cause.trim()) {
        throw new Error('Du har inte fyllt i både fälten!')
      }
      setIsLoading(true)
      const response = await fetch('https://neveralone.onrender.com/api/reports', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // user_id: user.id,
          location: {
            latitude: fakeCallLatitude,
            longitude: fakeCallLongitude
          },
          cause: cause,
          message: message
        })
      })
      const data = await response.json(); // försök läsa svaret

      console.log('Response status:', response.status);
      console.log('Response data:', data);
      if (!response.ok) {
        throw new Error("Något gick fel när vi skulle skicka rapporten. Försök igen senare");

      }
      setIsLoading(false)
      clearInputs()
      setReportNotification(false)
      setFeedback(true)
      setTimeout(() => {
        setFeedback(false)
      }, 8000);
    } catch (error) {
      setError(error.message);
      setIsLoading(false)

    }

  }
  const onClose = () => navigation.goBack()

  const clearInputs = () => {
    setMessage(null)
    setCause(null)
  }


  return (
    <SafeAreaView style={styles.screen} >
      <ScrollView>
        <KeyboardAvoidingView
          style={{ flex: 1 }}

          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={100}
        >
          <View style={styles.container}>
            <BigText>Vad har hänt? Berätta - vi finns här, läser och lyssnar! ♡</BigText>
            <MyText>Rapportera händelsen här</MyText>
            <TextInput
              style={styles.messageTitle}
              multiline
              placeholder='Lägg till titel här..'
              placeholderTextColor={customTheme.colors.text}
              returnKeyType='next'
              onChangeText={onChangeTitleText}
              value={cause}
            />
            <TextInput
              style={styles.textarea}
              multiline
              placeholder='Berätta mer...'
              placeholderTextColor={customTheme.colors.text}
              returnKeyType='go'
              onChangeText={onChangeMessageText}
              value={message}
            />
            <Pressable
              onPress={handleSubmit}
              style={styles.button}
            >
              <MyText style={{ color: customTheme.colors.primary50 }}>
                Skicka
              </MyText>
            </Pressable>

            {isLoading && (
              <ActivityIndicator color={customTheme.colors.primary} />
            )}
            {error && (
              <View style={styles.errorView}>
                <AntDesign name="frowno" style={styles.icon} />
                <MyText style={styles.error}>{error}</MyText>
              </View>
            )}
            {feedback && (
              <View style={styles.feedbackView}>
                <AntDesign name="heart" style={styles.heart} />
                <MyText style={styles.feedback}>Tack för att du skickade! Ta hand om dig ♡</MyText>
              </View>
            )}
            <Pressable
              style={styles.close}
              onPress={onClose}>
              <AntDesign style={styles.closeIcon} name='back' />
              {/* <MyText>
                            Tillbaka
                        </MyText> */}

            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ReportScreen

const createStyles = (theme, isDark) => StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background50,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    padding: 20,
    gap: 30,
    paddingBottom: 90
  },
  messageTitle: {
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: isDark ? theme.colors.secondary700 : theme.colors.primary100,
    backgroundColor: isDark ? theme.colors.primary100 : theme.colors.secondary100,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 9,
    fontFamily: theme.fonts.regular.fontFamily,
    textAlignVertical: 'top'
  },
  textarea: {
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: isDark ? theme.colors.secondary700 : theme.colors.primary100,
    minHeight: 100,
    backgroundColor: isDark ? theme.colors.primary100 : theme.colors.secondary100,
    padding: 20,
    borderRadius: 9,
    fontFamily: theme.fonts.regular.fontFamily,
    textAlignVertical: 'top'
  },
  button: {
    backgroundColor: theme.colors.primary600,
    padding: 8,
    borderRadius: 10,
    alignItems: 'center'
  },
  errorView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: theme.colors.primary200,
    // marginHorizontal: 20,
    padding: 10,
    borderRadius: 5,
    borderColor: theme.colors.primary500,
    borderWidth: 1,
    flex: 1
  },
  error: {
    color: theme.colors.primary800,
    width: '90%'

  },
  icon: {
    fontSize: 60,
    color: theme.colors.primary800
  },
  feedbackView: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    backgroundColor: theme.colors.accent100,
    padding: 10,
    borderRadius: 14,
    borderColor: theme.colors.accent500,
    borderWidth: 1,
  },
  feedback: {
    color: theme.colors.accent900,


  },
  heart: {
    fontSize: 60,
    color: theme.colors.primary
  },
  close: {
    position: 'absolute',
    right: 0,
    padding: 20,
    color: theme.colors.text
  },
  closeIcon: {
    color: theme.colors.text,
    fontSize: 24
  }
})