import React from 'react';
import { Modal as ModelReact, StyleSheet, View, TouchableWithoutFeedback} from 'react-native';

export default function Dialog({ children, animationType, visible, onRequestClose }) {
    return (
        <View style={styles.centeredView}>
            <ModelReact
                animationType={animationType ? animationType : 'slide'}
                transparent={true}
                visible={visible}
                onRequestClose={onRequestClose}
                statusBarTranslucent={true}
            >
                <View style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.1)', 
                    flex: 1, 
                    justifyContent: 'center', 
                    alignItems: 'center'
                }}>
                    <TouchableWithoutFeedback onPress={onRequestClose}>
                        <View
                            style={{ 
                                flex: 1, 
                                width: '100%',
                                justifyContent: 'center', 
                                alignItems: 'center'
                            }} 
                        >
                                {children}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </ModelReact>
        </View>
      );
}

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        height: '100%',
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
  