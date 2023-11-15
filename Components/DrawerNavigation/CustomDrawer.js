import React from "react";
import { View, Text, ImageBackground, Image, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import Logout from "../StackNavigation/Logout";

class CustomDrawer extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <DrawerContentScrollView {...this.props}
                    contentContainerStyle={{ backgroundColor: '#fff' }}>
                    <ImageBackground>
                        <Image source={require('../assets/img.jpg')} style={styles.imageStyle} />
                        <Text style={styles.ImageText}>Murtaza Ahmed</Text>
                    </ImageBackground>
                    <Text style={styles.UserText}>Update User Details</Text>
                    <Text style={{ borderBottomWidth: 1, marginBottom: 10 }}></Text>
                    <DrawerItemList {...this.props} />
                </DrawerContentScrollView>
                <View style={styles.logoutContainer}>
                    <Logout {...this.props}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imageStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        width: 100,
        height: 100,
        borderRadius: 50,
        marginLeft: 30
    },
    ImageText: {
        borderBottomWidth: 1,
        fontSize: 20,
        marginLeft: 10,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    UserText: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    logoutContainer: {
        left: 10
    },
})
export default CustomDrawer;