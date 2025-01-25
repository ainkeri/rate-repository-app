import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RepositoryItem from "./RepositoryItem";
import * as Linking from 'expo-linking';
import theme from "../theme";
import useRepository from "../hooks/useRepository";
import { FlatList } from "react-native";
import { format } from "date-fns";

const styles = StyleSheet.create({
    button: {
        height: 50,
        backgroundColor: theme.colors.primary,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 5,
        marginRight: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: theme.fontSizes.gitHub,
    },
    container: {
        flexDirection: "row",
        color: "white"
    },
    ratingCircle: {
        width: 45,
        height: 45,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: theme.colors.primary,
        borderRadius: 22.5,
        marginLeft: theme.margins.left,
        marginTop: theme.margins.top,
        marginBottom: theme.margins.bottom,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ratingText: {
        color: theme.colors.primary,
        fontSize: theme.fontSizes.body,
        fontWeight: theme.fontWeights.bold
    },
    reviewInfo: {
        flexDirection: "column",
        paddingLeft: 10,
        marginTop: theme.margins.top,
        marginBottom: theme.margins.bottom,
        flexShrink: 1,
    },
    reviewNameInfo: {
        fontWeight: theme.fontWeights.bold,
        marginTop: 5,
        marginBottom: 5
    },
    reviewDescription: {
        color: theme.colors.textSecondary,
        wordWrap: theme.breaks.breakWord,
        marginBottom: theme.margins.bottom
    },
    separator: {
        height: 10,
        backgroundColor: "#e1e4e8",
        marginBottom: 15,
        marginTop: 15
      },
})

const ItemSeparator = () => <View style={styles.separator} />;
  
const RepositoryInfo = ({ repository }) => { 
    return (
        <View>
            <RepositoryItem
                fullName={repository.fullName}
                description={repository.description}
                language={repository.language}
                forksCount={repository.forksCount}
                stargazersCount={repository.stargazersCount}
                ratingAverage={repository.ratingAverage}
                reviewCount={repository.reviewCount}
                ownerAvatarUrl={repository.ownerAvatarUrl}
            />
            <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(repository.url)}>
                <Text style={styles.buttonText}>Open in Github</Text>
            </TouchableOpacity>
        </View>
    );
}

const ReviewItem = ({ review }) => {
    const date = new Date(review.createdAt)
    const formattedDate = format(date, "dd.MM.yyyy");
    
    return (
        <View>
            <View style={styles.container} marginBottom="10">
            <View style={styles.ratingCircle}>
                <Text style={styles.ratingText}>{review.rating}</Text>
            </View>
                <View style={styles.reviewInfo}>
                    <Text style={styles.reviewNameInfo}>{review.user.username}</Text>
                    <Text style={styles.reviewDescription}>{formattedDate}</Text>
                    <Text style={styles.reviewDescription}>{review.text}</Text>
                </View>
            </View>
        </View>
    )
};

const SingleRepository = () => {
    const { data, loading, error } = useRepository()

    if (loading) {
        return <Text>Loading...</Text>
      }
    
    if (error) {
        return <Text>Error: {error.message}</Text>
    }

    const repository = data.repository
    const reviews = data.repository.reviews ? data.repository.reviews.edges.map(edge => edge.node) : []

    return (
        <FlatList
            data={reviews}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({item}) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
        />
    )
}

export default SingleRepository