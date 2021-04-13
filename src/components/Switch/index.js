import React from 'react';
import { View , Switch as SwitchReact } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Switch({ leftIcon, rightIcon, onValueChange, value }) {
 return (
    <View style={{ 
        width: 100, 
        height: 50,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    }}>
        {
            leftIcon ? 
                <Icon name={leftIcon} size={15} color={value ? 'rgba(0, 0, 0, 0.5)' : 'rgb(255, 0, 0)'}/>
            : null
        }
        <SwitchReact
            trackColor={{ false: 'rgba(0, 0, 0, 0.3)', true: "rgba(247, 106, 5, 0.5)" }}
            thumbColor={"rgb(247, 106, 5)"}
            onValueChange={onValueChange}
            value={value}
        />
        {
            rightIcon ? 
                <Icon name={rightIcon} size={15} color={value ? '#09db37' : 'rgba(0, 0, 0, 0.5)'}/>
            : null
        }
    </View>
  );
}