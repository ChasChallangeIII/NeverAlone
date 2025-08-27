import { Pressable, StyleSheet } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

const GoBackButton = () => {
    const { customTheme } = useTheme()
    const onClose = () => navigation.goBack()
    const navigation = useNavigation()
    const styles = createStyles(customTheme)

    return (
        <Pressable
            style={styles.close}
            onPress={onClose}
            accessibilityLabel='tryck här för att gå tillbaka till föregående sida'
            accessibilityRole='button'>
            <AntDesign
                style={styles.closeIcon}
                name='back' />


        </Pressable>
    )
}

export default GoBackButton
const createStyles = (theme) => StyleSheet.create({

    close: {
        position: 'absolute',
        right: 0,
        padding: 20,
        color: theme.colors.text
    },
    closeIcon: {
        color: theme.colors.text,
        fontSize: 24

    }
})