import { StyleSheet, Pressable, View, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from '../context/ThemeContext';
import MyText from './textwrappers/MyText';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFakeCall } from '../context/FakeCallContext';
import { AccessibilityInfo } from 'react-native';

const CallMeButton = ({ props }) => {
    const { customTheme, isDark } = useTheme()
    const styles = createStyles(customTheme, isDark)
    const navigation = useNavigation()
    const { handleFakeCall, feedback } = useFakeCall()

    useEffect(() => {
        if (feedback) {
            setTimeout(() => {
                AccessibilityInfo.announceForAccessibility('samtal kommer om 4 sekunder')
            }, 300);
        }

    }, [feedback])


    return (
        <>
            <Pressable

                {...props}
                onPress={() => {
                    handleFakeCall(navigation);

                }}
                accessibilityLabel='knapp för att få fakesamtal'
                accessibilityRole='button'
                style={styles.button}
            >
                <MaterialIcons name="phone" size={24} color={customTheme.colors.accent900} style={styles.icon} />

            </Pressable>

            {feedback && (
                <View
                    style={styles.feedbackMessage}

                >
                    <AntDesign name="checkcircle" size={24} color={customTheme.colors.accent600} />

                    <MyText >Samtal kommer om 4 sekunder...</MyText>
                </View>)
            }

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