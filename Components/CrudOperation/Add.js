import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';

class AddUser extends Component {
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

  handleCreateUser = () => {
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
    // Adding a new user will not add it into the server.
    // It will simulate a POST request and will return the new created user with a new id
    axios.post('https://dummyjson.com/users/add', {
      firstName,
      lastName,
      email
    })
      .then(response => {
        console.log('User created successfully:', response.data);
        Alert.alert('Add User Successfully')
        // Optionally, you can navigate to another screen or perform other actions
      })
      .catch(error => {
        console.error('Error creating user:', error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>Add New User</Text>
        <TextInput
          style={styles.input}
          placeholder=" enter first name"
          placeholderTextColor="#12c9ff"
          value={this.state.firstName}
          onChangeText={text => this.setState({ firstName: text, firstNameError: '' })}
        />
        <Text style={styles.fieldError}>{this.state.firstNameError}</Text>
        <TextInput
          style={styles.input}
          placeholder=" enter Last name"
          placeholderTextColor="#12c9ff"
          value={this.state.lastName}
          onChangeText={text => this.setState({ lastName: text, lastNameError: '' })}
        />
        <Text style={styles.fieldError}>{this.state.lastNameError}</Text>
        <TextInput
          style={styles.input}
          placeholder=" enter email"
          placeholderTextColor="#12c9ff"
          value={this.state.email}
          onChangeText={text => this.setState({ email: text, emailError: '' })}
        />
        <Text style={styles.fieldError}>{this.state.emailError}</Text>
        <TouchableOpacity
          onPress={this.handleCreateUser} >
          <Text style={styles.btn}>Add User</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center'
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
    color: '#20B2AA'
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
    backgroundColor: '#4169E1',
    height: 45,
    width: 200,
    paddingTop: 8,
    borderRadius: 20,
    color: '#fff',
    // borderColor: '#bbbbbb',
    borderBottomColor: '#228B22'
  }
});

export default AddUser;