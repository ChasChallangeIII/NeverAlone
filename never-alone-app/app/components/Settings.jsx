import { Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import MyText from './textwrappers/MyText'
import { Switch } from 'react-native'
import BigText from './textwrappers/BigText'
import { useTheme } from '../context/ThemeContext'


const Settings = () => {
    const [isShown, setIsShown] = useState(false)
    const [isEnabled, setIsEnabled] = useState(false)
    const { customTheme, toggleTheme } = useTheme()

    const styles = createStyles(customTheme)
    const toggleSwitch = (value) => {
        setIsEnabled(!value)
        toggleTheme()
    }

    return (
        <View>
            <Pressable onPress={() => setIsShown(true)}>
                <MyText>Inställningar</MyText>
            </Pressable>

            <Modal
                visible={isShown}
                presentationStyle='formSheet'
                animationType='slide'
      
            >
                <View style={styles.background}>
                <BigText >Inställningar</BigText>

                <Switch
                    value={isEnabled}
                    onValueChange={toggleSwitch}
                />
                
                    <Button title='stäng' onPress={() => setIsShown(false)} />
                    
                </View>
            </Modal>
        </View>
    )
}

export default Settings

const createStyles = (theme)=> StyleSheet.create({
    background: {
        backgroundColor: theme.colors.background,
        flex:1
    }
})