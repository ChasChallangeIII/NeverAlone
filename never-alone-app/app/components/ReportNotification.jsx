import { Platform, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { useTheme } from '../context/ThemeContext'
import MyText from './textwrappers/MyText'
import BigText from './textwrappers/BigText'
import { useNavigation } from '@react-navigation/native'
import { formatDistanceToNow } from 'date-fns'
import { sv } from 'date-fns/locale'

const ReportNotification = () => {
    const { customTheme } = useTheme()
    const styles = createStyles(customTheme)
    const navigation = useNavigation()
    return (
        <Pressable
            style={styles.notification}
            onPress={() => navigation.navigate('ReportScreen')}
            accessibilityRole='button'
            accessibilityLabel='Admingruppen frågar: Är du okej? Berätta vad som hände'
            accessibilityHint='Tryck här för att rapportera vad som hände'

        >

            <View style={styles.notificationDetails}>
                <Image
                    source={require('../assets/images/logo2.png')}
                    style={styles.profileImage}
                />
                <BigText style={styles.text}>
                    {`Admingruppen - Är du okej? Berätta vad som hände.`}

                </BigText >

            </View>
            <MyText style={[{ fontSize: 10 }, styles.date]}>
                {formatDistanceToNow(new Date().toISOString(), {addSuffix:true, locale:sv})}
               
            </MyText>

        </Pressable>

    )
}

export default ReportNotification

const createStyles = (theme) => StyleSheet.create({
    notification: {
        gap: 5,
        backgroundColor: theme.colors.accent200,
        padding: 20,
        borderRadius: 20
    },
    notificationDetails: {
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
        width: '80%'

    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 40,
        resizeMode: 'cover'
    },
    text: {
        fontSize: 14
    },

    date: {
        textAlign: 'right'
    }
})