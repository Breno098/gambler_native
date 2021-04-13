import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Card({ icon, children, style, transparent }) {

    return (
      <View style={{ 
          width: '100%', 
          alignItems: 'center', 
          height: style?.height ?? 203,
          marginTop: 5,
      }}>
        <View style={{ 
          width: '96%', 
          height: '99%', 
          backgroundColor: typeof transparent !== 'undefined' ? 'rgba(255, 255, 255, 0)' : 'rgb(255, 255, 255)',
          borderRadius: 4,
          elevation: typeof transparent !== 'undefined' ?  0 : 5, 
          ...style,
        }}>
          { children }
        </View>
      </View>
     
    );
}