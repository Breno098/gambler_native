import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { CustomDrawer } from '../components'
import Icon from 'react-native-vector-icons/FontAwesome';

const AppDrawer = createDrawerNavigator();

function AppRoutes(){
    return(
    <AppDrawer.Navigator
        drawerStyle={{
            backgroundColor: 'rgba(255, 255, 255, 1)'
        }}
        drawerContentOptions={{
            labelStyle: {
                fontWeight: 'bold',
            },
            activeTintColor: '#000',
            activeBackgroundColor: '#09ad00',
            inactiveTintColor: '#000',
            inactiveBackgroundColor: 'rgba(0, 0, 0, 0.1)',
            itemStyle: {
                marginVertical: 2
            }
        }}
    >
        {/* <AppDrawer.Screen name="Home" component={Home} options={{ 
            title: 'Inicio', 
            drawerIcon: ({tintColor}) => <Icon name="home" size={20} color={tintColor} /> 
        }}/> */}
    </AppDrawer.Navigator>
    );
}

export default AppRoutes;
