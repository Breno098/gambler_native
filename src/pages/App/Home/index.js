import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text} from 'react-native';

import Registrations from '../Registrations';
import Settings from '../Settings'

const Tab = createBottomTabNavigator();

const icons = {
    Registrations: {
      label: 'Cadastros',
      icon: 'pencil'
    },
    Settings: {
        label: 'Ajustes',
        icon: 'cogs'
      }
}

export default function Registers(){
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    const { icon, label } = icons[route.name]
                    return (
                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                        <Icon name={icon} size={size} color={color} />
                        <Text style={{ fontSize: 11, color: color  }}> { label } </Text>
                    </View>)
                }
            })}

            tabBarOptions={{
                activeTintColor: '#00f018',
                inactiveTintColor: '#fff',
                style: {
                    backgroundColor: 'rgba(0, 0, 0, 1)',
                    height: 50,
                    paddingBottom: 5,
                    paddingTop: 5,
                    borderTopColor: '#00d0ff',
                    borderTopWidth: 1
                },
                showLabel: false,
        }}>
            <Tab.Screen name="Registrations"  component={Registrations}/>
            <Tab.Screen name="Settings"  component={Settings}/>
        </Tab.Navigator>
    )
}