import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Animated, TouchableOpacity, Dimensions, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SlideButtonBack({ direction, width, height }) {
  const navigation = useNavigation();

  const [item] = useState(new Animated.Value(0))

  const move = () => {
    let toValue = direction === 'right' ? Dimensions.get('screen').height / 2 : -(Dimensions.get('screen').height / 2);
    Animated.timing(item, {toValue, duration: 350}).start()
    setTimeout(() => navigation.goBack(), 370);
    setTimeout(() => Animated.timing(item, {toValue: 0, duration: 500}).start(), 400)
  }

  return (
        <Animated.View style={{
            width: '100%',
            flexDirection: direction === 'right' ? 'row-reverse' : 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 100,
            height: height ? height : 50,
            transform: [{translateX: item}]
        }}>
            <TouchableOpacity onPress={move} style={{ 
                backgroundColor: '#f2f1f1',
                width: width ? width : '85%', 
                height: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: direction === 'right' ? 'row' : 'row-reverse',
                borderWidth: 1,
                borderColor: '#00fff7',
                borderTopRightRadius: direction === 'right' ? 0 : 100,
                borderBottomRightRadius: direction === 'right' ? 0 : 100,
                borderTopLeftRadius: direction === 'right' ? 100 : 0,
                borderBottomLeftRadius: direction === 'right' ? 100 : 0
            }}>
                <View style={{ height: '100%', width: '40%', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name='arrow-left' size={20} color='#000' style={{ marginLeft: 5 }}/>
                </View>
                <View style={{ height: '100%', width: '60%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 25, padding: 10 }}> Voltar </Text>
                </View>
            </TouchableOpacity>
        </Animated.View>  
  );
}