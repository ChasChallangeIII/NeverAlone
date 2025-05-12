import { StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MyText from './MyText';
import PhoneCall from '../PhoneCall';
import BigText from './BigText';
import { useTheme } from '../../context/ThemeContext';


const CallMeButton = ({ props }) => {
    const [isModalShown, setIsModalShown] = useState(false)
    const { customTheme } = useTheme()
    const styles = createStyles(customTheme)
    return (
        <>

            <Pressable

                {...props}
                onPress={() => {
                    // handleFakeCall();
                    setIsModalShown(true)
                }}
                style={styles.button}
            >
                <MaterialIcons name="phone" size={24} color={customTheme.colors.text} />
                {/* <BigText style={{ fontSize: 13, color: customTheme.colors.text }}>RING MIG</BigText> */}
            </Pressable>

            <PhoneCall visible={isModalShown} onClose={() => setIsModalShown(false)} />
        </>
    )
}

export default CallMeButton

const createStyles = (theme) => StyleSheet.create({
    button: {
        backgroundColor: theme.colors.accent200,
        borderRadius: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70',
        width: '70',
        padding: '10',
        position: 'absolute',
        bottom: '9',
        left: '9'
    }
})