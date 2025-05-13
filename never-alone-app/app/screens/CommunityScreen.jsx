import { Button, FlatList, Image, Modal, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import MyText from '../components/textwrappers/MyText'
import { useTheme } from '../context/ThemeContext'
import BigText from '../components/textwrappers/BigText'


const CommunityScreen = () => {
  const { customTheme, isDark } = useTheme()
  const styles = createStyles(customTheme, isDark)
  const [isShown, setIsShown] = useState(false)
  const openModal = () => setIsShown(true)
  const closeModal = () => setIsShown(false)

  const posts = [
    {
      "id": 1,
      "username": "Rim",
      "profileImage": "https://randomuser.me/api/portraits/women/21.jpg",
      "text": "Hej, någon som bor i närheten av Ålidhem? Ska jobba sent imorgon och undrar om någon kan tänka sig följa mig en bit hem?",
      "date": "2025-05-12T20:45:00"
    },
    {
      "id": 2,
      "username": "Marwa",
      "profileImage": "https://randomuser.me/api/portraits/women/45.jpg",
      "text": "Tips till er som känner er osäkra på bussen: ha Always-fakesamtal igång. Det gör faktiskt skillnad.",
      "date": "2025-05-12T22:10:00"
    },
    {
      "id": 3,
      "username": "Sara",
      "profileImage": "https://randomuser.me/api/portraits/women/33.jpg",
      "text": "Jag hade en obehaglig situation vid stationen igår. Ville bara säga: ni är inte ensamma. Det är okej att känna oro. ❤️",
      "date": "2025-05-13T07:30:00"
    },
    {
      "id": 4,
      "username": "Hana",
      "profileImage": "https://randomuser.me/api/portraits/women/12.jpg",
      "text": "Behöver någon att prata med just nu. Känner mig lite skakig efter en incident på vägen hem. Någon som är vaken?",
      "date": "2025-05-13T00:20:00"
    },
    {
      "id": 5,
      "username": "Lina",
      "profileImage": "https://randomuser.me/api/portraits/women/54.jpg",
      "text": "Jag har bil ikväll efter 21. Hör av er om någon behöver skjuts från centrum till Ersboda eller nära.",
      "date": "2025-05-13T10:15:00"
    },
    {
      "id": 6,
      "username": "Noura",
      "profileImage": "https://randomuser.me/api/portraits/women/36.jpg",
      "text": "Kör alltid nycklarna mellan fingrarna när jag går hem – tips jag fick från communityn här. Tack för att ni finns!",
      "date": "2025-05-13T11:05:00"
    }
  ]

  return (
    < >

      <SafeAreaView style={styles.screen}>
        <View style={styles.container}>

          <Pressable
            onPress={openModal}>
            <MyText>Skriv ett inlägg...
            </MyText>
          </Pressable>


          <Modal
            visible={isShown}
            onRequestClose={closeModal}
            animationType='slide'
            presentationStyle='pageSheet'
          >
            <View style={styles.modalContent}>
              <BigText>Skriv ett inlägg här till communityt</BigText>
              <TextInput
                placeholder='Skriv ett inlägg...'
                placeholderTextColor={isDark ? customTheme.colors.secondary50 : customTheme.colors.text}
                style={styles.textArea}
                multiline
              />
              <Button onPress={closeModal} title='avbryt' />
            </View>

          </Modal>




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
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal:8
  },
  modalContent: {
    flex: 1,
    backgroundColor: theme.colors.background50,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap:'40'
  },

  textArea: {
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    minHeight: 80,
    width: 300,
    backgroundColor: theme.colors.secondary400,
    color: isDark ? theme.colors.secondary50 :theme.colors.secondary900,
    textAlign: 'left',
    justifyContent: 'flex-start',
    borderRadius: 6,
    padding: '17',
    fontFamily: theme.fonts.regular.fontFamily,
    textAlignVertical:'top'
  },
  posts: {
    gap:30
  },
  post: {
    gap: 20,
    padding: 20,
    backgroundColor: theme.colors.secondary50,
    borderRadius:20
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