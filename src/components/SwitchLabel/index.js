import React from 'react';
import { View , Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Switch from '../Switch'

export default function SwitchLabel({ leftIcon, rightIcon, onValueChange, value, label }) {
 return (
    <View   
        style={{
            borderColor: "#525252",
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth : 1,
            borderRadius: 10,
            backgroundColor: '#fff',
            width: '100%',
            paddingRight: 10,
            paddingLeft: 10,
            marginBottom: 23
        }}  
    >
        <Text
            style={{
                fontSize: 18,
                flex: 1
            }}
        >
            { label ?? '' }
        </Text>
        <Switch
            leftIcon={leftIcon}
            rightIcon={rightIcon}
            value={value}
            onValueChange={onValueChange}
        />
    </View>
  );
}