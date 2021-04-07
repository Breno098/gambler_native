import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';

import CustomDrawer from '../components/CustomDrawer';



import Registrations from '../pages/App/Registrations';
import Country from '../pages/App/Country';
import FormCountry from '../pages/App/Country/form'

import Player from '../pages/App/Player';
import FormPlayer from '../pages/App/Player/form';

const AppDrawer = createDrawerNavigator();

export default function AppRoutes(){
    return(
        <AppDrawer.Navigator
            drawerContent={ (props) => <CustomDrawer {...props}/> }
            drawerStyle={{
                backgroundColor: 'rgba(255, 255, 255, 1)',
                width: '50%',
            }}
            drawerContentOptions={{
                activeTintColor: '#fff',
                activeBackgroundColor: '#f76a05',
                inactiveTintColor: '#000',
                inactiveBackgroundColor: 'rgba(0, 0, 0, 0)',
                itemStyle: {
                    marginVertical: 2,
                    width: '100%',
                }
            }}
        >
        {/* <AppDrawer.Screen name="Home" component={Home} options={{ 
            title: 'Inicio', 
            drawerIcon: ({tintColor}) => <Icon name="home" size={20} color={tintColor} /> 
        }}/> */}
        <AppDrawer.Screen name="Registrations" component={Registrations} options={{ 
            title: 'Registros', 
            drawerIcon: ({focused, size}) => <Icon name="edit" size={20} color={focused ? '#fff' : '#000'} />,
        }}/>
    </AppDrawer.Navigator>
    );
}