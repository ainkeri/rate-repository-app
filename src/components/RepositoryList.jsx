import { FlatList, View, Text, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "#e1e4e8",
    marginBottom: 15,
    marginTop: 15
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : []
  const navigate = useNavigate();

  const handlePress = (id) => {
    navigate(`/${id}`)
  }

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => handlePress(item.id)}>
          <RepositoryItem
            fullName={item.fullName}
            description={item.description}
            language={item.language}
            forksCount={item.forksCount}
            stargazersCount={item.stargazersCount}
            ratingAverage={item.ratingAverage}
            reviewCount={item.reviewCount}
            ownerAvatarUrl={item.ownerAvatarUrl}
          />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

const RepositoryList = () => {
  const { data, loading, error } = useRepositories()

  if (loading) {
    return <Text>Loading...</Text>
  }

  if (error) {
    return <Text>Error: {error.message}</Text>
  }

  return <RepositoryListContainer repositories={data.repositories} />;
};

export default RepositoryList;
