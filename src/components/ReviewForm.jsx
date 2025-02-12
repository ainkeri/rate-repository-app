import * as yup from "yup";

import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useFormik } from "formik";

import theme from "../theme";
import useCreateReview from "../hooks/useCreateReview";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  signInButton: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.primary,
    color: theme.colors.languageTagPrimary,
    fontSize: theme.fontSizes.body,
    borderRadius: 5,
  },
  inputContainer: {
    alignItems: "center",
    width: "90%",
    height: 50,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "grey",
  },
  inputField: {
    width: "90%",
    padding: 10,
    height: 40,
    fontSize: theme.fontSizes.signInInput,
  },
  button: {
    width: "90%",
    height: 50,
    backgroundColor: theme.colors.primary,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: theme.fontSizes.signInInput,
  },
  errorText: {
    color: "#d73a4a",
    fontSize: theme.fontSizes.body,
    marginBottom: 10,
    paddingLeft: 20,
    alignSelf: "flex-start",
  },
});

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .typeError("Rating must be a number")
    .min(0, "Rating has to be between 0-100")
    .max(100, "Rating has to be between 0-100")
    .required("Rating is required"),
  text: yup.string().optional(),
});

export const ReviewForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.inputContainer,
          formik.touched.ownerName &&
            formik.errors.ownerName && { borderColor: "#d73a4a" },
        ]}
        marginTop="10"
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
      )}
      <TextInput
        style={[
          styles.inputContainer,
          formik.touched.repositoryName &&
            formik.errors.repositoryName && { borderColor: "#d73a4a" },
        ]}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
      )}
      <TextInput
        style={[
          styles.inputContainer,
          formik.touched.rating &&
            formik.errors.rating && { borderColor: "#d73a4a" },
        ]}
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={(text) => formik.setFieldValue("rating", parseInt(text))}
        keyboardType="numeric"
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.errorText}>{formik.errors.rating}</Text>
      )}
      <TextInput
        style={[
          styles.inputContainer,
          formik.touched.text &&
            formik.errors.text && { borderColor: "#d73a4a" },
        ]}
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange("text")}
      />
      {formik.touched.text && formik.errors.text && (
        <Text>{formik.errors.text}</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Create a review</Text>
      </TouchableOpacity>
    </View>
  );
};

const Review = () => {
  const [createReview] = useCreateReview();
  let navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    console.log(values);
    try {
      await createReview({ ownerName, repositoryName, rating, text });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewForm onSubmit={onSubmit} />;
};

export default Review;
