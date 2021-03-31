import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, Animated, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Input({ value, onChangeText, icon, loading, placeholder, label, color, disabled, error, errorText }) {

    const [errorAnimated] = useState(new Animated.Value(0));
    const inputEl = useRef(null);

    useEffect(() => {
        if(error === true){
            Animated.timing(errorAnimated, {toValue: 30, duration: 350}).start()
            setTimeout(() => Animated.timing(errorAnimated, {toValue: 0, duration: 500}).start(), 400)
        }
    }, [error])

    return (
        <TouchableOpacity style={styles.main} onPress={() => inputEl.current.focus() }>
            {
                label
                ?
                <Text 
                    onPress={() => inputEl.current.focus() }
                    style={{ 
                    color: label && label.color ? label.color : "#000",
                    ...styles.label
                    }}
                >
                    { label && typeof label === 'string' ? label : label && label.text ? label.text : '' }
                </Text>
                :
                null
            }
         

            <View   
                style={{
                        borderBottomColor: disabled ? '#eee' : error ? 'rgba(255, 0, 0, 0.4)' : color ? color : "#00fff7",
                        flexDirection: icon && icon.local === 'pre-pend' ? 'row-reverse' : 'row',
                        ...styles.inputArea
                    }}  
            >
                <TextInput 
                    ref={inputEl}
                    style={{
                        color: "#000", 
                        ...styles.input
                    }}  
                    value={value ? value : null}
                    onChangeText={onChangeText ? onChangeText : ()=>{}}
                    placeholder={placeholder ? placeholder : '' }
                    placeholderTextColor='rgba(255, 255, 255, 0.5)'
                />
                {
                    icon && (typeof icon === 'string' || icon.name) && !loading
                    ?
                    <Icon 
                        name={
                            icon.name ? icon.name : icon ? icon : null
                        }
                        size={
                            icon.size ? icon.size : 15
                        }  
                        color={
                            disabled ? '#eee' : icon.color ? icon.color : "#00fff7"
                        } 
                        style={{ 
                            marginLeft: 8, 
                            marginRight: 8 
                        }}
                    />
                    :
                    loading
                    ?
                    <ActivityIndicator 
                        size={15} 
                        color={
                            disabled ? '#eee' : icon && icon.color ? icon.color : color ? color : "#00fff7"
                        }
                        style={{ 
                            marginLeft: 8,
                            marginRight: 8 
                        }}
                    />
                    :
                    null

                }
            </View>

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

const styles = StyleSheet.create({
    main: {
        width: '100%',
        marginBottom: 10,
    },
    label: {
        fontSize: 15,
        width: '100%',
    },
    inputArea: {
        alignItems: 'center',
        borderBottomWidth: 1,
        width: '100%',
        padding: 10,
    },
    input: {
        fontSize: 20,
        width: '90%',
    },
})