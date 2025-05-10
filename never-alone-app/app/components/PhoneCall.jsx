import { Button, Image, Modal, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MaterialIcons from "@expo/vector-icons/MaterialIcons";



const PhoneCall = ({ visible, onClose }) => {
    const [elapsedTime, setElapsedTime] = useState(0)
    const intervalIdRef = useRef(null)
    const startTimeRef = useRef(null)
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
            presentationStyle='pageSheet'

        >
            <View
                style={styles.modal}>
                <Image
                    style={styles.image}

                    source={require('../assets/images/person.jpg')} />
                <Text>Bestie<MaterialIcons name="heart-broken" size={24} color={"hotpink"} /></Text>


                <View>
                    <Text>{formatTime()}</Text>
                </View>

                {/* <Pressable onPress={hangUp}

                >
                    <MaterialIcons name='phone' size={24} color={'red'} />
                    <Text>hejdå</Text>
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

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: 'plum',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: "20%"
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: "50%",
        resizeMode: 'cover'
    }
})