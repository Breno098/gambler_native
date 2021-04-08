import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CardFooter({ icon, title, style, children }) {
    return (
      <View 
        style={{ 
          ...style,
          width: '100%', 
          padding: 10,
          flexDirection: 'row'
        }}
      >
        { children }
      </View>
     
    );
}