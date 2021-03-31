import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import Registrations from '../pages/App/Registrations';
import Country from '../pages/App/Country';
import FormCountry from '../pages/App/Country/form'

import Player from '../pages/App/Player';
import FormPlayer from '../pages/App/Player/form';

const AppStack = createStackNavigator();

export default function AppRoutes(){
    return(
        <AppStack.Navigator 
            screenOptions={{
                gestureEnabled: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
            <AppStack.Screen 
                name="Registrations" 
                component={Registrations}
                options={{ 
                    headerShown: false,
                    gestureDirection: "horizontal-inverted"
                }}
            />
            <AppStack.Screen 
                name="Country" 
                component={Country}
                options={{ 
                    gestureDirection: "horizontal",
                    title: 'Países',
                    headerShown: false,
                }}
            />
            <AppStack.Screen 
                name="FormCountry" 
                component={FormCountry}
                options={{ 
                    headerShown: false,
                    gestureDirection: "horizontal"
                }}
            />
            <AppStack.Screen 
                name="Player" 
                component={Player}
                options={{ 
                    headerShown: false,
                    gestureDirection: "horizontal"
                }}
            />
            <AppStack.Screen 
                name="FormPlayer" 
                component={FormPlayer}
                options={{ 
                    headerShown: false,
                    gestureDirection: "horizontal"
                }}
            />
            

        </AppStack.Navigator>
    );
}