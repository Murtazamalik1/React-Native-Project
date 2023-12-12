import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

class UpdateUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            firstNameError: '',
            lastNameError: '',
            emailError: '',
            Apiresponse: ''
        };
    }
    validateInputs = () => {
        const { firstName, lastName, email } = this.state;
        let isValid = true;

        if (firstName.trim() === '') {
            this.setState({ firstNameError: 'firstName cannot be empty' });
            isValid = false;
        } else {
            this.setState({ firstNameError: '' });
        }
        if (lastName.trim() === '') {
            this.setState({ lastNameError: 'lastName cannot be empty' });
            isValid = false;
        } else {
            this.setState({ lastNameError: '' });
        }
        if (email.trim() === '') {
            this.setState({ emailError: 'email cannot be empty' });
            isValid = false;
        } else {
            this.setState({ emailError: '' });
        }
        return isValid;
    };
    handleUpdateUser = () => {
        if (this.validateInputs()) {
            const { firstName, lastName, email } = this.state;
            try {
                axios.put('https://dummyjson.com/users/1', {
                    firstName,
                    lastName,
                    email
                })
                   .then(res => {
                        this.setState({
                            firstName: res.data.firstName
                        });
                    })
            } catch (error) {
                this.setState(
                    { error: 'Invalid credentials. Please try again.' });
            };
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textStyle}>Update User</Text>
                <TextInput
                    style={styles.input}
                    placeholder=" enter firstname"
                    placeholderTextColor="#008080"
                    value={this.state.firstName}
                    onChangeText={text => this.setState({ firstName: text, firstNameError: '' })}
                />
                <Text style={styles.fieldError}>{this.state.firstNameError}</Text>
                <TextInput
                    style={styles.input}
                    placeholder=" enter lastname"
                    placeholderTextColor="#008080"
                    value={this.state.lastName}
                    onChangeText={text => this.setState({ lastName: text, lastNameError: '' })}
                />
                <Text style={styles.fieldError}>{this.state.lastNameError}</Text>
                <TextInput
                    style={styles.input}
                    placeholder=" enter email"
                    placeholderTextColor="#008080"
                    value={this.state.email}
                    onChangeText={text => this.setState({ email: text, emailError: '' })}
                />
                <Text style={styles.fieldError}>{this.state.emailError}</Text>
                <TouchableOpacity
                    onPress={this.handleUpdateUser} >
                    <Text style={styles.btn}>Update User</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    input: {
        justifyContent: 'center',
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderBottomWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 3,
    },
    textStyle: {
        marginTop: 50,
        marginBottom: 60,
        fontSize: 30,
        color: '#48D1CC'
    },
    fieldError: {
        color: 'red'
        , right: 90
        , top: -19
    },
    btn: {
        textAlign: 'center',
        fontSize: 20,
        borderWidth: 1,
        backgroundColor: '#2E8B57',
        height: 45,
        width: 200,
        paddingTop: 8,
        borderRadius: 20,
        color: '#fff',
        borderBottomColor: '#228B22'
    }
});

export default UpdateUser;
