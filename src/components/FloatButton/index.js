import React, { useContext } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, ActivityIndicator  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppContext } from '../../providers/app';

export default function FloatButton({ disabled, size, left, top, label, onPress, icon, loading, color, type, style }) {

    const { _colors } = useContext(AppContext);

    const sizeHeight = () => {
        if(typeof size === 'string'){
            if(size === 'large')  return 150
            if(size === 'medium') return 100
            if(size === 'small')  return 50
        }
        if(height) return size.height;
        return 75;
    }

    const sizeWidth = () => {
        if(typeof size === 'string'){
            if(size === 'large')  return 150
            if(size === 'medium') return 100
            if(size === 'small')  return 50
        }
        if(width) return width;
        return 75;
    }

    const borderRadiusType = () => {
        return type && type.indexOf('circle') !== -1 ? 100 : type && type.indexOf('rounded') !== -1 ? 20 : 5;
    }

    const borderWidthType = () => {
        return type && type.indexOf('elevation') !== -1 ? 2 : 0;
    }

    const elevationType = () => {
        return type && color && type.indexOf('elevation') !== -1 ? 10 : 0;
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity 
                onPress={
                    onPress && !disabled && !loading ? onPress : ()=>{}
                } 
                style={{
                    width:  sizeWidth(),
                    height: sizeHeight(),

                    borderRadius:      borderRadiusType(),
                    borderRightWidth:  borderWidthType(),
                    borderBottomWidth: borderWidthType(),
                    elevation:         elevationType(),

                    marginTop:  top  ? top  : 0,
                    marginLeft: left ? left : 0, 

                    backgroundColor: color ? color : _colors.theme,
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...style
            }}>
                
                {
                    label || typeof label === 'string' || typeof label === 'number'
                    ? 
                    <Text style={{ 
                        color: label.color ? label.color : _colors._label(), 
                        fontSize: label.size ? label.size : 15, 
                    }}>
                        { 
                            typeof label === 'string' ? label : 
                            typeof label === 'number' ? label : 
                            label.text                ? label.text : '' 
                        }
                    </Text>
                    :
                    null
                }
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
                            icon.color ? icon.color : _colors._label()
                        } 
                    />
                    :
                    loading
                    ?
                    <ActivityIndicator 
                        size={size === 'small' ? 20 : 35} 
                        color={
                            icon && icon.color ? icon.color :  _colors._label()
                        }
                    />
                    :
                    null
                }
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
})