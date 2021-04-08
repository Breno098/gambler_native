import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function TablePaginator({ next, previous, rows, numberOfPages, atualPage }) {

    return (
        <View style={{ 
            width: '100%', 
            flexDirection: 'row',
            justifyContent: rows ? 'space-between' : 'flex-end',
            alignItems: 'center',
            backgroundColor: '#ffffff'
        }}>
            { rows ? <Text style={{ fontSize: 12, marginLeft: 10 }}> Total: {rows} </Text> : null }
            { numberOfPages ? <Text style={{ fontSize: 12, marginLeft: 10 }}> Paginas: {atualPage}-{Math.ceil(numberOfPages)} </Text> : null }
            
            <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'flex-end',
                alignItems: 'center', 
                paddingTop: 10
            }}>
                <TouchableOpacity
                    onPress={previous}
                    style={{ 
                        width: 70, 
                        height: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 2
                    }}>
                    <Icon name="chevron-left" size={15} color="rgba(0, 0, 0, 0.4)"/>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={next}
                    style={{ 
                        width: 70, 
                        height: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 5
                    }}
                >
                    <Icon name="chevron-right" size={15} color="rgba(0, 0, 0, 0.4)"/>
                </TouchableOpacity>
            </View>

        </View>
    );
}