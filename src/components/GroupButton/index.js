import React, { useRef, useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Animated, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function GroupButton({ icon, loading, label, color, disabled, error, errorText, itens, ...props }) {

    const [errorAnimated] = useState(new Animated.Value(0));

    const setColorSelected = (active, color) => {
        return active && color ? color : 
               active ? '#f76a05' : 'rgb(255, 255, 255)';
    }

    useEffect(() => {
        if(error === true){
            Animated.timing(errorAnimated, {toValue: 30, duration: 350, useNativeDriver: true}).start()
            setTimeout(() => Animated.timing(errorAnimated, {toValue: 0, duration: 500, useNativeDriver: true}).start(), 400)
        }
    }, [error])

    return (
        <View>
            <View style={{ width: '100%', height: 60, paddingTop: 9, marginBottom: 23 }}>
                <View   
                    style={{
                            borderColor: disabled ? '#eee' : error ? 'rgba(255, 0, 0, 1)' : color ? color : "#525252",
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth : 1,
                            borderRadius: 10,
                            backgroundColor: '#fff',
                            width: '100%',
                            height: 50,
                            padding: 10
                        }}  
                >
                    {
                        itens.map((button, index) => (
                            <TouchableWithoutFeedback onPress={button.onPress}>
                                <View style={{ 
                                    flex: 1, 
                                    backgroundColor: setColorSelected(button.active, button.color),
                                    height: '100%',
                                    borderColor: '#525252',
                                    borderRadius: 8,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginLeft: 2,
                                    marginRight: 2,
                                }}>
                                    <Text>
                                        { button.text }
                                    </Text>
                    
                                </View>
                            </TouchableWithoutFeedback>
                        ))
                    }
                    {
                        error ? 
                            <Icon name='exclamation' size={15} color={"rgba(255, 0, 0, 1)"} style={{ marginLeft: 8, marginRight: 8 }}/> 
                        :icon && !loading ?
                            <Icon name={icon} size={15} color={"#525252"} style={{ marginLeft: 8, marginRight: 8 }}/>
                        : loading ?
                            <ActivityIndicator size={15} color={"#525252"} style={{ marginLeft: 8, marginRight: 8 }}/>
                        : null
                    }
                </View>
                {
                    label ?
                        <Text 
                            style={{ 
                                color: "#000", 
                                fontSize: 15,
                                position: 'absolute',
                                marginLeft: 10,
                                backgroundColor: '#fff',
                                paddingLeft: 10,
                                paddingRight: 10,
                            }}
                        >
                            {  label ?? '' }
                        </Text>
                    : null
                }
                {
                    error ?
                        <Animated.View style={{
                            width: '100%',
                            marginTop: 5,
                            marginLeft: 10,
                            transform: [{translateX: errorAnimated}]
                        }}>
                            <Text style={{ color: "rgba(255, 0, 0, 0.4)", fontSize: 12, fontWeight: 'bold' }}>
                                { errorText ?? '' }
                            </Text>
                        </Animated.View>
                    : null
                }
            </View>
        </View>
    );
}