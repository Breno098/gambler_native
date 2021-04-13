import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Chip({ icon, iconColor, style, label, color, labelStyle }) {

    return (
      <View style={{ 
          alignItems: 'center', 
          height: 30,
          marginTop: 5,
          backgroundColor: color ?? 'rgb(255, 255, 255)', 
          borderRadius: 3, 
          justifyContent: 'center',
          alignItems: 'center',
          padding: 8,
          flexDirection: 'row',
          ...style,
      }}>
        {
            icon ?
                <Icon 
                    name={icon}
                    size={12}  
                    color={iconColor ?? "#000"} 
                    style={{ marginRight: 5 }}
                />
            : null
        }
         {
            label ? 
                <Text style={{ 
                    color: "#000", 
                    fontSize: 12, 
                    ...labelStyle
                }}>
                    { label ?? '' }
                </Text>
            : null
          }
      </View>
     
    );
}