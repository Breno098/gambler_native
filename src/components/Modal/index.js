import React, { useContext, useState } from 'react';
import { Modal as ModelReact, StyleSheet, Text, ActivityIndicator, View} from 'react-native';
import { AppContext } from '../../providers/app';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Modal({ children, animationType, color, style, visible, title, onRequestClose, icon, loading}) {
    const { _colors } = useContext(AppContext);

    return (
        <View style={styles.centeredView}>
          <ModelReact
            animationType={animationType ? animationType : 'slide'}
            transparent={true}
            visible={visible}
            onRequestClose={onRequestClose ? () => onRequestClose() : () => {}}
          >
            <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', ...styles.centeredView }}>
                <View style={{ 
                    borderRadius:      15,
                    borderWidth: 1,
                    borderTopColor: _colors._main,
                    backgroundColor: color ? color : _colors._modal(),
                    width: '101%',
                    height: 500,
                    padding: 3,
                    ...style
                }}>
                    {
                        title && (typeof title === 'string' || title.text)  
                        ? 
                        <View style={styles.title}>
                            <View style={{ width: '85%' }}>
                                <Text style={{ color:  title.color ? title.color : _colors._label(), fontSize: 25 }}>
                                    { title.text ? title.text : title  }
                                </Text>
                            </View>
                            { 
                                icon && (typeof icon === 'string' || icon.name) && !loading
                                ?
                                <View style={{ width: '5%' }}>
                                    <Icon 
                                        name={icon.name ? icon.name : icon ? icon : null}
                                        size={icon.size ? icon.size : 15}  
                                        color={icon.color ? icon.color : _colors._label()} 
                                    />
                                </View>
                                :
                                loading
                                ?
                                <ActivityIndicator 
                                    size={icon && icon.size ? icon.size : 15} 
                                    color={icon && icon.color ? icon.color :  _colors._label()}
                                />
                                :
                                null
                            }
                        </View>
                        :
                        null
                    }
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
        justifyContent: "flex-end",
        alignItems: "flex-end",
        width: '100%',
        height: '100%',
        position: 'absolute',
        flex: 1,
    },

    title :{
        width: '100%', 
        padding: 5, 
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
  