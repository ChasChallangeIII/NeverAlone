import { StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MyText from './MyText';
import PhoneCall from '../PhoneCall';
import BigText from './BigText';
import { useTheme } from '../../context/ThemeContext';


const CallMeButton = ({ props }) => {
    const [isModalShown, setIsModalShown] = useState(false)
    const { customTheme, isDark } = useTheme()
    const styles = createStyles(customTheme, isDark)
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
        left: 9
    },
    icon: {
        color: isDark ? theme.colors.accent100 : theme.colors.text
    }
})