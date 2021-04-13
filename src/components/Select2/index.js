import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, ActivityIndicator, Animated, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-community/picker'



export default function Select2({ icon, loading, label, color, disabled, error, errorText, children, style,  ...props }) {

    const [errorAnimated] = useState(new Animated.Value(0));
    const inputEl = useRef(null);

    useEffect(() => {
        if(error === true){
            Animated.timing(errorAnimated, {toValue: 30, duration: 350}).start()
            setTimeout(() => Animated.timing(errorAnimated, {toValue: 0, duration: 500}).start(), 400)
        }
    }, [error])

    return (
        <View style={{ width: '100%', height: 60, paddingTop: 9 }}>
            <View   
                style={{
                    borderColor: disabled ? '#eee' : error ? 'rgba(255, 0, 0, 1)' : color ? color : "#f76a05",
                    borderWidth : 1,
                    borderRadius: 10,
                    backgroundColor: '#fff',
                    width: '100%',
                    paddingLeft: 10,
                    paddingRight: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    ...style,
                }}  
            >
                <View style={{ width: icon ? '93%' : '100%' }}>
                    <Picker { ...props }>
                        { children }
                    </Picker>
                </View>
                
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
    );
}

// const styles = StyleSheet.create({
//   select: {
//     width: '100%',
//     height: 45,
//     backgroundColor: '#fff',
//     borderWidth : 1,
//     borderRadius: 10,
//     borderColor: "#f76a05",
//   },
// });