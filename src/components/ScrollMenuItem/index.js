import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ScrollMenuItem({ icon, ...props }) {
    return (
      <TouchableOpacity 
        {...props}
        style={{ 
          width: 80, 
          height: 80, 
          backgroundColor: 'rgb(247, 106, 5)', 
          marginLeft: 10,
          borderRadius: 7,
          elevation: 5, 
          padding: 10
        }}
      >
          <Icon name={icon} size={30} color={'#fff'} />
      </TouchableOpacity>
    );
}