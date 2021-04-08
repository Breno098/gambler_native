import React from 'react';
import { SafeAreaView, KeyboardAvoidingView, ScrollView } from 'react-native';

export default function App({ children, style }) {

    return (
        <SafeAreaView 
            style={{
                flex: 1,
                backgroundColor: "#fff",
                width: '100%',
                height: '100%',
                ...style
            }}
        >
            {/* <ScrollView style={{ width: '100%', height: 1500 }}> */}
                <KeyboardAvoidingView style={{ width: '100%', height: '100%' }}>
                { children }
                </KeyboardAvoidingView>
            {/* </ScrollView> */}
        </SafeAreaView>
    );
}