import { View, StyleSheet } from "react-native";
import Text from "./Text"
import theme from "../theme";

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    numbers: {
        fontWeight: theme.fontWeights.bold,
    },
    rankings: {
        color: theme.colors.textSecondary
    }
})

const Rankings = (props) => {
    const formatNumbers = (count) => {
        return count > 1000 ? (count / 1000).toFixed(1) + 'k' : count.toString()
    }

    const stars = formatNumbers(props.stargazersCount)
    const forks = formatNumbers(props.forksCount)

    return (
        <View style={styles.container}>
            <View flexDirection="column">
                <Text style={styles.numbers}>{stars}</Text>
                <Text style={styles.rankings}>Stars</Text>
            </View>
            <View flexDirection="column">
                <Text style={styles.numbers}>{forks}</Text>
                <Text style={styles.rankings}>Forks</Text>
            </View>
            <View flexDirection="column">
                <Text style={styles.numbers}>{props.reviewCount}</Text>
                <Text style={styles.rankings}>Reviews</Text>
            </View>
            <View flexDirection="column">
                <Text style={styles.numbers}>{props.ratingAverage}</Text>
                <Text style={styles.rankings}>Rating</Text>
            </View>
        </View>
    )
};

export default Rankings;
