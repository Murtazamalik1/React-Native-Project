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
            emailError: ''
        };
    }
    handleDeleteUser = () => {
        const { firstName, lastName, email } = this.state;
        if (!firstName) {
            this.setState({ firstNameError: 'Firstname is required' });
            return;
        }
        if (!lastName) {
            this.setState({ lastNameError: 'Lastname is required' });
            return;
        }
        if (!email) {
            this.setState({ emailError: 'email is required' });
            return;
        }

        //  Updating a user will not update it into the server.
        //  It will simulate a PUT/PATCH request and will return the user with modified data
        axios.delete('https://dummyjson.com/users/1', {
            firstName,
            lastName,
            email
        })
            .then(response => {
                console.log('User Delete successfully:', response.data);
                Alert.alert(' Delete Successfully')
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    };
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
                <Button title="Delete User" onPress={this.handleDeleteUser} />
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