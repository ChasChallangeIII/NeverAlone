import { FlatList, Image, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '../context/ThemeContext'
import MyText from '../components/textwrappers/MyText'
import BigText from '../components/textwrappers/BigText'
import { useFakeCall } from '../context/FakeCallContext'
import ReportNotification from '../components/ReportNotification'

const NotificationsScreen = () => {
  const { customTheme } = useTheme()
  const styles = createStyles(customTheme)
  const myNotifications = require("../data/notifications.json");

  const { reportNotification } = useFakeCall()


  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>

        {reportNotification && (<ReportNotification />)}




        <FlatList
          data={myNotifications}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.notificatons}
          renderItem={({ item }) => (
            <View
              style={styles.notification}

            >

              <View style={styles.notificationDetails}>
                <Image
                  source={{ uri: item.profileImage }}
                  style={styles.profileImage}
                />
                <MyText>{`${item.username} ${item.message}`}</MyText>

              </View>
              <MyText style={[{ fontSize: 10 }, styles.date]}>{item.date}</MyText>

            </View>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

export default NotificationsScreen

const createStyles = (theme) => StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background50,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0

  },
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    paddingBottom: 120

  },
  notificatons: {
    gap: 20,
    alignItems: 'center',


  },
  notification: {
    gap: 5,
    backgroundColor: theme.colors.accent50,
    padding: 20,
    borderRadius: 20
  },
  notificationDetails: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    width: '80%'

  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
    resizeMode: 'cover'
  },
  date: {
    textAlign: 'right'
  }
})