import { Button, Image, Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import MyText from './textwrappers/MyText'
import { Switch } from 'react-native'
import BigText from './textwrappers/BigText'
import { useTheme } from '../context/ThemeContext'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useUser } from '../context/UserContext'

const Settings = () => {
    const [isShown, setIsShown] = useState(false)
    const { customTheme, toggleTheme, isDark } = useTheme()
    const { clearUsername } = useUser()

    const styles = createStyles(customTheme, isDark)
    const toggleSwitch = (value) => {
        // setIsEnabled(!value)
        toggleTheme()
    }
    const onClose = () => setIsShown(false)

    return (
        <View>
            <Pressable style={styles.settingsButton} onPress={() => setIsShown(true)}>
                {/* <MaterialIcons name="settings" size={30} color={customTheme.colors.text} /> */}
                <Image
                    source={require('../assets/images/rim.jpg')}
                    style={styles.image}
                />
            </Pressable>

            <Modal
                visible={isShown}
                presentationStyle='formSheet'
                animationType='slide'
                onRequestClose={onClose}

            >
                <View style={styles.background}>
                    <BigText >Inställningar</BigText>

                    <View style={styles.switchContainer}>
                        <MyText>Mörktläge</MyText>
                        <Switch
                            value={isDark}
                            onValueChange={toggleSwitch}
                            trackColor={{
                                false: 'default',
                                true: customTheme.colors.primary
                            }}
                            thumbColor={
                                isDark && Platform.OS === 'ios' ? customTheme.colors.primary100 :
                                    isDark && Platform.OS === 'android' ? customTheme.colors.primary900 :
                                        customTheme.colors.primary500
                            }


                        />
                    </View>
                    <Pressable
                        style={styles.signoutButton}
                        onPress={() => clearUsername()}
                    >
                        <BigText>
                            Logga ut
                        </BigText>

                    </Pressable>
                    <Pressable
                        style={styles.close}
                        onPress={onClose}>
                        <AntDesign name="back" size={24} color="black" />
                        {/* <MyText>
                            Tillbaka
                        </MyText> */}

                    </Pressable>

                </View>
            </Modal>
        </View>
    )
}

export default Settings

const createStyles = (theme, isDark) => StyleSheet.create({
    image: {
        width: 60,
        height: 60,
        borderRadius: 60,
        resizeMode: 'cover'
    },
    background: {
        backgroundColor: theme.colors.background,
        flex: 1,
        padding: 20,
        paddingBlockEnd: 90,
        gap: 20
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    settingsButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },
    close: {
        position: 'absolute',
        right: 0,
        padding: 20
    },
    signoutButton: {
        marginTop: 'auto',
        padding: 10,
        borderRadius: 30,
        backgroundColor: isDark ? theme.colors.secondary100 : theme.colors.secondary400,
        alignItems: 'center'
    }
})