import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, StyleSheet, Text, View, TouchableOpacity, I18nManager, } from "react-native";
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNRestart from 'react-native-restart';

const Translation = ({ navigation }) => {
    const { t, i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const changeLanguage = async (language) => {
        i18n.changeLanguage(language);
        setSelectedLanguage(language);
        await AsyncStorage.setItem('selectedLanguage', language);
        // if (language === 'ar') {
        //     I18nManager.forceRTL(language === 'ar');
        //      I18nManager.allowRTL(true);
        // }
        // else if (language === 'sp') {
        //     I18nManager.forceRTL(false);
        // }
        // else if (language === 'en') {
        //     I18nManager.forceRTL(false);
        // }
        navigation.goBack();
    };
    useEffect(() => {
        const getSelectedLanguage = async () => {
            const value = await AsyncStorage.getItem('selectedLanguage');
            setSelectedLanguage(value || 'en');
        };
        getSelectedLanguage();
    }, []);
    return (
        <View>
            <Text style={styles.Heading}>Change Language</Text>
            <View>
                <Image source={require('../assets/Google_Translate.png')}
                    style={styles.imageStyle} />
            </View>
            <Text style={{ top: 100, textAlign: 'center', fontSize: 20 }}>
                {t('Please Select Preferred Language')}</Text>
            <View style={styles.container}>

                <TouchableOpacity onPress={() => changeLanguage('en')}>
                    <View style={styles.componentContainer}>
                        <Text style={styles.toggleButton}>English (UK)</Text>
                        <Ionicons name='checkmark' size={30} color="#3DA6D7" style={{ opacity: selectedLanguage === 'en' ? 1 : 0 }} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => changeLanguage('es')}>
                    <View style={styles.componentContainer}>
                        <Text style={styles.toggleButton}>Spanish</Text>
                        <Ionicons name='checkmark' size={30} color="#3DA6D7" style={{ opacity: selectedLanguage === 'es' ? 1 : 0 }} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => changeLanguage('ar')}>
                    <View style={styles.componentContainer}>
                        <Text style={styles.toggleButton}>Arabic </Text>
                        <Ionicons name='checkmark' size={30} color="#3DA6D7" style={{ opacity: selectedLanguage === 'ar' ? 1 : 0 }} />
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
        color: '#031021',
    },
    // icon: {
    //     // Add margin directly to the icon using padding
    //     marginRight: 100, // For example, adding right margin
    //     textAlign: 'left',
    //     left: 100
    // },
    languageButtonText: {
        fontSize: 18,
        marginLeft: 5,
    },
    languageButton: {
        borderRadius: 5,
        padding: 5,
        margin: 5,
        flexDirection: 'row',
    },
})
export default Translation;