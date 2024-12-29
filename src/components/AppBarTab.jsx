import { View, StyleSheet } from 'react-native'
import Text from "./Text"
import theme from '../theme'
import { Link } from 'react-router-native'

const styles = StyleSheet.create({
    flexContainer: {
        flexDirection: 'row',
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
        <Link to="/">
            <Text style={styles.text}>Repositories</Text>
        </Link>
        <Link to="/signin">
            <Text style={styles.text}>Sign in</Text>
        </Link>
    </View>
}

export default AppBarTab