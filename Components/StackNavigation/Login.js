import axios from "axios";
import { withTranslation } from 'react-i18next';
import React from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ScrollView, ToastAndroid } from "react-native";

class LoginScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ApiResponse: '',
            username: '',
            password: '',
            error: '',
            usernameError: '',
            passwordError: '',
        };
    }
    showToast = () => {
        ToastAndroid.show(this.state.error, ToastAndroid.SHORT);
      };
    validateInputs = () => {
        const { t } = this.props;
        const { username, password } = this.state;
        let isValid = true;

        if (username.trim() === '') {
            this.setState({ usernameError: t('username are required') });
            isValid = false;
        } else {
            this.setState({ usernameError: '' });
        }
        if (password.trim() === '') {
            this.setState({ passwordError: t('password are required') });
            isValid = false;
        } else {
            this.setState({ passwordError: '' });
        }
        return isValid;
    };
    handleLogin = () => {
        if (this.validateInputs()) {
            const { username, password, } = this.state;
                axios.post('https://dummyjson.com/auth/login', {
                    username: username,
                    password: password,
                })
                    .then(res => {
                        this.setState({
                            ApiResponse: res.data,
                        });
                        this.props.navigation.navigate('Root')
                    })
                    .catch((err)=>{
                        console.log(err)
                        this.setState({ error: 'Invalid credentials. Please try again' }, this.showToast);
                    })
                }
        }
    render() {
        const { t } = this.props;
        return (
            <ScrollView>
                <ImageBackground source={require('../assets/welcome.jpg')}
                    style={styles.backgroundImageStyle}>
                    <View style={styles.BackgroundStyle}>
                        <Text style={styles.TextStyle}>LogIn</Text>
                        <Text style={{
                            fontSize: 20, marginBottom: 30, color: 'grey'
                            , textAlign: 'center',
                        }}> {t('Login to your account')}
                        </Text>
                        <Text style={styles.label}> {t('Name')}
                        </Text>
            
                        <TextInput style={styles.InputStyle}
                            placeholder={t('usernamePlaceholder')}
                            onChangeText={(text) => this.setState({ username: text, usernameError: '' })}
                            value={this.state.username}
                        />
                        <Text style={styles.inValidInput}>{this.state.usernameError}
                        </Text>
                        <Text style={styles.label}> {t('Password')}
                        </Text>
                        <TextInput style={styles.InputStyle}
                            placeholder={t('passwordPlaceholder')}
                            onChangeText={(text) => this.setState({ password: text, passwordError: '' })}
                            secureTextEntry={true}
                            value={this.state.password}
                             />
                        <Text style={styles.inValidInput}>{this.state.passwordError}
                        </Text>
                        <TouchableOpacity>
                            <Text style={styles.passworStyle}>
                                {t('forget your password')}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={this.handleLogin}>
                            <Text style={styles.ButtonText}>
                                {t('Log in')}
                            </Text>
                        </TouchableOpacity>
                        
                        <View style={styles.SignUpContainer}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', left: 6,top:8 }}>{t('dont have account')}</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
                                <Text style={styles.SignUpBtn}>{t('Sign Up')}</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('translation')}>
                                <Text style={styles.changeLanguage}> {t('Change Language')} </Text>
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
        height: '65%',
        resizeMode: 'cover',
    },
    BackgroundStyle: {
        backgroundColor: 'white',
        height: 530,
        width: 350,
        left: 20,
        marginTop: 250,
        borderRadius: 30

    },
    label: {
        fontSize: 20,
        marginLeft: 18,
        color: 'black',
        marginBottom: 12
    },
    TextStyle: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        color: '#12c9ff'
    },
    InputStyle: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#bbbbbb',
        backgroundColor: 'white',
        fontSize: 16,
        height: 45,
        width: 330,
        left: 10,
        paddingLeft: 15,
        marginBottom: 3,
        fontStyle: 'normal'
    },
    ButtonText: {
        textAlign: 'center',
        fontSize: 20,
        borderWidth: 1,
        backgroundColor: '#24a0ed',
        height: 40,
        width: 200,
        left: '23%',
        paddingTop: 5,
        borderRadius: 20,
        color: '#fff',
        borderColor: '#bbbbbb',
    },
    passworStyle: {
        color: 'black',
        textAlign: 'left',
        width: 349,
        marginBottom: 20,
        left: 17
    },
    errorStyle: {
        color: 'red',
        textAlign: 'center',
    },
    SignUpContainer: {
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
    SignUpBtn: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#24a0ed',
        left: 6,
        top:8
    },
    inValidInput: {
        color: 'red',
        left: 18,
        fontSize: 16
    },
    changeLanguage:{
        textAlign:'center',
        fontSize:20,
        top:25,
        color:'#9CA594',
        fontWeight:'bold'
    }
});
export default withTranslation()(LoginScreen);