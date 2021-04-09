import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ScrollMenuItem({ icon, label, ...props }) {
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
          padding: 10,
          justifyContent: 'space-between'
        }}
      >
          <Icon name={icon} size={30} color={'rgba(255, 255, 255, 0.9)'} />

          <Text style={{ fontSize: 13, color: 'rgba(255, 255, 255, 0.9)', width: '100%', textAlign: 'right' }}>
            { label ?? '' }
          </Text>
      </TouchableOpacity>
    );
}