import { FlatList, Image, Platform, Pressable, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MyText from '../components/textwrappers/MyText'
import { useTheme } from '../context/ThemeContext'
import BigText from '../components/textwrappers/BigText'
import { formatDistanceToNow } from 'date-fns'
import { sv } from 'date-fns/locale'



const CommunityScreen = ({ navigation }) => {
  const { customTheme, isDark } = useTheme()
  const styles = createStyles(customTheme, isDark)
  const openModal = () => navigation.navigate('PostScreen')
  const myposts = require('../data/posts.json')

  const [posts, setPosts] = useState(myposts)

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response =
  //         await fetch('https://neveralone.onrender.com/api/community/posts')
  //       if (!response.ok) throw new Error('Något gick fel när vi skulle kontakta servern. Försök igen senare')
  //       const data = await response.json()
  //       console.log(data)
  //       setPosts(data)

  //     } catch (error) {
  //       console.error(error.message);

  //     }
  //   }
  //   fetchPosts()
  // }, [])

  return (
    < >

      <SafeAreaView style={styles.screen}>
        <View style={styles.container}>
          <FlatList
            ListHeaderComponent={
              () => (
                <Pressable
                  onPress={openModal}
                  accessibilityLabel={`tryck här för att skriva ett inlägg `}
                  accessibilityRole='button'
                >
                  <MyText>Skriv ett inlägg...
                  </MyText>
                </Pressable>)

            }
            ListHeaderComponentStyle={styles.makePost}
            contentContainerStyle={styles.posts}
            data={posts}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (

              <View
                style={styles.post}
                accessible={true}
                accessibilityLabel={`ett postinlägg skrivet av ${item.username}. ${formatDistanceToNow(item.date, { addSuffix: true, locale: sv })}`}
              >
                <View style={
                  styles.postDetailsContainer
                }>
                  <Image
                    source={{ uri: item.profileImage }}
                    style={styles.profileImage}
                    accessible={true}

                    accessibilityLabel={`${item.username}s profilbild `}

                  />
                  <View
                    style={styles.postDetails}
                  >
                    <BigText
                      style={{ fontSize: 16 }}
                      accessible={true}

                    >{item.username}</BigText>
                    <MyText
                      style={{ fontSize: 10 }}
                    >{formatDistanceToNow(item.date, { addSuffix: true, locale: sv })}</MyText>
                  </View>
                </View>

                <MyText
                  style={styles.postText}
                  accessible={true}
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
  makePost: {
    padding: 20,
    backgroundColor: theme.colors.background100,
    borderRadius: 20

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