import React, { useContext, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import { AppContext } from '../../providers/app';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Dialog({ children, animationType,top, left, type, color, style, visible, title, onRequestClose, icon }) {
    const { _colors } = useContext(AppContext);

    const borderRadiusType = () => {
        return type && type.indexOf('circle') !== -1 ? 100 : type && type.indexOf('rounded') !== -1 ? 20 : 5;
    }

    const borderWidthType = () => {
        return type && type.indexOf('elevation') !== -1 ? 2 : 0;
    }

    const elevationType = () => {
        return type && color && type.indexOf('elevation') !== -1 ? 10 : 0;
    }

    const classType = () => {
        return  type && type.indexOf('success') !== -1 ? '#00f018' :  
                type && type.indexOf('error') !== -1 ? '#f00000' :  
                _colors._dialogHeader(); 
    }

    const classText = () => {
        return  type && type.indexOf('success') !== -1 ? _colors._label() :  
                type && type.indexOf('error') !== -1 ? _colors._label() :  
                _colors._dialogHeader(); 
    }

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.centeredView}>
          <Modal
            animationType={animationType ? animationType : 'slide'}
            transparent={true}
            visible={visible}
            onRequestClose={onRequestClose ? () => onRequestClose() : () => {}}
          >
            <View style={styles.centeredView}>
                <View style={{ 
                    marginTop:  top  ? top  : 80,
                    marginLeft: left ? left : 0, 
                    borderRadius:      borderRadiusType(),
                    borderRightWidth:  borderWidthType(),
                    borderBottomWidth: borderWidthType(),
                    elevation:         elevationType(),

                    backgroundColor: color ? color : _colors._dialog(),
                    width: '90%',
                    height: 200,
                    padding: 3,
                    ...style
                }}>
                    {
                        title 
                        ? 
                        <View style={{ 
                            width: '100%', 
                            padding: 5, 
                            backgroundColor: classType(), 
                            marginBottom: 5,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <View style={{ width: '95%' }}>
                                <Text style={{ color: classText(), fontSize: 22 }}>
                                    { title }
                                </Text>
                            </View>
                            { 
                                icon && (typeof icon === 'string' || icon.name) 
                                ?
                                <View style={{ width: '5%' }}>
                                    <Icon 
                                        name={
                                            icon.name ? icon.name : icon ? icon : null
                                        }
                                        size={
                                            icon.size ? icon.size : 15
                                        }  
                                        color={
                                            icon.color ? icon.color : classText()
                                        } 
                                    />
                                </View>
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
          </Modal>
        </View>
      );
}


const styles = StyleSheet.create({
    centeredView: {
      justifyContent: "center",
      alignItems: "center",
      width: '100%',
      position: 'absolute'
    },
  });
  