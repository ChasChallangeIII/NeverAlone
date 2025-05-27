import { Button, FlatList, Image, Modal, Platform, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MyText from '../components/textwrappers/MyText'
import { useTheme } from '../context/ThemeContext'
import BigText from '../components/textwrappers/BigText'


const CommunityScreen = ({navigation}) => {
  const { customTheme, isDark } = useTheme()
  const styles = createStyles(customTheme, isDark)
  const [isShown, setIsShown] = useState(false)
  const openModal = () => navigation.navigate('PostScreen')
  const myposts = require('../data/posts.json')

  const [posts, setPosts] = useState(myposts)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response =
          await fetch('https://neveralone.onrender.com/api/community/posts')
        if (!response.ok) throw new Error('Något gick fel när vi skulle kontakta servern. Försök igen senare')
        const data = await response.json()
        console.log(data)
        setPosts(data)

      } catch (error) {
        console.error(error.message);

      }
    }
  }, [])

  return (
    < >

      <SafeAreaView style={styles.screen}>
        <View style={styles.container}>

          <Pressable
            onPress={openModal}>
            <MyText>Skriv ett inlägg...
            </MyText>
          </Pressable>




          <FlatList
            contentContainerStyle={styles.posts}
            data={posts}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (

              <View style={styles.post}>
                <View style={
                  styles.postDetailsContainer
                }>
                  <Image
                    source={{ uri: item.profileImage }}
                    style={styles.profileImage}
                  />
                  <View
                    style={styles.postDetails}
                  >
                    <BigText style={{ fontSize: 16 }}>{item.username}</BigText>
                    <MyText
                      style={{ fontSize: 10 }}
                    >{item.date}</MyText>
                  </View>
                </View>

                <MyText
                  style={styles.postText}
                >{item.text}</MyText>

              </View>

            )}
          />
        </View>
      </SafeAreaView>
    </>
  )
}

export default CommunityScreen

const createStyles = (theme, isDark) => StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background50,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 8,
    paddingBottom: 90
  },
  modalContent: {
    flex: 1,
    backgroundColor: theme.colors.background50,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '40'
  },

  textArea: {
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    minHeight: 80,
    width: 300,
    backgroundColor: theme.colors.secondary400,
    color: isDark ? theme.colors.secondary50 : theme.colors.secondary900,
    textAlign: 'left',
    justifyContent: 'flex-start',
    borderRadius: 6,
    padding: '17',
    fontFamily: theme.fonts.regular.fontFamily,
    textAlignVertical: 'top'
  },
  posts: {
    gap: 30
  },
  post: {
    gap: 20,
    padding: 20,
    backgroundColor: theme.colors.secondary50,
    borderRadius: 20
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    resizeMode: 'cover'
  },
  postDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20
  },
  postDetails: {

  },
  postDate: {
    fontSize: 9
  },
  postText: {


  }
})