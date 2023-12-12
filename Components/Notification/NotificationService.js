import React, { Component } from 'react';
import messaging from '@react-native-firebase/messaging';
import { Text, View, } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee from '@notifee/react-native';

class PushNotificationComponent extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.requestUserPermission();
        this.NotificationListner();
    }
    requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
            this.getFcmToken()
        }
    }
    getFcmToken = async () => {
        let FcmToken = await AsyncStorage.getItem('FcmToken');
        console.log(FcmToken, 'old token')
        if (!FcmToken) {
            try {
                let FcmToken = await messaging().getToken();
                if (FcmToken) {
                    console.log(FcmToken, 'new generated Token')
                    await AsyncStorage.setItem('FcmToken', FcmToken)
                }
            } catch (error) {
                console.log(error, 'error raised in fcmToken')
            }
        }
    }
    NotificationListner = async () => {
        this.messageListener =   messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
                'Notification caused app to open from background state:', remoteMessage.notification);
        });
        messaging().onMessage(async remoteMessage => {
            console.log('recived in foreground', remoteMessage)
            DisplayNotification(remoteMessage)
        })
        const DisplayNotification = async data => {
            // Request permissions
            await notifee.requestPermission()

            // Create a channel (required for Android)
            const channelId = await notifee.createChannel({
                id: 'default',
                name: 'Default Channel',
            });

            // Display a notification
            await notifee.displayNotification({
                title: data.notification.title,
                body: data.notification.body,
                android: {
                    channelId,
                    pressAction: {
                        id: 'default',
                    },
                },
            });
        }
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage.notification,
                    );
                }
            });
    }
    render() {
        return (
            <View>
                <Text>Notification</Text>
            </View>
        );
    }
}

export default PushNotificationComponent;