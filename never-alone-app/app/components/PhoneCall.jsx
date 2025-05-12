import { Button, Image, Modal, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from '../context/ThemeContext';
import MyText from './textwrappers/MyText';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import FontAwesome from '@expo/vector-icons/FontAwesome';

const PhoneCall = ({ visible, onClose }) => {
    const [elapsedTime, setElapsedTime] = useState(0)
    const intervalIdRef = useRef(null)
    const startTimeRef = useRef(null)
    const { customTheme, isDark } = useTheme()
    const styles = createStyles(customTheme, isDark)
    const hangUp = () => {
        clearInterval(intervalIdRef.current)
        setElapsedTime(0)
        onClose()
    }


    useEffect(() => {
        if (visible) {
            setElapsedTime(0)
            startTimeRef.current = Date.now() - elapsedTime
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current)
            }, 1000);
        }

        return () => {

            clearInterval(intervalIdRef.current)

        }
    }, [visible])

    const formatTime = () => {
        // const hours = Math.floor(elapsedTime / (1000 * 60 * 60)%60)
        const minutes = String(Math.floor(elapsedTime / (1000 * 60) % 60)).padStart(2, '0')
        const seconds = String(Math.floor(elapsedTime / (1000) % 60)).padStart(2, '0')


        return `${minutes}:${seconds}`
    }
    return (

        <Modal
            visible={visible}
            onRequestClose={hangUp}
            animationType='slide'
            presentationStyle='overFullScreen'

        >
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
                        <MyText style={styles.text}>{formatTime()}</MyText>
                    </View>
                </View>
                <View style={styles.container2}>
                    <FontAwesome6
                        name="microphone-slash"
                        style={[styles.text, styles.phoneButtons]}
                        size={40} />
                    <Ionicons
                        name="keypad"
                        size={40}
                        style={[styles.text, styles.phoneButtons]} />
                    <Octicons
                        style={[styles.text, styles.phoneButtons]}
                        name="unmute"
                        size={40} />
                    <View style={[styles.text, styles.phoneButtons, styles.secondRow]}>
                        <MaterialIcons
                            style={[styles.text, styles.phoneButtons, {alignSelf: 'flex-start'}]}
                            name="add-call"
                            size={40} />
                        <FontAwesome
                            style={[styles.text, styles.phoneButtons, { alignSelf: 'flex-start' }]}
                            name="video-camera"
                            size={40} />
                    </View>
                </View>



                <Pressable onPress={hangUp}

                >
                    <MaterialCommunityIcons name="phone-hangup" size={40} color={"white"} style={[styles.text, styles.hangUpButton]} />

                </Pressable>

            </View>
        </Modal>

    )
}

export default PhoneCall

const createStyles = (theme, isDark) => StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: isDark ? theme.colors.background : theme.colors.background900,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: "20%",
        gap: 90
    },
    container1: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10
    },

    container2: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 'auto',
        justifyContent: 'center',
        paddingVertical: 30,
        paddingHorizontal: 30,
        alignItems: 'center',
        gap: 80
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
    phoneButtons: {
        size: 40

    },
    secondRow: {
        gap: 80,
        paddingHorizontal: 30,
        flex: 1,
        flexDirection: 'row'
    },
    hangUpButton: {
        backgroundColor: 'red',
        padding: 20,
        // height: 60,
        // width: 60,
        borderRadius: 90,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',

    }
})