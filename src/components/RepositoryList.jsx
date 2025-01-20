import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "#e1e4e8",
    marginBottom: 15,
    marginTop: 15
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories()

  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
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
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;
