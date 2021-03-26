import React, { useContext } from 'react';
import { Text, TouchableOpacity, ActivityIndicator  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppContext } from '../../providers/app';

export default function Button({ disabled, size, label, onPress, icon, loading, color, type, width, height, elevation, style }) {

    const { _colors } = useContext(AppContext);
    
    const sizeHeight = () => {
        if(typeof size === 'string'){
            if(size === 'large')  return 135
            if(size === 'medium') return 85
            if(size === 'small')  return 35
        }
        if(height) return size.height;
        return 55;
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

                backgroundColor: color ? color : _colors.theme,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
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
                    style={{
                        marginLeft: 8
                    }}
                />
                :
                loading
                ?
                <ActivityIndicator 
                    size={size === 'small' ? 20 : 25} 
                    color={
                        icon && icon.color ? icon.color :  _colors._label()
                    }
                    style={{
                        marginLeft: 8
                    }}
                />
                :
                null
            }
        </TouchableOpacity>
    );
}