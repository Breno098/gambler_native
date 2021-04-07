import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text} from 'react-native';

import App from '../../../components/App';
import AppBar from '../../../components/AppBar'

import Country from '../Country'
import Player from '../Player'

const Tab = createBottomTabNavigator();

const icons = {
  Country : {
    label: 'País',
    icon: 'globe'
  },
  Player: {
    label: 'Jogador',
    icon: 'user'
  }
}

export default function Registrations() {

  return (
      <App style={{ }}>
        <AppBar/>

        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    const { icon, label } = icons[route.name]
                    return (
                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name={icon} size={size} color={color} />
                        <Text style={{ fontSize: 11, color }}> { label } </Text>
                    </View>)
                }
            })}
            tabBarOptions={{
                activeTintColor: '#f76a05',
                inactiveTintColor: '#000',
                style: {
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    height: 60,
                    paddingBottom: 5,
                    paddingTop: 5,
                },
                showLabel: false,
        }}>
            <Tab.Screen name="Country" component={Country}/>
            <Tab.Screen name="Player" component={Player}/>
        </Tab.Navigator>

      </App>
  );
}