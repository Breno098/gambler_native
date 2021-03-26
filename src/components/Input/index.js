import React, { useContext } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppContext } from '../../providers/app';

export default function Input({ value, onChangeText, icon, loading, placeholder, label, color, disabled }) {

    const { _colors } = useContext(AppContext);
    
    return (
        <View style={styles.main}>
            <Text 
                style={{ 
                  color: label && label.color ? label.color : _colors._label(),
                  ...styles.label
                }}
            >
                { label && typeof label === 'string' ? label : label && label.text ? label.text : '' }
            </Text>

            <View   
                style={{
                        borderBottomColor: disabled ? '#eee' : color ? color : _colors._label(),
                        flexDirection: icon && icon.local === 'pre-pend' ? 'row-reverse' : 'row',
                        ...styles.inputArea
                    }}  
            >
                <TextInput 
                    style={{
                        color: _colors._label(), 
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
                            disabled ? '#eee' : icon.color ? icon.color : _colors._label()
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
                            disabled ? '#eee' : icon && icon.color ? icon.color : color ? color : _colors._label()
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
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        width: '100%',
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
        marginTop: 5,
    },
    input: {
        fontSize: 20,
        width: '90%',
    },
})