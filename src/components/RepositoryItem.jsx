import { View, Image, StyleSheet } from "react-native";
import Text from "./Text"
import theme from "../theme";
import Rankings from "./Rankings";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    color: "white"
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 3,
    marginLeft: theme.margins.left,
    marginTop: theme.margins.top,
    marginBottom: theme.margins.bottom
  },
  repositoryInfo: {
    flexDirection: "column",
    paddingLeft: 20,
    marginTop: theme.margins.top,
    marginBottom: theme.margins.bottom,
    flexShrink: 1,
  },
  languageTag: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.primary,
    color: theme.colors.languageTagPrimary,
    fontSize: theme.fontSizes.body,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  repositoryNameInfo: {
    fontWeight: theme.fonts.bold,
    marginTop: 5,
    marginBottom: 5
  },
  repositoryDescription: {
    color: theme.colors.textSecondary,
    wordWrap: theme.breaks.breakWord,
    marginBottom: theme.margins.bottom
  }
})

const RepositoryItem = (props) => {
  return (
    <View testID="repositoryItem">
      <View style={styles.container} marginBottom="10">
        <Image style={styles.profilePic} source={{ uri: props.ownerAvatarUrl }} />
        <View style={styles.repositoryInfo}>
          <Text style={styles.repositoryNameInfo}>{props.fullName}</Text>
          <Text style={styles.repositoryDescription}>{props.description}</Text>
          <Text style={styles.languageTag}>{props.language}</Text>
        </View>
      </View>
      <Rankings
        forksCount={props.forksCount}
        stargazersCount={props.stargazersCount}
        ratingAverage={props.ratingAverage}
        reviewCount={props.reviewCount} />
    </View>
  )
};

export default RepositoryItem;
