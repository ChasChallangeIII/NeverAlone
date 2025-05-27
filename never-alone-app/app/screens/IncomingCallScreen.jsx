import { StyleSheet, View, Pressable, Image, Platform, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'

import MyText from '../components/textwrappers/MyText'
import { useTheme } from '../context/ThemeContext'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from "expo-av";



let ringtoneSound = null


const playRingtone = async () => {
    try {
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: true,
            interruptionModeIOS: InterruptionModeIOS.DoNotMix,
            playsInSilentModeIOS: true, // 🔈 Viktigt
            shouldDuckAndroid: true,
            interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
            playThroughEarpieceAndroid: false,
        });


        const { sound } = await Audio.Sound.createAsync(
            require("../assets/sounds/original-phone-ringtone-36558.mp3"),
            {
                isLooping: true,
                volume: 1.0,
                shouldPlay: true,
            }
        );
        ringtoneSound = sound
        await sound.playAsync()
    } catch (error) {
        console.log("❌ Failed to play ringtone:", error);
    }
}

const stopRingtone = async () => {
    try {
        await ringtoneSound.stopAsync()
        await ringtoneSound.unloadAsync()
    } catch (error) {
        console.warn("⚠️ Failed to stop ringtone:", error);
    }
}


const IncomingCallScreen = ({ navigation }) => {
    const { customTheme, isDark } = useTheme()
    const styles = createStyles(customTheme, isDark)

    useEffect(() => {
        playRingtone()
        return () => stopRingtone()
    }, [])
    return (
        <SafeAreaView style={styles.modal}>
            {/* <View> */}
            <View style={styles.caller}>
                <Image
                    style={styles.image}
                    source={require('../assets/images/image.png')} />
                <MyText
                    style={[styles.text, styles.name]}>
                    hubby
                </MyText>
                <MyText
                    style={[styles.text]}>
                    ringer dig...
                </MyText>

            </View>
            <View style={styles.buttons}>
                <Pressable
                    style={styles.button}
                    onPress={() => {
                        // stopRingtone()
                        navigation.goBack()

                        navigation.navigate('OngoingCallScreen')
                    }}

                >

                    <MaterialCommunityIcons name="phone" size={Platform.OS === 'ios' ? 40 : 30} color={"white"} style={[styles.text, styles.answerButton]} />

                    <MyText
                        style={[styles.text]}>
                        Acceptera
                    </MyText>

                </Pressable>
                <Pressable
                    style={styles.button}
                    onPress={() => {
                        // stopRingtone()
                        navigation.goBack()


                    }}
                    title={'Ignorera'}
                >

                    <MaterialCommunityIcons name="phone-hangup" size={Platform.OS === 'ios' ? 40 : 30} color={"white"} style={[styles.text, styles.hangUpButton]} />

                    <MyText
                        style={[styles.text]}>
                        ignorera
                    </MyText>
                </Pressable>
            </View>

        </SafeAreaView>
    )
}

export default IncomingCallScreen

const createStyles = (theme, isDark) => StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: isDark ? theme.colors.background : theme.colors.background900,
        justifyContent: 'space-between',

        alignItems: 'center',
        gap: Platform.OS === 'ios' ? 80 : 30,
    },
    caller: {
        marginTop: 90,
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,

    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        resizeMode: 'cover'
    },
    text: {
        color: isDark ? theme.colors.text : theme.colors.primary50
    },
    name: {
        fontSize: 40
    },
    buttons: {
        flexDirection: 'row',
        gap: 150,
        marginBottom: 50
    },
    button: {
        gap: Platform.OS === 'android' ? 14 : 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    answerButton: {
        backgroundColor: theme.colors.accent500,
        padding: 15,
        borderRadius: 90,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    }
    ,
    hangUpButton: {
        backgroundColor: 'red',
        padding: 15,

        borderRadius: 90,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    }
})