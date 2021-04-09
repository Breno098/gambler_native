import React from 'react';
import { View } from 'react-native';

export default function TableRow({ style, children }) {

    return (
        <View 
            style={{ 
                width: '98%', 
                height: 50, 
                borderBottomWidth: 0.5, 
                borderBottomColor: 'rgba(0, 0, 0, 0.1)',
                flexDirection: 'row',
                ...style 
            }}
        >
            <View style={{ 
                width: '100%',
                flexDirection: 'row',
            }}>
                { children }
            </View>
        </View>
    );
}