import React from 'react';
import { SafeAreaView, TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function AppBar() {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{
            backgroundColor: '#f76a05',
            width: '100%',
            height: 60,
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 15,
            flexDirection: 'row'
        }}>
            <TouchableOpacity onPress={() => { navigation.toggleDrawer() }}>
                <Icon name="bars" color="#fff" size={35}/>
            </TouchableOpacity >

            <View style={{  marginLeft: 15 }}>
                <Text style={{ color: '#fff', fontSize: 20 }}>
                    Gamblers
                </Text>
                <Text style={{ color: '#fff', fontSize: 16 }}>
                    Adm
                </Text>
            </View>
        </SafeAreaView>
    );
}