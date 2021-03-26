import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Animated, TouchableOpacity, Dimensions, Image, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SlideListEdit({ animated, direction, routeName, routeParams, body, height  }) {
  const navigation = useNavigation();

  const move = () => {
    let toValue = direction === 'right' ? Dimensions.get('screen').height / 2 :-(Dimensions.get('screen').height / 2);
    Animated.timing(animated, {toValue, duration: 350}).start()
    setTimeout(() => navigation.navigate(routeName, routeParams ?? {}), 370);
    setTimeout(() => Animated.timing(animated, {toValue: 0, duration: 500}).start(), 400)
  }

  return (
        <Animated.View style={{
            width: '100%',
            marginBottom: 5,
            flexDirection: direction === 'right' ? 'row-reverse' : 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 100,
            height: height ? height : 80,
            transform: [{translateX: animated}]
        }}>
            <View style={{ 
                width: '90%', 
                height: '100%', 
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                borderBottomLeftRadius: 50,
                borderTopRightRadius: direction === 'right' ? 0 : 100,
                borderBottomRightRadius: direction === 'right' ? 0 : 100,
                borderTopLeftRadius: direction === 'right' ? 100 : 0,
                borderBottomLeftRadius: direction === 'right' ? 100 : 0,
                flexDirection: direction === 'right' ? 'row' : 'row-reverse',
                justifyContent: 'flex-end',
                borderWidth: 0.2,
                borderColor: '#00fff7',
            }}>
                <View style={{ width: '5%', height: '100%', flexDirection: direction === 'right' ? 'row' : 'row-reverse' }}>
                    <View style={{ backgroundColor: 'rgba(0, 255, 247, 0.4)', width: 25, height: 25, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                        <Text> { body.id ? body.id : '--' } </Text>
                    </View>
                </View>

                <View style={{ width: '58%', height: '100%', marginTop: 10, marginLeft: 15}}>
                    {  body && body.title ?  <Text style={{ fontSize: 17 }}> { body?.title } </Text> : null}
                    {
                        body && body.itens ? body.itens.map(item => (
                            <Text style={{ marginLeft: 10 }}> { item } </Text>
                        )) : null
                    }
                </View>

                <TouchableOpacity onPress={move} style={{ 
                    backgroundColor: 'rgba(0, 255, 247, 0.3)',
                    paddingLeft: 10,
                    paddingRight: 10,
                    width: '35%', 
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: direction === 'right' ? 'row' : 'row-reverse',
                    borderTopRightRadius: direction === 'right' ? 0 : 100,
                    borderBottomRightRadius: direction === 'right' ? 0 : 100,
                    borderTopLeftRadius: direction === 'right' ? 100 : 0,
                    borderBottomLeftRadius: direction === 'right' ? 100 : 0
                }}>
                    <View style={{ 
                        height: '100%', 
                        width: '100%', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        flexDirection: direction === 'right' ? 'row' : 'row-reverse',
                    }}>
                        <Icon name="edit" size={20} color='#000' style={{ marginLeft: 5 }}/>
                        <Text style={{ fontSize: 15, padding: 10 }}> Editar </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Animated.View>  
  );
}