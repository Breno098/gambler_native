import React from 'react';
import { SafeAreaView, KeyboardAvoidingView } from 'react-native';

export default function App({ children, style }) {

    return (
        <SafeAreaView 
            style={{
                flex: 1,
                width: '100%',
                height: '100%',
                
            }}
        >
            <KeyboardAvoidingView style={{ 
                flex: 1,
                backgroundColor: "#fff",
                width: '100%', 
                height: '100%',
                ...style
            }}>
                { children }
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}