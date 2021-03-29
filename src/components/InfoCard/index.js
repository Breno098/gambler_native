import React from 'react';
import { View, ActivityIndicator  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function InfoCard({ style, children, loading, icon, iconColor }) {

    return (
        <View 
            style={{
                borderWidth: 1,
                borderRadius: 50,
                borderColor: '#00fff7',
                backgroundColor: "#f2f1f1",
                alignItems: 'center',
                justifyContent: 'center',
                width: 50, 
                height: 50,
                ...style
        }}>
            { children }
            {
                icon && !loading
                ?
                <Icon 
                    name={icon}
                    size={15}  
                    color={iconColor ? iconColor : "#000"} 
                    style={{ marginLeft: 8 }}
                />
                :
                loading
                ?
                <ActivityIndicator 
                    size={18} 
                    color={icon && iconColor ? iconColor : "#000"}
                    style={{ marginLeft: 8 }}
                />
                :
                null
            }
        </View>
    );
}