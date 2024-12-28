import { View, StyleSheet } from 'react-native'
import Text from "./Text"
import theme from '../theme'

const styles = StyleSheet.create({
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        color: theme.colors.appBarTabPrimary,
        fontWeight: theme.fontWeights.bold,
        fontSize: theme.fontSizes.subheading,
        marginLeft: 10
    }
})


const AppBarTab = () => {
    return <View style={styles.flexContainer}>
        <Text style={styles.text}>Repositories</Text>
    </View>
}

export default AppBarTab