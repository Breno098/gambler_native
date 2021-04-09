import React from 'react';
import { View, Text } from 'react-native';

export default function TableCell({ style, text, type, children }) {

    return (
        <View style={{ 
            flex: 1, 
            padding: 10, 
            justifyContent: 'center',
            ...style 
        }}>
            <Text style={{ 
                fontSize: 15, 
                fontWeight: type == 'title' ? 'bold' : '100' 
            }}> 
                { text ?? '' } 
            </Text>
            {children}
        </View>
    );
}