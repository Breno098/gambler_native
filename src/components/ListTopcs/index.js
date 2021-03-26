import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppContext } from '../../providers/app';

export default function ListTopcs({ itens }) {
    const { _colors } = useContext(AppContext);

    return (
        <View style={{ padding: 8, width: '100%' }}>
            { 
                itens && typeof itens === 'object' 
                ?
                <View style={{ width: '100%', marginBottom: 10 }}>
                    <Text style={{ fontSize: 22, color: _colors._label(), marginBottom: 5 }}> {itens?.title} </Text>
                    { 
                        itens.itens 
                        ? 
                        itens.itens.map(item => (
                            <Text style={{ fontSize: 18, color: _colors._label() }} key={item}> {item} </Text>
                        )) 
                        :
                        null
                } 
                </View>
                :
                null
            } 
        </View>
    );
}

const styles = StyleSheet.create({
})