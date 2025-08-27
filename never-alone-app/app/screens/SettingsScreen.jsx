import { useTheme } from "../context/ThemeContext"
import { useUser } from "../context/UserContext"
import { useAuth } from "../context/AuthContext"
import BigText from "../components/textwrappers/BigText"
import { Pressable, View, StyleSheet, Platform, Switch } from "react-native"
import MyText from "../components/textwrappers/MyText"
import AntDesign from '@expo/vector-icons/AntDesign';
import GoBackButton from "../components/goBackButton"




const SettingsScreen = ({ navigation }) => {

  const { customTheme, toggleTheme, isDark } = useTheme()
  const { clearUser } = useUser()
  const { logOut } = useAuth()

  const handleSignOut = async () => {
    clearUser()
    logOut()
  }
  const styles = createStyles(customTheme, isDark)
  return (

    <View style={styles.background}>
      <BigText>Inställningar</BigText>

      <View style={styles.switchContainer}>
        <MyText nativeID='darkTheme'>Mörktläge</MyText>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          trackColor={{
            false: 'default',
            true: customTheme.colors.primary
          }}
          thumbColor={
            isDark && Platform.OS === 'ios' ? customTheme.colors.primary100 :
              isDark && Platform.OS === 'android' ? customTheme.colors.primary900 :
                customTheme.colors.primary500
          }
          accessibilityLabel={`tryck här för att slå ${isDark? 'av':'på'} mörkt läge`}
          accessibilityLabelledBy={'darkTheme'}

        />
      </View>
      {/* <View style={styles.switchContainer}>
          <MyText>Uppringarens namn</MyText>
          <TextInput
            placeholder='hunn'
            placeholderTextColor={customTheme.colors.text}
            style={styles.input}
          />
        </View> */}
      <Pressable
        style={styles.signoutButton}
        onPress={handleSignOut}
        accessibilityLabel='tryck här för att logga ut'
        accessibilityRole='button' 
      >
        <MyText>
          Logga ut
        </MyText>

      </Pressable>
      <GoBackButton/>
    

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
  signoutButton: {
    marginTop: 'auto',
    padding: 10,
    borderRadius: 30,
    backgroundColor: isDark ? theme.colors.secondary100 : theme.colors.secondary400,
    alignItems: 'center',
    width: 100
  }
})