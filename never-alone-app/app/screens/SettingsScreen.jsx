import { useState } from "react"
import { useTheme } from "../context/ThemeContext"
import { useUser } from "../context/UserContext"
import { useAuth } from "../context/AuthContext"
import BigText from "../components/textwrappers/BigText"
import { Pressable, TextInput, View, StyleSheet, Platform, Switch } from "react-native"
import MyText from "../components/textwrappers/MyText"
import AntDesign from '@expo/vector-icons/AntDesign';




const SettingsScreen = ({navigation}) => {
   const [isShown, setIsShown] = useState(false)
      const { customTheme, toggleTheme, isDark } = useTheme()
      const { user, clearUser, togglePrefersDark } = useUser()
      const { logOut } = useAuth()
  
      const handleSignOut = async () => {
          clearUser()
          logOut()
      }
      const styles = createStyles(customTheme, isDark)
      const toggleSwitch = (value) => {
          toggleTheme()
  
      }
      const onClose = () => navigation.goBack()

  return (
   
      <View style={styles.background}>
        <BigText >Inställningar</BigText>

        <View style={styles.switchContainer}>
          <MyText>Mörktläge</MyText>
          <Switch
            value={isDark}
            onValueChange={toggleSwitch}
            trackColor={{
              false: 'default',
              true: customTheme.colors.primary
            }}
            thumbColor={
              isDark && Platform.OS === 'ios' ? customTheme.colors.primary100 :
                isDark && Platform.OS === 'android' ? customTheme.colors.primary900 :
                  customTheme.colors.primary500
            }


          />
        </View>
        <View style={styles.switchContainer}>
          <MyText>Uppringarens namn</MyText>
          <TextInput
            placeholder='hunn'
            placeholderTextColor={customTheme.colors.text}
            style={styles.input}
          />
        </View>
        <Pressable
          style={styles.signoutButton}
          onPress={handleSignOut}
        >
          <MyText>
            Logga ut
          </MyText>

        </Pressable>
        <Pressable
          style={styles.close}
          onPress={onClose}>
          <AntDesign style={styles.closeIcon} name='back' />
          {/* <MyText>
                            Tillbaka
                        </MyText> */}

        </Pressable>

      </View>

  )
}

export default SettingsScreen

const createStyles = (theme, isDark) => StyleSheet.create({
    image: {
        width: 60,
        height: 60,
        borderRadius: 60,
        resizeMode: 'cover'
    },
    background: {
        backgroundColor: theme.colors.background,
        flex: 1,
        padding: 20,
        paddingBlockEnd: Platform.OS === 'android' ? 20 : 70,
        gap: 20
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    input: {
        width: 90,
        color: theme.colors.text,
        borderWidth: 1,
        borderColor: theme.colors.text
    },

    settingsButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
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

    },
    signoutButton: {
        marginTop: 'auto',
        padding: 10,
        borderRadius: 30,
        backgroundColor: isDark ? theme.colors.secondary100 : theme.colors.secondary400,
        alignItems: 'center',
        width: 100
    }
})