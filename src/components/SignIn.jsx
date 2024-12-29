import Text from './Text';
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useFormik } from 'formik';

import theme from '../theme';

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
        marginBottom: 10
    },
    inputField: {
        width: "90%",
        padding: 10,
        height: 40,
        fontSize: theme.fontSizes.signInInput
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
        fontSize: theme.fontSizes.signInInput
    }
})


const initialValues = {
    username: '',
    password: ''
}

const SignInForm = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues,
        onSubmit
    })

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.inputContainer}
                marginTop="10"
                placeholder="Username"
                value={formik.values.username}
                onChangeText={formik.handleChange('username')}
            />
            <TextInput
                style={styles.inputContainer}
                placeholder="Password"
                value={formik.values.password}
                secureTextEntry={true}
                onChangeText={formik.handleChange('password')}
            />


            <TouchableOpacity style={styles.button} onPress={formik.handleSubmit}>
                <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>
        </View>
    )
};

const SignIn = () => {
    const onSubmit = values => {
        console.log(values)

    }

    return <SignInForm onSubmit={onSubmit} />
}

export default SignIn;