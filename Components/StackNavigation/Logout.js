import React from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
class Logout extends React.Component {
    constructor(props) {
        super(props)
    }
    handleLout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Yes', onPress: this.logoutUser },
                { text: 'No', style: 'No' },

            ],
            { cancelable: false }
        );
    }
    logoutUser = () => {
        this.props.navigation.navigate('Login');
    }
    render() {
        return (
            <View style={styles.containers}>
                <TouchableOpacity
                    onPress={this.handleLout}>
                    <Text style={styles.logoutText}>Log out</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    containers: {
        backgroundColor: '#dddddd',
        width: '96%',
        height: 40,
        top: -20,
        borderRadius: 10
    },
    logoutText: {
        fontSize: 20,
        textAlign: 'center',
        top: 5,
        color: 'black'
    }
})

export default Logout;