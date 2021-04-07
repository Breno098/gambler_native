import React from 'react';
import { View, Text } from 'react-native';

export default function TableCell({ style, text, type }) {

    return (
        <View style={{ flex: 1, padding: 10, ...style }}>
            <Text style={{ 
                fontSize: 15, 
                fontWeight: type == 'title' ? 'bold' : '100' 
            }}> 
                { text ?? '' } 
            </Text>
        </View>
    );
}