import React from 'react';
import { SafeAreaView, Text, View, ActivityIndicator  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function FloatCard({ disabled, left, top, onPress, icon, iconColor, loading, color, label, labelColor, labelSize, style }) {

    return (
        <SafeAreaView style={{
            flex: 1,
            position: 'absolute',
            width: '100%',
            height: '100%'
        }}>
            <View 
                onPress={
                    onPress && !disabled && !loading ? onPress : ()=>{}
                } 
                style={{
                    marginTop:  top  ? top  : 0,
                    marginLeft: left ? left : 0, 
                    borderWidth: 1,
                    borderRadius: 50,
                    borderColor: '#00fff7',
                    backgroundColor: color ? color : "#f2f1f1",
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 50, 
                    height: 50,
                    ...style
            }}>
                
                {
                    label
                    ? 
                    <Text style={{ 
                        color: labelColor ? labelColor : "#000", 
                        fontSize: labelSize ? labelSize : 15,  
                    }}>
                       { label ?? '' }
                    </Text>
                    :
                    null
                }
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
        </SafeAreaView>
    );
}