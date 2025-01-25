import * as yup from 'yup'

import Text from './Text';
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useFormik } from 'formik';

import theme from '../theme';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
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
        alignItems: 'center',
        width: '90%',
        height: 50,
        backgroundColor: '#f1f1f1',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: 'grey',
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
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: theme.fontSizes.signInInput,
    },
    errorText: {
        color: "#d73a4a",
        fontSize: theme.fontSizes.body,
        marginBottom: 10,
        paddingLeft: 20,
        alignSelf: "flex-start"
    }
})

const initialValues = {
    username: '',
    password: ''
}

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(3, "Username length must be greater or equal to 3")
        .required("Username is required"),
    password: yup
        .string()
        .min(5, "Password length must be greater or equal to 5")
        .required("Password is required")
})

export const SignInForm = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.inputContainer, formik.touched.username && formik.errors.username && { borderColor: '#d73a4a' }]}
                marginTop="10"
                placeholder="Username"
                value={formik.values.username}
                onChangeText={formik.handleChange('username')}
            />
            {formik.touched.username && formik.errors.username && (
                <Text style={styles.errorText}>{formik.errors.username}</Text>
            )}
            <TextInput
                style={[styles.inputContainer, formik.touched.password && formik.errors.password && { borderColor: '#d73a4a' }]}
                placeholder="Password"
                value={formik.values.password}
                secureTextEntry={true}
                onChangeText={formik.handleChange('password')}
            />
            {formik.touched.password && formik.errors.password && (
                <Text style={styles.errorText}>{formik.errors.password}</Text>
            )}
            <TouchableOpacity style={styles.button} onPress={formik.handleSubmit}>
                <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>
        </View>
    )
};

const SignIn = () => {
    const [signIn] = useSignIn()
    let navigate = useNavigate()

    const onSubmit = async (values) => {
        const { username, password } = values
        try {
            await signIn({ username, password })
            navigate(-1)
        } catch (e) {
            console.log(e)
        }

    }

    return <SignInForm onSubmit={onSubmit} />
}

export default SignIn;