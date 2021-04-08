import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CardBody({ icon, children }) {
    return (
      <View 
        style={{ 
          width: '100%', 
          padding: 10,
          flex: 1
        }}
      >
        { children }
      </View>
     
    );
}