import React from "react";
import { withTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
class Logout extends React.Component {
    constructor(props) {
        super(props)
    }
    handleLout = () => {
        const { t } = this.props;
        Alert.alert(
            t('Logout'),
            t('Are you sure you want to logout'),
            [
                { text: t('Yes'), onPress: this.logoutUser },
                { text: t('No'), style: 'No' },

            ],
            { cancelable: false }
        );
    }
    logoutUser = () => {
        this.props.navigation.navigate('Login');
    }
    render() {
        const { t } = this.props;
        return (
            <View style={styles.containers}>
                <TouchableOpacity
                    onPress={this.handleLout}>
                    <Text style={styles.logoutText}> {t('Log out')} </Text>
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

export default withTranslation()(Logout);