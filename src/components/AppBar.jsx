import { View, StyleSheet, Pressable } from 'react-native'
import Constants from 'expo-constants'
import AppBarTab from './AppBarTab'
import theme from '../theme'

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.appBarPrimary,
        height: 80,
    },
})

const onPressFunction = () => {
    console.log("Pressed")
}

const AppBar = () => {
    return <View style={styles.container}>
        <Pressable onPress={onPressFunction}>
            <AppBarTab />
        </Pressable>
    </View>
}

export default AppBar