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
            emailError: ''
        };
    }
    handleUpdateUser = () => {
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

        // Updating a user will not update it into the server.
        // It will simulate a PUT/PATCH request and will return the user with modified data
        axios.put('https://dummyjson.com/users/2', {
            firstName,
            lastName,
            email
        })
            .then(response => {
                console.log('User updated successfully:', response.data);
                Alert.alert('updated User Successfully')
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    };

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
