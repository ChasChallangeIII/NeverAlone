import { Button, Image, Modal, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialIcons from "@expo/vector-icons/MaterialIcons";


const PhoneCall = ({ visible, onClose }) => {
    return (

        <Modal
            visible={visible}
            onRequestClose={onClose}
            animationType='slide'
            presentationStyle='pageSheet'

        >
            <View
                style={styles.modal}>
                <Image
                    style={styles.image}

                    source={require('../assets/images/person.jpg')} />
                <Text>Bestie<MaterialIcons name="heart-broken" size={24} color={"hotpink"} /></Text>
                <Text></Text>

                <Button onPress={onClose}
                    title="hejdå" />
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