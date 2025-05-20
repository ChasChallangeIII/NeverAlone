import { FlatList, Image, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '../context/ThemeContext'
import MyText from '../components/textwrappers/MyText'
import BigText from '../components/textwrappers/BigText'

const NotificationsScreen = () => {
    const { customTheme } = useTheme()
  const styles = createStyles(customTheme)
  const notifications = [
    {
      "id": 1,
      "username": "Rim",
      "profileImage": "https://randomuser.me/api/portraits/women/21.jpg",
      "date": "2025-05-13T08:30:00",
      "message": "aktiverade fakesamtal-knappen"
    },
    {
      "id": 2,
      "username": "Marwa",
      "profileImage": "https://randomuser.me/api/portraits/women/45.jpg",
      "date": "2025-05-13T09:00:00",
      "message": "aktiverade fakesamtal-knappen"
    },
    {
      "id": 3,
      "username": "Sara",
      "profileImage": "https://randomuser.me/api/portraits/women/33.jpg",
      "date": "2025-05-13T09:15:00",
      "message": "aktiverade fakesamtal-knappen"
    },
    {
      "id": 4,
      "username": "Hana",
      "profileImage": "https://randomuser.me/api/portraits/women/12.jpg",
      "date": "2025-05-13T09:45:00",
      "message": "aktiverade fakesamtal-knappen"
    },
    {
      "id": 5,
      "username": "Lina",
      "profileImage": "https://randomuser.me/api/portraits/women/54.jpg",
      "date": "2025-05-13T10:30:00",
      "message": "aktiverade fakesamtal-knappen"
    },
    {
      "id": 6,
      "username": "Noura",
      "profileImage": "https://randomuser.me/api/portraits/women/36.jpg",
      "date": "2025-05-13T11:00:00",
      "message": "aktiverade fakesamtal-knappen"
    }
  ]


  return (
    <SafeAreaView style={styles.screen}>
         <View style={styles.container}>
    

        <FlatList
          data={notifications}
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
                <MyText>{ item.message}</MyText>

              </View>
              <MyText style={[{fontSize:10}, styles.date]}>{item.date}</MyText>

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
    paddingBottom: 90

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
    
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
    resizeMode:'cover'
  },
  date: {
    textAlign:'right'
  }
})