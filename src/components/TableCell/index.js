import React from 'react';
import { View, Text } from 'react-native';

export default function TableCell({ style, text, type, right, children }) {


    return (
        <View style={{ 
            flex: 1, 
            padding: 10, 
            justifyContent: 'center',
            alignItems: typeof right !== 'undefined' ? 'flex-end' : 'flex-start',
            ...style 
        }}>
            <Text style={{ 
                fontSize: 12, 
                fontWeight: type == 'title' ? 'bold' : '100',
            }}> 
                { text ?? '' } 
            </Text>
            {children}
        </View>
    );
}