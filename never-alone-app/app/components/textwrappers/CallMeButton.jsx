import { StyleSheet, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import playRingtone from "../../services/playRingtone"
import PhoneCall from '../PhoneCall';

import { useTheme } from '../../context/ThemeContext';
import { sendCallNotification } from '../../services/sendCallNotification';
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from "expo-av";
import * as Notifications from 'expo-notifications';

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
            require("../../assets/sounds/original-phone-ringtone-36558.mp3"),
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


const CallMeButton = ({ props }) => {
    const [isModalShown, setIsModalShown] = useState(false)
    const { customTheme, isDark } = useTheme()
    const styles = createStyles(customTheme, isDark)
    useEffect(() => {
        const subscription = Notifications.addNotificationResponseReceivedListener(response => {
            setIsModalShown(true)
            stopRingtone()
        })

        return () => {
            subscription.remove()
        }
    }, [])




    const handleFakeCall = () => {

            sendCallNotification()
            playRingtone()
      


        // setIsModalShown(true)

    }
    return (
        <>

            <Pressable

                {...props}
                onPress={() => {
                    handleFakeCall();
                    // setIsModalShown(true)
                }}
                style={styles.button}
            >
                <MaterialIcons name="phone" size={24} color={customTheme.colors.accent900} style={styles.icon} />

            </Pressable>

            <PhoneCall visible={isModalShown} onClose={() => setIsModalShown(false)} />
        </>
    )
}

export default CallMeButton

const createStyles = (theme, isDark) => StyleSheet.create({
    button: {
        backgroundColor: isDark ? theme.colors.accent700 : theme.colors.accent300,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        width: 70,
        padding: 10,
        position: 'absolute',
        bottom: 9,
        left: 9,
        zIndex: 55
    },
    icon: {
        color: isDark ? theme.colors.accent100 : theme.colors.text
    }
})