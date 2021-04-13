import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CardTitle({ icon, title, children, iconColor }) {
    return (
      <View 
        style={{ 
          width: '95%', 
          padding: 8,
        }}
      >
        <View  
          style={{ 
            width: '100%', 
            alignItems: 'center',
            flexDirection: 'row'
          }}
        >
          <Text
            style={{
              fontSize: 23,
              width: '98%',
              padding: 5,
              fontWeight: 'bold'
            }}
          > 
            { title } 
          </Text>
          {
            icon ?
                <Icon name={icon} size={15} color={iconColor ?? "rgba(0, 0, 0, 0.5)"} style={{ marginLeft: 8, marginRight: 8 }}/>
            : null
          }
        </View>
        { children }
      </View>
     
    );
}