import { StyleSheet, Pressable, View, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import PhoneCall from './PhoneCall';
import { useTheme } from '../context/ThemeContext';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';
import MyText from './textwrappers/MyText';
import { useNavigation } from '@react-navigation/native';

import AntDesign from '@expo/vector-icons/AntDesign';
import { useFakeCall } from '../context/FakeCallContext';





const CallMeButton = ({ props }) => {
    const [isModalShown, setIsModalShown] = useState(false)
    const { customTheme, isDark } = useTheme()
    const styles = createStyles(customTheme, isDark)
    const navigation = useNavigation()
    const [feedback, setFeedback] = useState(false)
    const { setFakeCallLatitude, setFakeCallLongitude } = useFakeCall()


    const saveLocationAndTime = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                alert(status);
                return;
            }
            const location = await Location.getCurrentPositionAsync();
            const {
                coords: { latitude, longitude },
                timestamp
            } = location;

            const isoTimeStamp = new Date(timestamp).toISOString()
            setFakeCallLatitude(latitude)
            setFakeCallLongitude(longitude)

        } catch (error) {
            console.warn(error);
        }
    };


    const handleFakeCall = () => {
        setFeedback(true)
        setTimeout(() => {
            setFeedback(false)
        }, 2000);
        setTimeout(() => {

            navigation.navigate('IncomingCallScreen')
            saveLocationAndTime()
        }, 4000);

        // sendCallNotification()
        // playRingtone()

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

            {feedback && (
                <View style={styles.feedbackMessage}>
                    <AntDesign name="checkcircle" size={24} color={customTheme.colors.accent600} />

                    <MyText >Samtal kommer om 4 sekunder...</MyText>
                </View>)
            }


            <PhoneCall visible={isModalShown} onClose={() => setIsModalShown(false)} />
        </>
    )
}



export default CallMeButton

const createStyles = (theme, isDark) => StyleSheet.create({
    button: {
        backgroundColor: isDark ? theme.colors.accent500 : theme.colors.accent300,
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
    },
    feedbackMessage: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        top: Platform.OS === 'android' ? -80 : -100,
        left: Platform.OS === 'android' ? -130 : -130,
        backgroundColor: isDark ? theme.colors.background100 : theme.colors.accent100,
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        height: 60,
        width: 300,
        borderColor: isDark ? theme.colors.accent : theme.colors.accent600
    }
})