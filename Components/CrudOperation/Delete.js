import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

class DeleteUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            firstNameError: '',
            lastNameError: '',
            emailError: '',
            ApiResponse: '',
        };
    }
    // validateInputs = () => {
    //     const { firstName, lastName,email } = this.state;
    //     let isValid = true;
    //     if (firstName.trim() === '') {
    //       this.setState({ firstNameError: 'firstName cannot be empty' });
    //       isValid = false;
    //     } else {
    //       this.setState({ firstNameError: '' });
    //     }
    //     if (lastName.trim() === '') {
    //       this.setState({ lastNameError: 'lastName cannot be empty' });
    //       isValid = false;
    //     } else {
    //       this.setState({ lastNameError: '' });
    //     }
    //     if (email.trim() === '') {
    //       this.setState({ emailError: 'email cannot be empty' });
    //       isValid = false;
    //     } else {
    //       this.setState({ emailError: '' });
    //     }
    //     return isValid;
    //   };
    handleDeleteUser = () => {
      //  if (this.validateInputs()) {
            const { firstName, lastName, email, } = this.state;
            try {
                axios.delete('https://dummyjson.com/users/1', {
                    firstName,
                    lastName,
                    email,
                })
                    .then(res => {
                        const apiResponse = res.data
                        console.log('-------apiresponse-----',apiResponse)
                        this.setState({
                            ApiResponse : res.data
                        });
                    })
            } catch (error) {
                this.setState(
                    { ApiResponse: 'Invalid credentials. Please try again.' });
            };
        };
  //  }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textStyle}>Delete User</Text>
                <TextInput
                    style={styles.input}
                    placeholder="firstName"
                    value={this.state.firstName}
                    onChangeText={text => this.setState({ firstName: text, firstNameError: '' })}
                />
                <Text style={styles.fieldError}>{this.state.firstNameError}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="LastName"
                    value={this.state.lastName}
                    onChangeText={text => this.setState({ lastName: text, lastNameError: '' })}
                />
                <Text style={styles.fieldError}>{this.state.lastNameError}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="email"
                    value={this.state.email}
                    onChangeText={text => this.setState({ email: text, emailError: '' })}
                />
                <Text style={styles.fieldError}>{this.state.emailError}</Text>
                <Button title="Delete User" onPress={this.handleDeleteUser}
                />
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
        marginBottom: 10,
        paddingHorizontal: 3,
    },
    textStyle: {
        marginTop: 50,
        marginBottom: 60,
        fontSize: 30,
        color: 'red'
    },
    fieldError: {
        color: 'red'
        , right: 90
        , top: -14
    },
});

export default DeleteUser;