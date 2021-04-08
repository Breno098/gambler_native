import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Card({ icon, children, style }) {

    return (
      <View style={{ 
          width: '100%', 
          alignItems: 'center', 
          height: style?.height ?? 203,
          marginTop: 5,
      }}>
        <View style={{ 
          ...style,
          width: '95%', 
          height: '98%', 
          backgroundColor: 'rgb(255, 255, 255)', 
          borderRadius: 4,
          elevation: 5, 
        }}>
          { children }
        </View>
      </View>
     
    );
}