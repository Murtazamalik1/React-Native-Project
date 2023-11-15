import axios from "axios";
import React from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, } from "react-native";

class LoginScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            error: '',
            usernameError: '',
            passwordError: ''
        };
    }
    handleLogin = async () => {
        const { username, password } = this.state;

        this.setState({ usernameError: '', passwordError: '' })
        if (!username) {
            this.setState({ usernameError: 'Username is required' });
            return;
        }
        if (!password) {
            this.setState({ passwordError: 'password is required' });
            return;
        }
        await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'kminchelle',
                password: '0lelplR'
            }),
        })
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                this.props.navigation.navigate('Root')
            })
            .catch((error) => {
                console.error(error);
                this.setState({ usernameError: 'network error' })
            });
    }
    render() {
        return (
            <View>
                <Text style={styles.TextStyle}>LogIn</Text>
                <Text style={{
                    fontSize: 20, marginBottom: 40, color: 'grey'
                    , textAlign: 'center',
                }}>Login to your account</Text>
                <Text style={styles.label}>Name</Text>
                <TextInput style={styles.InputStyle}
                    placeholder="username"
                    onChangeText={(text) => this.setState({ username: text, usernameError: '' })}
                    value={this.state.username}
                />
                <Text style={{ color: 'red' }}>{this.state.usernameError}</Text>
                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.InputStyle}
                    placeholder="password"
                    onChangeText={(text) => this.setState({ password: text, passwordError: '' })}
                    secureTextEntry={true}
                    value={this.state.password} />
                <Text style={{ color: 'red' }}>{this.state.passwordError}</Text>
                <TouchableOpacity>
                    <Text style={styles.passworStyle}>
                        forget your password?
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.handleLogin}>
                    <Text style={styles.ButtonText}>
                        Log in
                    </Text>
                </TouchableOpacity>
                <Text style={styles.errorStyle}> {this.state.error}</Text>
                <View style={styles.SignUpContainer}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>don't have account ?</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
                        <Text style={styles.SignUpBtn}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({

    label: {
        fontSize: 20,
        marginLeft: 29,
        color: 'black',
        marginBottom: 12
    },
    TextStyle: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 140,
        color: 'black',
        color: '#12c9ff'
    },
    InputStyle: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#bbbbbb',
        backgroundColor: '#dddddd',
        fontSize: 16,
        height: 45,
        width: 330,
        left: 25,
        paddingLeft: 12,
        marginBottom: 12,
        fontStyle: 'italic'
    },
    ButtonText: {
        textAlign: 'center',
        fontSize: 20,
        borderWidth: 1,
        backgroundColor: '#237fb7',
        height: 45,
        width: 330,
        left: 25,
        paddingTop: 8,
        borderRadius: 20,
        color: '#fff',
        borderColor: '#bbbbbb',
    },
    passworStyle: {
        color: 'black',
        textAlign: 'right',
        width: 349,
        marginBottom: 70
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
        color: 'darkgreen'
    }
});
export default LoginScreen;