import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";

import RepositoryList from "./RepositoryList";
import SingleRepository from "./SingleRepository";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
import Review from "./ReviewForm";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    color: "#e1e4e8",
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/:userId" element={<SingleRepository />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/createreview" element={<Review />} />
        <Route path="/signout" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
