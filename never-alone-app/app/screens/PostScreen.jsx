import { Image, Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import { formatDistanceToNow } from 'date-fns'
import { sv } from 'date-fns/locale'
import React from 'react'
import MyText from '../components/textwrappers/MyText'
import BigText from '../components/textwrappers/BigText'
import { useTheme } from '../context/ThemeContext'

const PostScreen = ({ route }) => {
    const { item } = route.params
    const { customTheme, isDark } = useTheme()
    const styles = createStyles(customTheme, isDark)

    return (
        <View style={styles.container}>
            <View
                style={styles.post}
                accessible={true}
                accessibilityLabel={`${item.username} skrev detta: "${item.text}"`}
            >
                <View style={
                    styles.postDetailsContainer
                }>
                    <Image
                        source={{ uri: item.profileImage }}
                        style={styles.profileImage}
                        accessibilityLabel={`${item.username}s profilbild `}
                    />
                    <View
                        style={styles.postDetails}
                    >
                        <BigText
                            style={{ fontSize: 16 }}
                        >{item.username}</BigText>
                        <MyText
                            style={{ fontSize: 10 }}
                        >{formatDistanceToNow(item.date, { addSuffix: true, locale: sv })}</MyText>
                    </View>
                </View>
                <MyText
                    style={styles.postText}
                >
                    {item.text}
                </MyText>
            </View>
        </View>
    )
}

export default PostScreen

const createStyles = (theme, isDark) => StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: theme.colors.background50,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        paddingHorizontal: 8,
        paddingBottom: 90,
        backgroundColor: theme.colors.background50,

    },
    post: {
        gap: 20,
        padding: 20,
        backgroundColor: theme.colors.secondary50,
        borderRadius: 20
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
        resizeMode: 'cover'
    },
    postDetailsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 20
    },
    postDetails: {

    },
    postDate: {
        fontSize: 9
    },
    postText: {


    }
})