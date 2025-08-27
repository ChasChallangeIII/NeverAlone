import { Button, Platform, SafeAreaView, StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import { useTheme } from '../context/ThemeContext'
import { StatusBar } from 'expo-status-bar'
import BigText from '../components/textwrappers/BigText'
import GoBackButton from '../components/goBackButton'


const MakeAPostModal = ({ navigation }) => {
    const { customTheme, isDark } = useTheme()
    const styles = createStyles(customTheme, isDark)
    const closeModal = () => navigation.goBack()
    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.container}>
            <View
         
            >
                <View style={styles.modalContent}>
                    <BigText>Skriv ett inlägg här till communityt</BigText>
                    <TextInput
                        placeholder='Skriv ett inlägg...'
                        placeholderTextColor={isDark ? customTheme.colors.secondary50 : customTheme.colors.text}
                        style={styles.textArea}
                        multiline
                        returnKeyType='go'
                    />
                        <Button onPress={closeModal} title='avbryt' />
                        <GoBackButton />

                </View>

                </View>
            </View>
        </SafeAreaView>
    )
}

export default MakeAPostModal

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
    postDate: {
        fontSize: 9
    }
})