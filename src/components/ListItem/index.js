import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ListItem({ icon, label, children, onPress, ...props }) {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View 
          {...props}
          style={{ 
            width: '95%', 
            height: 60, 
            flexDirection: 'row',
            borderBottomWidth: 0.5,
            alignItems: 'center',
            justifyContent: label && children ? 'space-between' : 'flex-start',
            padding: 15
          }}
        >
            {icon && <Icon name={icon} size={20} color={'#000'} style={{ marginRight: 10 }}/>}
            {
              label && 
              <Text style={{ fontSize: 15, color: '#000' }}>
                { label ?? '' }
              </Text>
            }
            {children}
        </View>
      </TouchableWithoutFeedback>
    );
}