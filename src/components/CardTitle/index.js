import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CardTitle({ icon, title, children }) {
    return (
      <View 
        style={{ 
          width: '95%', 
          padding: 5,
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
              fontSize: 20,
              width: '98%',
              padding: 5,
            }}
          > 
            { title } 
          </Text>
          {
            icon ?
                <Icon name={icon} size={15} color={"#f76a05"} style={{ marginLeft: 8, marginRight: 8 }}/>
            : null
          }
        </View>
        { children }
      </View>
     
    );
}