import React from "react";
import {
    ImageBackground,
    StyleSheet, Text,
    TextInput,
    View,
    TouchableOpacity,
    ScrollView,
    Alert,

} from "react-native";
import { withTranslation } from 'react-i18next';
import axios from 'axios';


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            phoneNo: '',
            nameValid: true,
            emailValid: true,
            passwordValid: true,
            phoneNoValid: true
        }
    }
    /* getApiData = async () => {
         const url = "http://jsonplaceholder.typicode.com/posts/1";
         try {
             const response = await fetch(url);
             let data = await response.json();
         } catch (error) {
             console.error(error);
         }
         */
    validateName = (username) => {
        const nameRegex = /^[A-Za-z ]+$/;
        return nameRegex.test(username) && username.length >= 5 && username.length <= 50;
    };
    validateEmail = (email) => {
        const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        return emailRegex.test(email);
    };

    validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password)
    };
    handleSignUp = async () => {
        const { username, email, password, } = this.state;
        const nameValid = this.validateName(username)
        const emailValid = this.validateEmail(email);
        const passwordValid = this.validatePassword(password);

        this.setState({ nameValid, emailValid, passwordValid });

        if (nameValid && emailValid && passwordValid) {
            try {
                const response = await axios.post('', {
                    username: username,
                    email: email,
                    password: password,
                    phoneNo: phoneNo
                });
                console.log('login successful :', response.data)
                this.props.navigation.navigate('Login')
            } catch (error) {
                console.error('Signup failed:', error);
                Alert.alert('Signup Error', 'Failed to sign up. Please try again.');
            }
            //   this.props.navigation.navigate('Login')
        }
    }
    render() {
        const { t } = this.props;
        return (
            <ScrollView>
                <ImageBackground source={require('../assets/leaves.jpg')}
                    style={styles.backgroundImageStyle}>
                    <Text style={styles.TextStyle}>
                        Create Account</Text>
                    <View style={styles.BackgroundStyle}>
                        <View style={{ marginTop: 40 }}>
                            <Text style={styles.LabelStyle}> {t('Name')} </Text>
                            <View >
                                <TextInput
                                    style={[styles.inputStyle, !this.state.nameValid && styles.invalidInput]}
                                    placeholder={t("Enter Your Name")}
                                    onChangeText={(username) => this.setState({ username })}
                                    value={this.state.username} />
                            </View>
                        </View>
                        <Text style={styles.LabelStyle}> {t('Email')} </Text>
                        <View >
                            <TextInput style={[styles.inputStyle, !this.state.emailValid && styles.invalidInput]}
                                onChangeText={(email) => this.setState({ email })}
                                value={this.state.email}
                                placeholder={t("Enter Your Email")}
                                keyboardType="email-address" />
                        </View>
                        <Text style={styles.LabelStyle}> {t('Password')} </Text>
                        <View >
                            <TextInput style={[styles.inputStyle, !this.state.passwordValid && styles.invalidInput]}
                                onChangeText={(password) => this.setState({ password })}
                                value={this.state.password}
                                placeholder={t("Enter Your Password")}
                                secureTextEntry={true}
                            />
                        </View>
                        <Text style={styles.LabelStyle}>Phone no</Text>
                        <View style={styles.inputStyle}>
                            <TextInput placeholder="+91"
                                keyboardType="numeric"
                                style={styles.NumericStyle} />
                            <TextInput placeholder={t("Enter Phone Number")}
                                keyboardType="numeric" style={{ width: '80%'}}/>
                        </View>
                        <View>
                        </View>
                        <TouchableOpacity onPress={this.handleSignUp}>
                            <Text style={styles.ButtonText}> {t('Sign Up')} </Text>
                        </TouchableOpacity>
                        <View style={styles.SignUpContainer}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{t('Already have an account')}</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                                <Text style={styles.SignInBtn}>  {t('Log in')} </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    backgroundImageStyle: {
        height: '100%',
        resizeMode: 'cover',

    },
    TextStyle: {
        fontSize: 30,
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 50,
    },
    BackgroundStyle: {
        backgroundColor: 'white',
        height: 700,
        width: 400,
        borderTopLeftRadius: 100,
        marginTop: 40
    },
    LabelStyle: {
        fontSize: 20,
        marginLeft: 38,
        color: 'black',
        marginTop: 8
    },
    inputStyle: {
        backgroundColor: 'white',
        marginTop: 10,
        borderWidth: 1,
        width: '80%',
        borderRadius: 20,
        borderColor: 'black',
        height: 48,
        paddingLeft: 10,
        left: 38,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    NumericStyle: {
        width: '12%',
        borderRightWidth: 1,
        height: '100%',
        borderLeftColor: '#dddddd',

    },
    ButtonText: {
        textAlign: 'center',
        fontSize: 20,
        borderWidth: 1,
        backgroundColor: '#24a0ed',
        height: 48,
        left: 38,
        paddingTop: 8,
        borderRadius: 20,
        color: '#fff',
        borderColor: '#bbbbbb',
        width: '80%',
        marginTop: 30,
        marginBottom: 20
    },
    SignUpContainer: {
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
    SignInBtn: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#24a0ed'
    },
    invalidInput: {
        borderColor: 'red',
        borderWidth: 2
    },
})
export default withTranslation()(Register);