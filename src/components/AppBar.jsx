import { View, StyleSheet, Pressable, ScrollView } from 'react-native'
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

const AppBar = () => {
    return <View style={styles.container}>
        <ScrollView horizontal={true}>
            <Pressable>
                <AppBarTab />
            </Pressable>
        </ScrollView>
    </View >
}

export default AppBar