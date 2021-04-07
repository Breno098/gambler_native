import React from 'react';
import { SafeAreaView } from 'react-native';

export default function App({ children, style }) {

    return (
        <SafeAreaView 
            style={{
                flex: 1,
                backgroundColor: "#fff",
                width: '100%',
                paddingTop: 33,
                ...style
            }}
        >
            { children }
        </SafeAreaView>
    );
}