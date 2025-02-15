import { FlatList, View, Text, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import { useState, useRef } from "react";
import { Button, Menu, PaperProvider, Searchbar } from "react-native-paper";
import theme from "../theme";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "#e1e4e8",
    marginBottom: 15,
    marginTop: 15,
  },
  menuBar: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "#e1e4e8",
  },
  menuText: {
    color: theme.colors.textSecondary,
  },
  searchBar: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  onChange,
  menuItem,
  onSearchInput,
  searchKeyword,
}) => {
  const [visible, setVisible] = useState(false);
  const searchRef = useRef(null);

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  const navigate = useNavigate();

  const handlePress = (id) => {
    navigate(`/${id}`);
  };

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <PaperProvider>
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
        ListHeaderComponent={
          <>
            <Searchbar
              ref={searchRef}
              style={styles.searchBar}
              placeholder="Search"
              onChangeText={onSearchInput}
              value={searchKeyword}
            />
            <View style={styles.menuBar}>
              <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                  <Button onPress={openMenu}>
                    <Text style={styles.menuText}>{menuItem}</Text>
                  </Button>
                }
              >
                <Menu.Item
                  onPress={() => {
                    onChange("Latest repositories", "CREATED_AT", "DESC");
                    closeMenu();
                  }}
                  title="Latest repositories"
                />
                <Menu.Item
                  onPress={() => {
                    onChange(
                      "Highest rated repositories",
                      "RATING_AVERAGE",
                      "DESC"
                    );
                    closeMenu();
                  }}
                  title="Highest rated repositories"
                />
                <Menu.Item
                  onPress={() => {
                    onChange(
                      "Lowest rated repositories",
                      "RATING_AVERAGE",
                      "ASC"
                    );
                    closeMenu();
                  }}
                  title="Lowest rated repositories"
                />
              </Menu>
            </View>
          </>
        }
      />
    </PaperProvider>
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const [menuItem, setMenuItem] = useState("Latest repositories");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const { data, loading, error } = useRepositories(
    orderBy,
    orderDirection,
    debouncedSearchKeyword
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const onChange = (menuItem, orderBy, orderDirection) => {
    setMenuItem(menuItem);
    setOrderBy(orderBy);
    setOrderDirection(orderDirection);
  };

  const onSearchInput = (searchKeyword) => {
    setSearchKeyword(searchKeyword);
  };

  return (
    <RepositoryListContainer
      repositories={data.repositories}
      onChange={onChange}
      menuItem={menuItem}
      onSearchInput={onSearchInput}
      searchKeyword={searchKeyword}
    />
  );
};

export default RepositoryList;
