import { View, StyleSheet, TouchableOpacity } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { Link, useNavigate } from "react-router-native";
import useMe from "../hooks/useMe";
import useSignOut from "../hooks/useSignOut";

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: "row",
  },
  text: {
    color: theme.colors.appBarTabPrimary,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    marginLeft: 10,
  },
});

const AppBarTab = () => {
  const { data, loading, error } = useMe();
  const [signOut] = useSignOut();
  let navigate = useNavigate();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error</Text>;
  }

  const isUserLoggedIn = () => {
    if (data.me) {
      return (
        <View style={styles.flexContainer}>
          {" "}
          <Link to="/createreview">
            <Text style={styles.text}>Create a review</Text>
          </Link>
          <Link to="/signout">
            <TouchableOpacity onPress={onPress}>
              <Text style={styles.text}>Sign out</Text>
            </TouchableOpacity>
          </Link>
        </View>
      );
    } else if (!data.me) {
      return (
        <View style={styles.flexContainer}>
          <Link to="/signin">
            <Text style={styles.text}>Sign in</Text>
          </Link>
          <Link to="/signup">
            <Text style={styles.text}>Sign up</Text>
          </Link>
        </View>
      );
    }
  };

  const onPress = async () => {
    try {
      await signOut();
      navigate(-1);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.flexContainer}>
      <Link to="/">
        <Text style={styles.text}>Repositories</Text>
      </Link>
      {isUserLoggedIn()}
    </View>
  );
};

export default AppBarTab;
