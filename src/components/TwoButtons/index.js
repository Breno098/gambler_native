import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function TwoButtons({ first, secondary, rouded  }) {
   return (
        <View style={styles.areaButtons}>
            <TouchableOpacity 
                onPress={
                    first.onPress && !first.disabled && !first.loading ? first.onPress : ()=>{}
                } 
                style={{
                    backgroundColor: first.color ? first.color : '#fff',
                    borderTopLeftRadius: rouded && rouded === 'total' ? 50 : rouded ? rouded : 5,
                    borderBottomLeftRadius: rouded && rouded === 'total' ? 50 : rouded ? rouded : 5,
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                    borderRightWidth: 4,
                    borderBottomWidth: 4,
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 5,
                    marginRight: 1,
                    ...styles.button
            }}>
                {
                    first.label
                    ? 
                    <Text style={{ 
                        color: first.color ? first.color : '#fff', ...styles.buttonText 
                    }}>
                        { first?.label }
                    </Text>
                    :
                    null
                }
                {
                    first.icon && !first.loading
                    ?
                    <Icon 
                        name={
                            first.icon.name ? first.icon.name : first.icon && typeof first.icon === 'string' ? first.icon : null
                        }
                        size={
                            first.icon.size ? first.icon.size : 15
                        }  
                        color={
                            first.disabled ? '#eee' : first.icon.color ? first.icon.color : first.color ? first.color : '#fff'
                        } 
                        style={{ 
                            marginLeft: 5 
                        }}
                    />
                    :
                    first.loading
                    ?
                    <ActivityIndicator 
                        size={15} 
                        color={
                            first.disabled ? '#eee' : first.icon.color ? first.icon.color : first.color ? first.color : '#fff'
                        }
                        style={{ 
                            marginLeft: 5 
                        }}
                    />
                    :
                    null
                }
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={
                    secondary.onPress && !secondary.disabled && !secondary.loading ? secondary.onPress : ()=>{}
                } 
                style={{
                    borderColor: secondary.disabled ? '#eee' : secondary.color ? secondary.color : '#fff',
                    borderTopRightRadius: rouded && rouded === 'total' ? 50 : rouded ? rouded : 5,
                    borderBottomRightRadius: rouded && rouded === 'total' ? 50 : rouded ? rouded : 5,
                    marginRight: 1,
                    ...styles.button
            }}>
                {
                    secondary.label
                    ? 
                    <Text style={{ 
                        color: secondary.disabled ? '#eee' : secondary.color ? secondary.color : '#fff', ...styles.buttonText 
                    }}>
                        { secondary?.label }
                    </Text>
                    :
                    null
                }
                {
                    secondary.icon && !secondary.loading
                    ?
                    <Icon 
                        name={
                            secondary.icon.name ? secondary.icon.name : secondary.icon && typeof secondary.icon === 'string' ? secondary.icon : null
                        }
                        size={
                            secondary.icon.size ? secondary.icon.size : 15
                        }  
                        color={
                            secondary.disabled ? '#eee' : secondary.icon.color ? secondary.icon.color : secondary.color ? secondary.color : '#fff'
                        } 
                        style={{ 
                            marginLeft: 5 
                        }}
                    />
                    :
                    secondary.loading
                    ?
                    <ActivityIndicator 
                        size={15} 
                        color={
                            secondary.disabled ? '#eee' : secondary.icon.color ? secondary.icon.color : secondary.color ? secondary.color : '#fff'
                        }
                        style={{ 
                            marginLeft: 5 
                        }}
                    />
                    :
                    null
                }
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    areaButtons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    button: {
        width: '44.5%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonText: {
        fontSize: 15,
    },
})