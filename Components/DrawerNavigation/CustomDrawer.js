import React from "react";
import { withTranslation } from 'react-i18next';
import { View, Text, ImageBackground, Image, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import Logout from "../StackNavigation/Logout";

class CustomDrawer extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { t } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <DrawerContentScrollView {...this.props}
                    contentContainerStyle={{ backgroundColor: '#fff' }}>
                    <ImageBackground style={{ flexDirection: 'row' }}>
                        <Image source={require('../assets/img.jpg')} style={styles.imageStyle} />
                        <Text style={styles.ImageText}> Murtaza Ahmed</Text>
                    </ImageBackground>
                    <Text style={{ borderBottomWidth: 2, marginBottom: 10,borderColor:'#dddddd' }}></Text>
                    <DrawerItemList {...this.props} />
                </DrawerContentScrollView>
                <View style={styles.logoutContainer}>
                    <Logout {...this.props} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imageStyle: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginLeft: 20,
        top: 10,
        marginBottom:5
    },
    ImageText: {
        fontSize: 20,
        marginLeft: 10,
        marginBottom: 10,
        fontWeight: 'bold',
        top: 35
    },
    logoutContainer: {
        left: 10
    },
})
export default withTranslation()(CustomDrawer);