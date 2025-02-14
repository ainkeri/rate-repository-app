import * as yup from "yup";

import Text from "./Text";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { useFormik } from "formik";

import theme from "../theme";
import useCreateUser from "../hooks/useCreateUser";
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
  username: "",
  password: "",
  passwordConfirm: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username length must be greater or equal to 5")
    .max(30, "Username length must be less or equal to 30")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password length must be greater or equal to 5")
    .max(50, "Password length must be less or equal to 50")
    .required("Password is required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Password confirmation is required"),
});

export const SignUpForm = ({ onSubmit }) => {
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
          formik.touched.username &&
            formik.errors.username && { borderColor: "#d73a4a" },
        ]}
        marginTop="10"
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[
          styles.inputContainer,
          formik.touched.password &&
            formik.errors.password && { borderColor: "#d73a4a" },
        ]}
        marginTop="10"
        placeholder="Password"
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}
      <TextInput
        style={[
          styles.inputContainer,
          formik.touched.passwordConfirm &&
            formik.errors.passwordConfirm && { borderColor: "#d73a4a" },
        ]}
        marginTop="10"
        placeholder="Password confirmation"
        secureTextEntry={true}
        value={formik.values.passwordConfirm}
        onChangeText={formik.handleChange("passwordConfirm")}
      />
      {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
        <Text style={styles.errorText}>{formik.errors.passwordConfirm}</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const SignUp = () => {
  const [createUser] = useCreateUser();
  let navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await createUser({ username, password });
      navigate("/signin");
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpForm onSubmit={onSubmit} />;
};

export default SignUp;
