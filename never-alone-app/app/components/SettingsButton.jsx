import { Platform, Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from '../context/ThemeContext'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'

const SettingsButton = () => {
    const { customTheme, isDark } = useTheme()

    const navigation = useNavigation()

    const styles = createStyles(customTheme, isDark)

    const openModal = () => navigation.navigate('SettingsScreen')

    return (
        <View>
            <Pressable
                style={styles.settingsButton}
                onPress={openModal}
                accessibilityLabel='tryck här för att gå till inställningar'
                accessibilityRole='button'  >
                <MaterialIcons
                    name="settings"
                    size={30}
                    color={customTheme.colors.text} />
            </Pressable>
        </View>
    )
}

export default SettingsButton

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