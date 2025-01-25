import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";
import * as Linking from 'expo-linking';
import theme from "../theme";

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
})

const RepositoryView = () => {
    let { userId } = useParams();

    const { data, loading, error } = useQuery(GET_REPOSITORY, {
        variables: { repositoryId: userId },
        skip: !userId,
    });

    if (loading) {
        return <Text>Loading...</Text>
      }
    
    if (error) {
        return <Text>Error: {error.message}</Text>
    }

    const repositoryNode = data.repository
    
    return (
        <View>
            <RepositoryItem
                fullName={repositoryNode.fullName}
                description={repositoryNode.description}
                language={repositoryNode.language}
                forksCount={repositoryNode.forksCount}
                stargazersCount={repositoryNode.stargazersCount}
                ratingAverage={repositoryNode.ratingAverage}
                reviewCount={repositoryNode.reviewCount}
                ownerAvatarUrl={repositoryNode.ownerAvatarUrl}
            />
            <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(repositoryNode.url)}>
                <Text style={styles.buttonText}>Open in Github</Text>
            </TouchableOpacity>
        </View>
    );
}

export default RepositoryView