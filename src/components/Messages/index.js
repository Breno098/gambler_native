import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppContext } from '../../providers/app';

export default function Messages({ messages }) {
    const { _colors } = useContext(AppContext);

    return (
        <View style={{ padding: 8, width: '100%' }}>
            { 
                messages && typeof messages === 'string' 
                ? 
                <Text style={{ fontSize: 18, color: _colors._label() }}> {messages} </Text>
                :
                messages && typeof messages === 'object' 
                ?
                <View style={{ width: '100%' }}>
                    { messages.map(message => (
                        <Text style={{ fontSize: 18, color: _colors._label() }} key={message}> {message} </Text>
                    )) } 
                </View>
                :
                null
            } 
        </View>
    );
}

const styles = StyleSheet.create({
})