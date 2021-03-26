import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Animated, TouchableOpacity, Dimensions, Image, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SlideButtonRoute({ animated, direction, routeName, icon, title, width, height, image, iconColor, routeParams }) {
  const navigation = useNavigation();

  const move = () => {
    let toValue = direction === 'right' ? Dimensions.get('screen').height / 2 :-(Dimensions.get('screen').height / 2);
    Animated.timing(animated, {toValue, duration: 350}).start()
    setTimeout(() => navigation.navigate(routeName, routeParams ?? {}), 370);
    setTimeout(() => Animated.timing(animated, {toValue: 0, duration: 500}).start(), 400)
  }

  const images = () => {
    switch (image) {
        case "player":  return require('../../images/menu-register/player.jpg');
        case "country":   return require('../../images/menu-register/country.jpg');
        case "stadium": return require('../../images/menu-register/stadium.jpg');
        case "team":    return require('../../images/menu-register/team.jpg');
        case "game":    return require('../../images/menu-register/game.jpg');
        case "competition":    return require('../../images/menu-register/competition.jpg');
      }
  }
  
  return (
        <Animated.View style={{
            width: '100%',
            margin: 10,
            flexDirection: direction === 'right' ? 'row-reverse' : 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 100,
            height: height ? height : 80,
            transform: [{translateX: animated}]
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
                    {
                        image
                        ?
                        <Image 
                            style={{ 
                                width: height ? height -15 : 65, 
                                height: height ? height -15 : 65,
                            }} 
                            source={images()}
                        />
                        :
                        icon
                        ?
                        <Icon name={icon} size={20} color={iconColor ? iconColor : '#000'  } style={{ marginLeft: 5 }}/>
                        :
                        null
                    }
                  
                </View>
                <View style={{ height: '100%', width: '60%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 25, padding: 10 }}> { title ?? '' } </Text>
                </View>
            </TouchableOpacity>
        </Animated.View>  
  );
}