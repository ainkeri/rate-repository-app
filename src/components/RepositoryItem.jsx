import { View } from "react-native";
import Text from "./Text"

const RepositoryItem = (props) => {
  return (
    <View>
      <Text>Full name: {props.fullName}</Text>;
      <Text>Description: {props.description}</Text>
      <Text>Language: {props.language}</Text>
      <Text>Stars: {props.stargazersCount}</Text>
      <Text>Forks: {props.forksCount}</Text>
      <Text>Reviewes: {props.reviewCount}</Text>
      <Text>Rating: {props.ratingAverage}</Text>
    </View>
  )

};

export default RepositoryItem;
