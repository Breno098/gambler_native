import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Button({ disabled, label, labelColor, labelSize, onPress, icon, iconColor, loading, color, style }) {

    return (
        <TouchableOpacity 
            onPress={
                onPress && !disabled && !loading ? onPress : ()=>{}
            } 
            style={{
                backgroundColor: color ? color : "#f76a05",
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                height: 50,
                marginTop: 5,
                width: '100%',
                ...style,
        }}>
            {
                label ? 
                    <Text style={{ 
                        color: labelColor ? labelColor : "#000", 
                        fontSize: labelSize ? labelSize : 15, 
                        fontWeight: 'bold'
                    }}>
                        { label ?? '' }
                    </Text>
                : null
            }
            {
                icon && !loading ?
                    <Icon 
                        name={icon}
                        size={15}  
                        color={iconColor ? iconColor : "#000"} 
                        style={{ marginLeft: label ? 8 : 0 }}
                    />
                : loading ?
                    <ActivityIndicator 
                        size={18} 
                        color={icon && iconColor ? iconColor : "#000"}
                        style={{ marginLeft: label ? 8 : 0 }}
                    />
                : null
            }
        </TouchableOpacity>
    );
}