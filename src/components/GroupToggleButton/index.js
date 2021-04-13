import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function GroupToggleButton({ itens, style, label, color, indexSelected }) {

    const setColorSelected = (active, color) => {
        return active && color ? color : 
               active ? '#f76a05' : 'rgb(255, 255, 255)';
    }

    return (
      <View style={{ 
          alignItems: 'center', 
          height: 50,
          marginTop: 5,
          borderRadius: 10, 
          borderColor: '#525252',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          borderWidth: 1,
          ...style,
      }}>
          {
              itens.map((button, index) => (
                <TouchableWithoutFeedback onPress={button.onPress}>
                    <View style={{ 
                        flex: 1, 
                        backgroundColor: setColorSelected(button.active, button.color),
                        height: '100%',
                        borderColor: '#525252',
                        borderLeftWidth: index === 0 ? 0 : 1,
                        borderTopLeftRadius: index === 0 ? 8 : 0,
                        borderBottomLeftRadius: index === 0 ? 8 : 0,
                        borderTopRightRadius: index === itens.length - 1 ? 8 : 0,
                        borderBottomRightRadius: index === itens.length - 1 ? 8 : 0,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text>
                            { button.text }
                        </Text>
        
                    </View>
                </TouchableWithoutFeedback>
              ))
          }
      </View>
     
    );
}