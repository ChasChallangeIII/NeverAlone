import { Image, Platform, Pressable, StyleSheet, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../context/ThemeContext';
import MyText from '../components/textwrappers/MyText';




const OngoingCallScreen = ({ navigation }) => {
    const [elapsedTime, setElapsedTime] = useState(0)
    const intervalIdRef = useRef(null)
    const startTimeRef = useRef(null)
    const { customTheme, isDark } = useTheme()
    const styles = createStyles(customTheme, isDark)
    const hangUp = () => {
        clearInterval(intervalIdRef.current)
        setElapsedTime(0)
        navigation.goBack()
    }
    useEffect(() => {
        startTimeRef.current = Date.now()
        intervalIdRef.current = setInterval(() => {
            setElapsedTime(Date.now() - startTimeRef.current)
        }, 1000);


        return () => {

            clearInterval(intervalIdRef.current)

        }
    }, [])

    const formatTime = () => {
        // const hours = Math.floor(elapsedTime / (1000 * 60 * 60)%60)
        const minutes = String(Math.floor(elapsedTime / (1000 * 60) % 60)).padStart(2, '0')
        const seconds = String(Math.floor(elapsedTime / (1000) % 60)).padStart(2, '0')


        return `${minutes}:${seconds}`
    }
    const formatTimeForScreenReader = () => {
        const minutes = Math.floor(elapsedTime / (1000 * 60) % 60)
        const seconds = Math.floor(elapsedTime / (1000) % 60)


        if (minutes === 1)
            return `${minutes} minut och ${seconds}sekunder`
        else if (minutes > 1)
            return `${minutes} minuter och ${seconds}sekunder`
        else
            return `${seconds}sekunder`

    }
    return (
        <>
            <StatusBar barStyle={'light-content'} />

            <View
                style={styles.modal}>
                <View style={styles.container1}>
                    <Image
                        style={styles.image}
                        source={require('../assets/images/image.png')} />
                    <MyText
                        style={[styles.text, styles.name]}>
                        hubby
                    </MyText>
                    <View>
                        <MyText
                            style={styles.text}
                            accessibilityLabel={`tiden som gått under samtalet ${formatTimeForScreenReader()}`}
                            accessibilityLiveRegion='assertive'
                        >{formatTime()}</MyText>
                    </View>
                </View>
                <View style={styles.container2}
                    accessibilityElementsHidden={true}
                    importantForAccessibility='no-hide-descendants'>
                    <FontAwesome6
                        name="microphone-slash"
                        style={[styles.text, styles.phoneButtons]}
                        size={Platform.OS === 'ios' ? 40 : 30}
                    />
                    <Ionicons
                        name="keypad"
                        size={Platform.OS === 'ios' ? 40 : 30}
                        style={[styles.text, styles.phoneButtons]} />
                    <Octicons
                        style={[styles.text, styles.phoneButtons]}
                        name="unmute"
                        size={Platform.OS === 'ios' ? 40 : 30} />
                    <View style={[styles.text, styles.phoneButtons, styles.secondRow]}>
                        <MaterialIcons
                            style={[styles.text, styles.phoneButtons]}
                            name="add-call"
                            size={Platform.OS === 'ios' ? 40 : 30} />
                        <FontAwesome
                            style={[styles.text, styles.phoneButtons,]}
                            name="video-camera"
                            size={Platform.OS === 'ios' ? 40 : 30} />
                        <Ionicons name="person-circle" style={[styles.text, styles.phoneButtons]} size={Platform.OS === 'ios' ? 40 : 30} />
                    </View>
                </View>



                <Pressable onPress={hangUp}
                    accessibilityRole='button'
                    accessibilityLabel='tryck här för att lägga på'

                >
                    <MaterialCommunityIcons name="phone-hangup" size={Platform.OS === 'ios' ? 40 : 30} color={"white"} style={[styles.text, styles.hangUpButton]} />

                </Pressable>

            </View>

        </>
    )
}

export default OngoingCallScreen

const createStyles = (theme, isDark) => StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: isDark ? theme.colors.background : theme.colors.background900,
        justifyContent: 'center',
        alignItems: 'center',
        // paddingVertical: "0",
        gap: Platform.OS === 'ios' ? 80 : 30,
    },
    container1: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,

    },

    container2: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 'auto',
        justifyContent: 'center',
        paddingVertical: 30,
        paddingHorizontal: 30,
        alignItems: 'center',
        gap: 80,

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
    secondRow: {
        gap: 80,
        // paddingHorizontal: 30,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    hangUpButton: {
        backgroundColor: 'red',
        padding: 15,
        // height: 60,
        // width: 60,
        borderRadius: 90,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        // bottom: '40'


    }
})