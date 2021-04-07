import React from 'react';
import { View, Text, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

export default function CustomDrawer({ ...props }) {

    return (
        <DrawerContentScrollView {...props}>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 35, marginBottom: 20 }}>
                <Image 
                    source={require('../../images/cadastros.jpg')}
                    style={{ width: 100, height: 100, borderRadius: 100 }}
                />

                <Text style={{ color: '#000', fontSize: 17, fontWeight: 'bold', paddingBottom: 10, paddingTop: 20 }}> 
                    Breno
                </Text>

            </View>

            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}