import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, StyleSheet, Text, View, TouchableOpacity, I18nManager, } from "react-native";
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNRestart from 'react-native-restart';

const Translation =   ()  => {
    const { t, i18n } = useTranslation();
    const [activeComponent, setActiveComponent] = useState('');
    const changeLanguage = async (language) => {
        i18n.changeLanguage(language);
        // AsyncStorage.setItem('currentLanguage', language)
        if (language === 'ar') {
            I18nManager.forceRTL(true)
        }
        else {
            I18nManager.forceRTL(false)
        }
        setActiveComponent(language);
       // RNRestart.Restart()
       // RNRestart.restart();
    };
    
    return (
        <View>
            <Text style={styles.Heading}>Change Language</Text>
            <View>
                <Image source={require('../assets/Google_Translate.png')}
                    style={styles.imageStyle}/>
            </View>
            <Text style={{ top: 100, textAlign: 'center', fontSize: 20 }}>
                {t('Please Select Preferred Language')}</Text>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => changeLanguage('en')}>
                    <View style={styles.componentContainer}>
                        <Text style={styles.toggleButton}>English (UK)</Text>
                        {activeComponent === 'en' && (
                            <Ionicons name='checkmark' color={'red'} size={30} style={styles.icon} />
                        )}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => changeLanguage('es')}>
                    <View style={styles.componentContainer}>
                        <Text style={styles.toggleButton}>Spanish</Text>
                        {activeComponent === 'es' && (
                            <Ionicons name='checkmark' color={'red'} size={30} style={styles.icon1}
                            />
                        )}
                        {/* <Text style={styles.toggleButton}>English (UK)</Text> */}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => changeLanguage('ar')}>
                    <View style={styles.componentContainer}>
                        <Text style={styles.toggleButton}>Arabic</Text>
                        {activeComponent === 'ar' && (
                            <Ionicons name='checkmark' color={'red'} size={30} style={styles.icon1}
                            />
                        )}
                        {/* <Text style={styles.toggleButton}>English (UK)</Text> */}
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    Heading: {
        fontSize: 25,
        textAlign: 'center',
        top: 20
    },
    imageStyle: {
        width: 100,
        height: 100,
        top: 80,
        left: 130
    },
    container: {
        justifyContent: 'center',
        top: 200,
        padding: 10,
    },
    componentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    toggleButton: {
        fontSize: 18,
        color: 'blue',
    },
})
export default Translation;