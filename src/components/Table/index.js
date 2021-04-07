import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Animated, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Table({ style, title, children, actions, loading }) {

    const [progress] = useState(new Animated.Value(0))

    useEffect(() => {
        var interval = setInterval(() => {
            if(loading){
                Animated.timing(progress, {toValue: 500, duration: 500, useNativeDriver: true}).start()
                setTimeout(() => Animated.timing(progress, {toValue: 0, duration: 500, useNativeDriver: true}).start(), 500)
            }
            clearInterval(interval);
        }, 1000);
    }, [loading])


    return (
        <View style={{ 
            width: '100%', 
            backgroundColor: 'rgba(250, 250, 250, 0.3)', 
            justifyContent: 'flex-start',
            alignItems: 'center',
            ...style
        }}>
            { title ? 
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
            </View> : null
            }  

            {
                loading
                ?
                <View style={{ width: '100%', height: 2,  backgroundColor: 'rgba(0, 0, 0, 0.05)', }}>
                    <Animated.View style={{
                        width: '20%',
                        backgroundColor: '#f76a05',
                        flexDirection: 'row',
                        height: '100%' ,
                        transform: [{translateX: progress}]
                    }}></Animated.View>
                </View>
                :
                null
            }


            <ScrollView style={{ width: '98%' }}>
                { children }
            </ScrollView>
        </View>
    );
}