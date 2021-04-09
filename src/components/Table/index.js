import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text, RefreshControl, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Table({ style, title, children, actions, loading, error, refresh }) {

    return (
        <View style={{ 
            width: '100%', 
            backgroundColor: '#ffffff', 
            justifyContent: 'flex-start',
            alignItems: 'center',
            ...style
        }}>
            { 
                title ? 
                    <View style={{ 
                        width: '95%', 
                        height: 40, 
                        borderBottomWidth: 0.5, 
                        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
                        flexDirection: 'row', 
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}> 
                            { title ?? '' } 
                        </Text>
                        <View style={{ flexDirection: 'row', height: '100%' }}>
                            { actions ? actions.map(action => (
                                <TouchableOpacity onPress={action.onPress} style={{
                                    width: 35,
                                    height: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Icon name={action.icon} size={20} color="rgba(0, 0, 0, 0.4)"/>
                                </TouchableOpacity>
                            )) : null}
                        </View>
                    </View> 
                : null
            }  
            {
                error ? 
                    <View style={{ 
                        width: '100%', 
                        height: '100%',  
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                         <Icon name={"exclamation-circle"} size={30} color="rgba(255, 0, 0, 0.4)"/>
                    </View>
                :
                    <ScrollView 
                        style={{ width: '98%' }}
                        showsHorizontalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={loading}
                                onRefresh={refresh}
                                colors={['rgb(247, 106, 5)', 'rgba(0, 0, 0, 0.5)']}
                            />
                        }
                    >
                        { children }
                    </ScrollView>
            }
        </View>
    );
}