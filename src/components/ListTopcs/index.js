import React from 'react';
import { View, Text } from 'react-native';

export default function ListTopcs({ itens }) {

    return (
        <View style={{ padding: 8, width: '100%' }}>
            { 
                itens 
                ?
                itens.map(item => (
                    <View style={{ width: '100%', marginBottom: 10 }}>
                        <Text style={{ fontSize: 22, marginBottom: 5 }}> {item?.title} </Text>
                    {
                        item.list
                        ?
                        item.list.map(list => (
                            <Text style={{ fontSize: 18, color: '#000' }} key={list}> {list} </Text>
                        ))
                        : 
                        null
                    }
                    </View>
                ))
                :
                null
            } 
        </View>
    );
}