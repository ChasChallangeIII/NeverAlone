import { Button, Image, Modal, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from '../context/ThemeContext';
import MyText from './textwrappers/MyText';



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
                <Image
                    style={styles.image}

                    source={require('../assets/images/person.jpg')} />
                <MyText style={styles.text}>Bestie<MaterialIcons name="heart-broken" size={24} color={"hotpink"} /></MyText>


                <View>
                    <MyText style={styles.text}>{formatTime()}</MyText>
                </View>

                {/* <Pressable onPress={hangUp}

                >
                    <MaterialIcons name='phone' size={24} color={'red'} />
                    <MyText>hejdå</MyText>
                </Pressable> */}
                <Button
                    onPress={hangUp}
                    title='Lägg på'
                />

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
        paddingTop: "20%"
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        resizeMode: 'cover'
    },
    text: {
        color: isDark ? theme.colors.text : theme.colors.primary50
    }
})