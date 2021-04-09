import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, ActivityIndicator, Animated, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Input({ icon, loading, label, color, disabled, error, errorText, ...props }) {

    const [errorAnimated] = useState(new Animated.Value(0));
    const inputEl = useRef(null);

    useEffect(() => {
        if(error === true){
            Animated.timing(errorAnimated, {toValue: 30, duration: 350, useNativeDriver: true}).start()
            setTimeout(() => Animated.timing(errorAnimated, {toValue: 0, duration: 500, useNativeDriver: true}).start(), 400)
        }
    }, [error])

    return (
        <TouchableOpacity style={{ width: '100%', height: 60, paddingTop: 9 }} onPress={() => inputEl.current.focus() }>
            <View   
                style={{
                        borderColor: disabled ? '#eee' : error ? 'rgba(255, 0, 0, 1)' : color ? color : "#f76a05",
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderWidth : 1,
                        borderRadius: 10,
                        backgroundColor: '#fff',
                        width: '100%',
                        padding: 10,
                    }}  
            >
                <TextInput 
                    {...props}
                    inlineImageLeft="user"
                    ref={inputEl}
                    style={{
                        color: "#000", 
                        fontSize: 20,
                        width: '90%',
                    }}  
                    placeholderTextColor='rgba(0, 0, 0, 0.2)'
                />
                {
                    error ? 
                        <Icon name='exclamation' size={15} color={"#f76a05"} style={{ marginLeft: 8, marginRight: 8 }}/> 
                    :icon && !loading ?
                        <Icon name={icon} size={15} color={"#f76a05"} style={{ marginLeft: 8, marginRight: 8 }}/>
                    : loading ?
                        <ActivityIndicator size={15} color={"#f76a05"} style={{ marginLeft: 8, marginRight: 8 }}/>
                    : null
                }
            </View>
            {
                label ?
                    <Text 
                        onPress={() => inputEl.current.focus() }
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
                error
                ?
                <Animated.View style={{
                    width: '100%',
                    marginTop: 5,
                    marginLeft: 10,
                    transform: [{translateX: errorAnimated}]
                }}>
                    <Text 
                        style={{ 
                            color: "rgba(255, 0, 0, 0.4)",
                            fontSize: 12,
                            fontWeight: 'bold',
                        }}
                    >
                        { errorText ?? '' }
                    </Text>
                </Animated.View>

                : 
                null
            }
        </TouchableOpacity>
    );
}