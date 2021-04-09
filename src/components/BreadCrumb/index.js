import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function BreadCrumb({ itens }) {

    const navigation = useNavigation();

    return (
      <View style={{ 
          width: '100%', 
          alignItems: 'center', 
          height: '5%',
          marginTop: 5,
      }}>
        <View style={{ 
          width: '96%', 
          height: '98%', 
          backgroundColor: 'rgb(255, 255, 255)', 
          borderRadius: 4,
          elevation: 5, 
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 10
        }}>
          { 
            itens ? itens.map(item => (
              <View style={{ 
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <Icon 
                  name="chevron-right" 
                  size={10} 
                  color="rgba(0, 0, 0, 0.6)"
                  style={{
                    padding: 10
                  }}
                />
                <TouchableOpacity onPress={item.route ? () => navigation.navigate(item.route, { refresh: new Date }) : () => {}}>
                  <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                    { item.label }
                  </Text>
                </TouchableOpacity>
              </View>
            )) : null
          }
        </View>
      </View>
     
    );
}