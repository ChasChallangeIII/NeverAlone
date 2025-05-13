import { Button, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import MyText from './textwrappers/MyText'
import { Switch } from 'react-native'
import BigText from './textwrappers/BigText'
import { useTheme } from '../context/ThemeContext'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Settings = () => {
    const [isShown, setIsShown] = useState(false)
    const { customTheme, toggleTheme, isDark } = useTheme()

    const styles = createStyles(customTheme)
    const toggleSwitch = (value) => {
        // setIsEnabled(!value)
        toggleTheme()
    }
    const onClose = () => setIsShown(false) 

    return (
        <View>
            <Pressable style={styles.button} onPress={() => setIsShown(true)}>
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
                            trackColor={{ false: customTheme.colors.primary, true: customTheme.colors.primary }}
                            thumbColor={isDark ? customTheme.colors.primary100 : customTheme.colors.primary500}
                          
                        />
                    </View>

                    <Button title='stäng' onPress={onClose} />

                </View>
            </Modal>
        </View>
    )
}

export default Settings

const createStyles = (theme) => StyleSheet.create({
    image: {
        width: 60,
        height: 60,
        borderRadius:60,
        resizeMode:'cover'
    },
    background: {
        backgroundColor: theme.colors.background,
        flex: 1,
        padding: 20,
        gap: 20
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
  
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    }
})