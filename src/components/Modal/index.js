import React, { useContext, useState } from 'react';
import { Modal as ModelReact, StyleSheet, Text, ActivityIndicator, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Modal({ children, animationType, style, visible, title, onRequestClose, icon, loading}) {
    return (
        <View style={styles.centeredView}>
            <ModelReact
                animationType={animationType ? animationType : 'slide'}
                transparent={true}
                visible={visible}
                onRequestClose={onRequestClose}
                statusBarTranslucent={true}
            >
                <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', ...styles.centeredView }}>
                    <TouchableOpacity style={{ flex: 1, opacity: 0, width: '100%' }} onPress={onRequestClose}/>
                    <View style={styles.title}>
                    {
                        title ? 
                            <View style={{ width: '85%' }}>
                                <Text style={{ color: "#f76a05", fontSize: 25 }}>
                                    { title }
                                </Text>
                            </View> 
                        : null
                    }
                    { 
                        icon && !loading ?
                            <View style={{ width: '5%' }}>
                                <Icon name={icon} size={15} color={"#f76a05"}/>
                            </View>
                        : loading ?
                            <ActivityIndicator size={15} color={"#f76a05"}/>
                        : null
                    }
                    </View>
                    <View style={{ 
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        width: '101%',
                        height: 450,
                        padding: 15,
                        ...style
                    }}>
                        { children }
                    </View>
                </View>
            </ModelReact>
        </View>
      );
}

const styles = StyleSheet.create({
    centeredView: {
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        height: '100%',
        position: 'absolute',
        flex: 1,
    },

    title :{
        width: '101%', 
        padding: 10, 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderTopColor: '#f76a05',
        borderBottomWidth: 0.5, 
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff'
    }
});
  